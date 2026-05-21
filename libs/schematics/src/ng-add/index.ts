import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  chain,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { join } from 'node:path/posix';
import { NgAddSchema } from './schema';

const ANGULAR_JSON_PATH = '/angular.json';
const PACKAGE_JSON_PATH = '/package.json';
const NG_BRUTALISM_IMPORT = "@import '@ng-brutalism/ui/styles.css';";
const TAILWIND_IMPORT = '@import "tailwindcss";';
const TAILWIND_IMPORT_PATTERN = /@import\s+["']tailwindcss["'];?/;
const NG_BRUTALISM_IMPORT_PATTERN =
  /@import\s+["']@ng-brutalism\/ui\/styles\.css["'];?/;
const STYLESHEET_EXTENSIONS = ['.css', '.scss', '.sass', '.less'];

interface AngularWorkspace {
  defaultProject?: string;
  projects?: Record<string, AngularProject>;
}

interface AngularProject {
  projectType?: string;
  root?: string;
  sourceRoot?: string;
  architect?: Record<string, AngularTarget>;
  targets?: Record<string, AngularTarget>;
}

interface AngularTarget {
  builder?: string;
  executor?: string;
  options?: Record<string, unknown>;
  configurations?: Record<string, Record<string, unknown>>;
}

interface StyleEntryObject {
  input?: string;
  [key: string]: unknown;
}

type StyleEntry = string | StyleEntryObject;

interface TargetProject {
  name: string;
  project: AngularProject;
}

export default function ngAdd(options: NgAddSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const workspace = readWorkspace(tree);
    const target = resolveTargetProject(workspace, options.project);
    const stylePath = ensureGlobalStylesheet(tree, workspace, target);
    const shouldSetupTailwind = !hasTailwindSetup(tree);

    const rules: Rule[] = [];

    rules.push((innerTree) => {
      if (shouldSetupTailwind) {
        ensureTailwindFallback(innerTree, context, target.project);
      }

      ensureStylesheetImports(innerTree, stylePath, true);
      context.logger.info(
        `Configured @ng-brutalism/ui styles for project "${target.name}".`
      );
      return innerTree;
    });

    return chain(rules)(tree, context);
  };
}

function readWorkspace(tree: Tree): AngularWorkspace {
  if (!tree.exists(ANGULAR_JSON_PATH)) {
    throw new SchematicsException(
      'Could not find angular.json. @ng-brutalism/ui ng-add currently supports Angular CLI workspaces only.'
    );
  }

  return readJson<AngularWorkspace>(tree, ANGULAR_JSON_PATH);
}

function resolveTargetProject(
  workspace: AngularWorkspace,
  requestedProject?: string
): TargetProject {
  const projects = workspace.projects ?? {};

  if (requestedProject) {
    const project = projects[requestedProject];
    if (!project) {
      throw new SchematicsException(
        `Project "${requestedProject}" was not found in angular.json.`
      );
    }

    assertApplicationProject(requestedProject, project);
    return { name: requestedProject, project };
  }

  if (workspace.defaultProject) {
    const defaultProject = projects[workspace.defaultProject];
    if (defaultProject && isApplicationProject(defaultProject)) {
      return { name: workspace.defaultProject, project: defaultProject };
    }
  }

  const applications = Object.entries(projects).filter(([, project]) =>
    isApplicationProject(project)
  );

  if (applications.length === 1) {
    const [name, project] = applications[0];
    return { name, project };
  }

  if (applications.length === 0) {
    throw new SchematicsException(
      'No Angular CLI application project was found in angular.json.'
    );
  }

  throw new SchematicsException(
    'Multiple Angular application projects were found. Run ng add @ng-brutalism/ui --project <project-name>.'
  );
}

function assertApplicationProject(name: string, project: AngularProject): void {
  if (!isApplicationProject(project)) {
    throw new SchematicsException(
      `Project "${name}" is not an Angular application.`
    );
  }
}

function isApplicationProject(project: AngularProject): boolean {
  if (project.projectType === 'application') {
    return true;
  }

  const buildTarget = getBuildTarget(project);
  const builder = buildTarget?.builder ?? buildTarget?.executor ?? '';
  return (
    builder === '@angular/build:application' ||
    builder === '@angular-devkit/build-angular:application' ||
    builder === '@angular-devkit/build-angular:browser'
  );
}

function ensureGlobalStylesheet(
  tree: Tree,
  workspace: AngularWorkspace,
  target: TargetProject
): string {
  const buildTarget = getBuildTarget(target.project);

  if (!buildTarget) {
    throw new SchematicsException(
      `Project "${target.name}" does not have a build target.`
    );
  }

  const styles = getStyleEntries(buildTarget.options);
  const existingStylesheet = styles
    .map(getStylePath)
    .find(
      (path): path is string =>
        typeof path === 'string' && isStylesheetPath(path)
    );

  if (existingStylesheet) {
    return normalizePath(existingStylesheet);
  }

  const stylesheetPath = join(target.project.sourceRoot ?? 'src', 'styles.css');
  if (!tree.exists(stylesheetPath)) {
    tree.create(stylesheetPath, '');
  }

  addStyleToTarget(buildTarget, stylesheetPath);
  overwriteJson(tree, ANGULAR_JSON_PATH, workspace);

  return stylesheetPath;
}

function getBuildTarget(project: AngularProject): AngularTarget | undefined {
  return project.architect?.['build'] ?? project.targets?.['build'];
}

function getStyleEntries(options: Record<string, unknown> = {}): StyleEntry[] {
  const styles = options['styles'];
  return Array.isArray(styles) ? (styles as StyleEntry[]) : [];
}

function getStylePath(style: StyleEntry): string | undefined {
  return typeof style === 'string' ? style : style.input;
}

function isStylesheetPath(path: string): boolean {
  return STYLESHEET_EXTENSIONS.some((extension) => path.endsWith(extension));
}

function addStyleToTarget(target: AngularTarget, stylesheetPath: string): void {
  target.options ??= {};
  const existingStyles = getStyleEntries(target.options);
  target.options['styles'] = [stylesheetPath, ...existingStyles];

  for (const configuration of Object.values(target.configurations ?? {})) {
    if ('styles' in configuration) {
      const styles = getStyleEntries(configuration);
      configuration['styles'] = [stylesheetPath, ...styles];
    }
  }
}

function hasTailwindSetup(tree: Tree): boolean {
  if (hasPackageDependency(tree, 'tailwindcss')) {
    return true;
  }

  for (const path of ['/.postcssrc.json', '/postcss.config.json']) {
    if (tree.exists(path)) {
      const config = readJson<Record<string, unknown>>(tree, path);
      const plugins = config['plugins'];
      if (
        plugins &&
        typeof plugins === 'object' &&
        '@tailwindcss/postcss' in plugins
      ) {
        return true;
      }
    }
  }

  let hasTailwindImport = false;
  tree.visit((path) => {
    if (
      isStylesheetPath(path) &&
      TAILWIND_IMPORT_PATTERN.test(tree.readText(path))
    ) {
      hasTailwindImport = true;
    }
  });

  return hasTailwindImport;
}

function ensureTailwindFallback(
  tree: Tree,
  context: SchematicContext,
  project: AngularProject
): void {
  addDevDependency(tree, 'tailwindcss', '^4.1.12');
  addDevDependency(tree, '@tailwindcss/postcss', '^4.1.12');
  addDevDependency(tree, 'postcss', '^8.5.3');
  ensurePostcssConfig(tree, project);
  context.addTask(new NodePackageInstallTask());
}

function ensurePostcssConfig(tree: Tree, project: AngularProject): void {
  const configPaths = [
    '/.postcssrc.json',
    '/postcss.config.json',
    join('/', project.root ?? '', '.postcssrc.json'),
    join('/', project.root ?? '', 'postcss.config.json'),
  ];

  for (const path of configPaths) {
    if (tree.exists(path)) {
      const config = readJson<Record<string, unknown>>(tree, path);
      const plugins =
        config['plugins'] && typeof config['plugins'] === 'object'
          ? (config['plugins'] as Record<string, unknown>)
          : {};
      plugins['@tailwindcss/postcss'] ??= {};
      config['plugins'] = plugins;
      overwriteJson(tree, path, config);
      return;
    }
  }

  tree.create(
    '/.postcssrc.json',
    `${JSON.stringify({ plugins: { '@tailwindcss/postcss': {} } }, null, 2)}\n`
  );
}

function ensureStylesheetImports(
  tree: Tree,
  stylesheetPath: string,
  includeTailwind: boolean
): void {
  const content = tree.exists(stylesheetPath)
    ? tree.readText(stylesheetPath)
    : '';
  const body = content
    .replace(TAILWIND_IMPORT_PATTERN, '')
    .replace(NG_BRUTALISM_IMPORT_PATTERN, '')
    .trimStart();
  const imports = [
    includeTailwind ? TAILWIND_IMPORT : undefined,
    NG_BRUTALISM_IMPORT,
  ].filter(Boolean);
  const nextContent = `${imports.join('\n')}${body ? `\n\n${body}` : '\n'}`;

  if (content !== nextContent) {
    if (tree.exists(stylesheetPath)) {
      tree.overwrite(stylesheetPath, nextContent);
    } else {
      tree.create(stylesheetPath, nextContent);
    }
  }
}

function hasPackageDependency(tree: Tree, name: string): boolean {
  if (!tree.exists(PACKAGE_JSON_PATH)) {
    return false;
  }

  const packageJson = readJson<Record<string, Record<string, string>>>(
    tree,
    PACKAGE_JSON_PATH
  );
  return [
    packageJson['dependencies'],
    packageJson['devDependencies'],
    packageJson['peerDependencies'],
  ].some((dependencies) => Boolean(dependencies?.[name]));
}

function addDevDependency(tree: Tree, name: string, version: string): void {
  const packageJson = tree.exists(PACKAGE_JSON_PATH)
    ? readJson<Record<string, Record<string, string> | string>>(
        tree,
        PACKAGE_JSON_PATH
      )
    : {};
  const devDependencies =
    packageJson['devDependencies'] &&
    typeof packageJson['devDependencies'] === 'object'
      ? (packageJson['devDependencies'] as Record<string, string>)
      : {};

  devDependencies[name] ??= version;
  packageJson['devDependencies'] = sortObject(devDependencies);
  overwriteJson(tree, PACKAGE_JSON_PATH, packageJson);
}

function readJson<T>(tree: Tree, path: string): T {
  const content = tree.readText(path);
  return JSON.parse(content) as T;
}

function overwriteJson(tree: Tree, path: string, value: unknown): void {
  tree.overwrite(path, `${JSON.stringify(value, null, 2)}\n`);
}

function sortObject<T>(value: Record<string, T>): Record<string, T> {
  return Object.fromEntries(
    Object.entries(value).sort(([left], [right]) => left.localeCompare(right))
  );
}

function normalizePath(path: string): string {
  return path.startsWith('/') ? path.slice(1) : path;
}
