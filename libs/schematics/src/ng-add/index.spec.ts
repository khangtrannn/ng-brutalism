import '@swc-node/register';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { Tree } from '@angular-devkit/schematics';
import { join } from 'node:path';

const collectionPath = join(__dirname, '../testing/collection.json');

describe('@ng-brutalism/ui ng-add', () => {
  it('fails when angular.json is missing', async () => {
    const runner = createRunner();

    await expect(
      runner.runSchematic('ng-add', {}, Tree.empty())
    ).rejects.toThrow('Could not find angular.json');
  });

  it('configures a single Angular CLI application without project option', async () => {
    const runner = createRunner();
    const tree = createWorkspaceTree({
      projects: {
        app: createApplicationProject(),
      },
    });

    const result = await runner.runSchematic('ng-add', {}, tree);

    expect(result.readText('/src/styles.css')).toBe(
      '@import "tailwindcss";\n' +
        "@import '@ng-brutalism/ui/styles.css';\n\n" +
        'body { margin: 0; }\n'
    );
  });

  it('requires project option for multi-app workspaces', async () => {
    const runner = createRunner();
    const tree = createWorkspaceTree({
      projects: {
        app: createApplicationProject(),
        admin: createApplicationProject('admin/src'),
      },
    });

    await expect(runner.runSchematic('ng-add', {}, tree)).rejects.toThrow(
      'Multiple Angular application projects were found'
    );
  });

  it('uses the requested project in a multi-app workspace', async () => {
    const runner = createRunner();
    const tree = createWorkspaceTree({
      projects: {
        app: createApplicationProject(),
        admin: createApplicationProject('projects/admin/src', 'scss'),
      },
    });
    tree.create(
      '/projects/admin/src/styles.scss',
      '.admin { display: block; }\n'
    );

    const result = await runner.runSchematic(
      'ng-add',
      { project: 'admin' },
      tree
    );

    expect(result.readText('/projects/admin/src/styles.scss')).toContain(
      "@import '@ng-brutalism/ui/styles.css';"
    );
    expect(result.readText('/src/styles.css')).toBe('body { margin: 0; }\n');
  });

  it('does not duplicate existing imports', async () => {
    const runner = createRunner();
    const tree = createWorkspaceTree({
      projects: {
        app: createApplicationProject(),
      },
    });
    tree.overwrite(
      '/src/styles.css',
      '@import "tailwindcss";\n' +
        "@import '@ng-brutalism/ui/styles.css';\n\n" +
        'body { margin: 0; }\n'
    );

    const result = await runner.runSchematic('ng-add', {}, tree);

    expect(result.readText('/src/styles.css')).toBe(
      '@import "tailwindcss";\n' +
        "@import '@ng-brutalism/ui/styles.css';\n\n" +
        'body { margin: 0; }\n'
    );
  });

  it('creates and wires src/styles.css when no global stylesheet exists', async () => {
    const runner = createRunner();
    const workspace = {
      projects: {
        app: createApplicationProject(),
      },
    };
    workspace.projects.app.architect.build.options.styles = [];
    const tree = createWorkspaceTree(workspace);
    tree.delete('/src/styles.css');

    const result = await runner.runSchematic('ng-add', {}, tree);
    const angularJson = JSON.parse(result.readText('/angular.json'));

    expect(result.readText('/src/styles.css')).toBe(
      '@import "tailwindcss";\n@import \'@ng-brutalism/ui/styles.css\';\n'
    );
    expect(angularJson.projects.app.architect.build.options.styles).toEqual([
      'src/styles.css',
    ]);
  });

  it('preserves existing Tailwind package setup', async () => {
    const runner = createRunner();
    const tree = createWorkspaceTree({
      projects: {
        app: createApplicationProject(),
      },
    });
    tree.overwrite(
      '/package.json',
      JSON.stringify({ devDependencies: { tailwindcss: '^4.0.0' } }, null, 2)
    );

    const result = await runner.runSchematic('ng-add', {}, tree);

    expect(result.readText('/package.json')).toBe(
      JSON.stringify({ devDependencies: { tailwindcss: '^4.0.0' } }, null, 2)
    );
    expect(result.readText('/src/styles.css')).toContain(
      '@import "tailwindcss";'
    );
  });

  it('is idempotent on a second run', async () => {
    const runner = createRunner();
    const tree = createWorkspaceTree({
      projects: {
        app: createApplicationProject(),
      },
    });

    const firstRun = await runner.runSchematic('ng-add', {}, tree);
    const firstStyles = firstRun.readText('/src/styles.css');
    const firstPackageJson = firstRun.readText('/package.json');
    const secondRun = await runner.runSchematic('ng-add', {}, firstRun);

    expect(secondRun.readText('/src/styles.css')).toBe(firstStyles);
    expect(secondRun.readText('/package.json')).toBe(firstPackageJson);
  });
});

function createRunner(): SchematicTestRunner {
  return new SchematicTestRunner('@ng-brutalism/ui', collectionPath);
}

function createWorkspaceTree(workspace: Record<string, unknown>): UnitTestTree {
  const tree = new UnitTestTree(Tree.empty());
  tree.create('/angular.json', JSON.stringify(workspace, null, 2));
  tree.create(
    '/package.json',
    JSON.stringify({ devDependencies: {} }, null, 2)
  );
  tree.create('/src/styles.css', 'body { margin: 0; }\n');
  return tree;
}

function createApplicationProject(sourceRoot = 'src', styleExtension = 'css') {
  return {
    projectType: 'application',
    sourceRoot,
    architect: {
      build: {
        builder: '@angular-devkit/build-angular:browser',
        options: {
          styles: [`${sourceRoot}/styles.${styleExtension}`],
        },
      },
    },
  };
}
