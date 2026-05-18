import type {
  AboutCard,
  NavLink,
  Project,
  Skill,
  TimelineEntry,
} from './portfolio.types';

export const ASSET_PATH = '/showcase/portfolio';

export const NAV_LINKS: NavLink[] = [
  { href: '#home', label: 'Home', external: false },
  { href: '#journey', label: 'Journey', external: false },
  { href: '#projects', label: 'Projects', external: false },
  { href: 'https://dev.to/ronitjadhav', label: 'Blogs', external: true },
];

export const SKILLS: Skill[] = [
  { text: 'Angular', iconSlug: 'angular', iconLabel: 'Angular' },
  { text: 'TypeScript', iconSlug: 'typescript', iconLabel: 'TypeScript' },
  { text: 'JavaScript', iconSlug: 'javascript', iconLabel: 'JavaScript' },
  { text: 'ReactJS', iconSlug: 'react', iconLabel: 'React' },
  { text: 'Node.js', iconSlug: 'nodedotjs', iconLabel: 'Node.js' },
  { text: 'Python', iconSlug: 'python', iconLabel: 'Python' },
  { text: 'Java', iconSlug: 'openjdk', iconLabel: 'Java' },
  { text: 'Quarkus', iconSlug: 'quarkus', iconLabel: 'Quarkus' },
  { text: 'Docker', iconSlug: 'docker', iconLabel: 'Docker' },
  { text: 'Claude Code', iconSlug: 'claude', iconLabel: 'Claude' },
];

export const ABOUT_CARDS: AboutCard[] = [
  {
    title: 'About Me',
    description:
      "I'm currently working as a Geospatial Software Engineer at Camptocamp, where I specialize in geospatial software development.",
    image: 'Character1.svg',
    imageAlt: 'Character1',
    imagePosition: 'right',
  },
  {
    title: 'Geospatial Development',
    description:
      'I thrive on continuously learning various geospatial technologies, from GIS software to spatial databases, to shape ideas into functional applications.',
    image: 'Character2.svg',
    imageAlt: 'Character2',
    imagePosition: 'left',
  },
  {
    title: 'Interest in Technology',
    description:
      'Technology has fascinated me since I was young, especially the joy of building things. Combining tech with hands-on creation has always felt just right for me.',
    image: 'Character3.svg',
    imageAlt: 'Character3',
    imagePosition: 'right',
  },
  {
    title: 'Other Hobbies',
    description:
      'Here are some of my other passions: I like to dance, play chess, love watching F1, and am a Potterhead.',
    image: 'Character4.svg',
    imageAlt: 'Character4',
    imagePosition: 'left',
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    id: 1,
    title: 'Software Engineer @ Camptocamp',
    date: 'Oct 2023 - Present',
    description:
      'Kicked off my journey into the open-source geospatial realm at Camptocamp, working with QGIS, Geonetwork-UI, developing custom GIS dashboards, and contributing to QGIS plugins. Diving into Docker, web GIS, and everything open-source!',
    location: [13.427683548268714, 52.499819181584776],
    locationName: 'Berlin, Germany (Hybrid)',
    popupTitle: 'Camptocamp',
    popupDescription:
      'Became part of the open-source geospatial world, building geospatial solutions and exploring the power of QGIS.',
  },
  {
    id: 2,
    title: 'Software Engineering for Industrial Applications @ Hochschule Hof',
    date: '2022 - 2024',
    description:
      'Diving deep into advanced programming, software engineering, and IoT, while focusing on Industry 4.0. Gaining expertise in applied cloud computing, non-relational databases, and spatial technologies to bridge software and the real world.',
    location: [11.941048555260455, 50.325469419408954],
    locationName: 'Hof, Germany',
    popupTitle: 'Hochschule Hof',
    popupDescription:
      'Expanding my skillset in software engineering, focusing on Industry 4.0, cloud computing, and real-world applications.',
  },
  {
    id: 3,
    title: 'GIS Developer @ Gistec',
    date: '2019 - 2022',
    description:
      'Joined Gistec to create custom geoprocessing tools, work with ArcGIS Enterprise, and develop web mapping apps with Esri tech. Basically, a geospatial problem-solver.',
    location: [78.39265742273773, 17.489373568497363],
    locationName: 'Hyderabad, India',
    popupTitle: 'Gistec',
    popupDescription:
      'Built mapping tools and apps while mastering Python (ArcPy), ArcGIS Server, and the Esri stack.',
  },
  {
    id: 4,
    title: 'Student Intern @ University of Cologne',
    date: '2019 - 2019',
    description:
      'Interned at the University of Cologne, applying GIS and spatial analysis to hydrological modeling with ArcSWAT for the Mula-Mutha river. Automated tasks using Python and supported geospatial research for water resources.',
    location: [6.936245553273681, 50.92747527039799],
    locationName: 'Cologne, Germany',
    popupTitle: 'University of Cologne',
    popupDescription:
      "Leveraged GIS and spatial data to contribute to water flux modeling and the SWAT tool's application in India.",
  },
  {
    id: 5,
    title: 'M.Sc. in Geoinformatics: The Spatial Awakening',
    date: '2017 - 2019',
    description:
      'Learned to wield GIS, remote sensing, and code like a spatial wizard. Maps and code - what could go wrong?',
    location: [73.85215058309475, 18.460275536163216],
    locationName: 'Pune, India',
    popupTitle: 'BVIEER',
    popupDescription:
      'Where I discovered that geography is more than just knowing where places are.',
  },
];

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    title: 'Digipin',
    description:
      'Search for the DIGIPIN for your location. This app demonstrates how to use the Digital Postal Index Number (DIGIPIN) by the Department of Posts in India, aiming to simplify geo-coded addressing for public and private services.',
    tech: ['Openlayers', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/ronitjadhav/digipin-openlayers',
    live: 'https://digipin.maplabs.tech',
    image: 'digipin.jpeg',
  },
  {
    title: 'QGIS Hub Plugin',
    description:
      'Developed at Camptocamp with help from Ismail Sunni, this plugin allows QGIS users to easily browse and add resources from the QGIS Hub directly into their projects. It supports grid and list views, search, and filtering by resource type.',
    tech: ['Python', 'Qt', 'QGIS'],
    github: 'https://github.com/qgis/QGIS-Hub-Plugin',
    live: 'https://plugins.qgis.org/plugins/qgis_hub_plugin/',
    image: 'QGIS-Banner.jpg',
  },
  {
    title: 'Openlayers Benchmark',
    description:
      'Developed at Camptocamp as part of my internship, this project helps to benchmark the performance of WebGL and Canvas rendering in Openlayers. It includes a variety of tests and visualizations to compare the rendering speed of different layers.',
    tech: ['Openlayers', 'TypeScript'],
    github: 'https://github.com/openlayers/bench',
    live: 'https://openlayers.org/bench/',
    image: 'olBench.png',
  },
];
