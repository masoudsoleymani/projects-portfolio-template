/**
 * ============================================
 * PAGE CONTENT DATA
 * ============================================
 * All structured content for pages lives here.
 * Edit these arrays/objects to customize the template content.
 *
 * Replace placeholder images in src/assets/ with your own.
 */

export const site = {
  url: 'https://example.com',
  meta: {
    title: 'Esteban Puerto Rojas | Estudiante de Ingeniería de Sistemas',
    description:
      'Portafolio de Esteban Puerto Rojas, estudiante de Ingeniería de Sistemas en la Universidad El Bosque, interesado en programación y ciberseguridad.',
  },
  hero: {
    name: 'Esteban Puerto Rojas',
    role: 'Estudiante de Ingeniería de Sistemas',
    tagline:
      'Aprendiendo a construir software con buenas bases, con especial interés en ciberseguridad.',
    contact: 'Abierto a proyectos, prácticas y colaboraciones.',
    avatarSrc: '/Avatar.png',
    avatarAlt: 'Esteban Puerto Rojas',
  },
  about: {
    paragraphs: [
      'Tengo 18 años, nací en Duitama y actualmente vivo en Bogotá, donde curso cuarto semestre de Ingeniería de Sistemas en la Universidad El Bosque.',
      'Me apasiona la programación y la ciberseguridad, y estoy en un momento de mi carrera enfocado en aprender, experimentar y construir proyectos que me ayuden a crecer como desarrollador.',
      {
        heading: 'Intereses',
        bullets: [
          'Programación y desarrollo de software',
          'Ciberseguridad',
          'Videojuegos',
          'Fútbol',
          'Música',
        ],
      },
    ],
  },
  evidences: {
    modelado: {
      title: 'Modelado',
      paragraphs: [
        'En esta sección, se encuentran las evidencias de los talleres sobre MER, MER extendido y reducción a tablas.',
      ],
      links: [
        {
          title: 'Modelo ER Peter Chen',
          url: 'https://n9.cl/6t4v9',
          description:
            'En este link, se encuentra el primero modelo ER sobre jugadores, clubes de futbol, y tabla de clasificación.',
        },
        {
          title: 'Reducción a tablas',
          url: 'https://n9.cl/ppz8q',
          description:
            'En este link, se encuentra el modelo de reducción a tablas de un modelo ER diseñado en clase.',
        },
        {
          title: 'Modelo ER, ER extendido, y reducción de Empareja2',
          url: 'https://n9.cl/prlfq',
          description:
            'En este link se encuentran el modelo ER, el modelo ER extendido y la reducción a tablas del proyecto Empareja2.',
        },
        {
          title: 'Reducción a tablas de una biblioteca',
          url: 'https://n9.cl/wsn7i',
          description:
            'En este link se encuentra la reducción a tablas de un modelo ER de una biblioteca.',
        },
      ],
    },
    normalizacion: {
      title: 'Normalización',
      paragraphs: [
        'En esta sección, se encuentran las evidencias de los talleres sobre normalización.',
      ],
      links: [
        {
          title: 'CSV de normalización',
          url: 'https://puerto314.github.io/TallerNormalizacion.csv',
          description:
            'Abre el archivo CSV del taller de normalización.',
        },
        {
          title: 'PDF de normalización',
          url: 'https://puerto314.github.io/TallerNormalizacion.pdf',
          description:
            'Abre el documento PDF del taller de normalización.',
        },
      ],
    },
    sql: {
      title: 'SQL',
      paragraphs: [
        'En esta sección, se encuentran las evidencias de los trabajos y talleres sobre SQL.',
      ],
      links: [
        {
          title: 'Creación de objetos Empareja2',
          url: 'https://puerto314.github.io/01_creacion_objetos.sql',
          description: 'Script SQL para crear la base de datos y sus tablas.',
        },
        {
          title: 'Inserción de datos Empareja2',
          url: 'https://puerto314.github.io/02_insercion_datos.sql',
          description: 'Script SQL con datos ficticios de prueba para Empareja2.',
        },
        {
          title: 'Consultas varias Empareja2',
          url: 'https://puerto314.github.io/03_consultas_varias.sql',
          description: 'Consultas SQL de perfiles, estadísticas, matches y reportes.',
        },
        {
          title: 'Corrección Laboratorio',
          url: 'https://puerto314.github.io/CorreccionLaboratorio.sql',
          description: 'Script SQL con tablas, datos y vistas del laboratorio de viajeros y épocas.',
        },
      ],
    },
    proyecto: {
      title: 'Proyecto',
      paragraphs: [
        'En esta sección, se encuentran las evidencias de los entregables del proyecto final.',
      ],
      links: [
        {
          title: 'Supuestos Empareja2 (PDF)',
          url: '/Supuestos_Empareja2.pdf',
          description: 'Descarga el documento de supuestos del proyecto Empareja2.',
        },
        {
          title: 'Propuesta Empareja2 (PDF)',
          url: '/Propuesta_Empareja2.pdf',
          description: 'Descarga la propuesta del proyecto Empareja2.',
        },
        {
          title: 'Presupuesto – Empareja2 (PDF)',
          url: '/Presupuesto%20%E2%80%93%20Empareja2.pdf',
          description: 'Descarga el presupuesto del proyecto Empareja2.',
        },
        {
          title: 'Implementación del RDBMS – Empareja2 (PDF)',
          url: '/Implementaci%C3%B3n%20del%20RDBMS%20%E2%80%93%20Empareja2.pdf',
          description: 'Descarga el documento de implementación del RDBMS de Empareja2.',
        },
        {
          title: 'Implementación de la VM – Empareja2 (PDF)',
          url: '/Implementaci%C3%B3n%20de%20la%20VM%20%E2%80%93%20Empareja2.pdf',
          description: 'Descarga el documento de implementación de la máquina virtual de Empareja2.',
        },
        {
          title: 'Identificación de Stakeholders – Empareja2 (PDF)',
          url: '/Identificaci%C3%B3n%20de%20Stakeholders%20%E2%80%93%20Empareja2.pdf',
          description: 'Descarga la identificación de stakeholders del proyecto Empareja2.',
        },
        {
          title: 'Ejercicios de álgebra relacional (PDF)',
          url: '/ejercicios_algrelacional.pdf',
          description: 'Descarga los ejercicios de álgebra relacional.',
        },
        {
          title: 'EDT WBS – Empareja2 (PDF)',
          url: '/EDT%20WBS%20%E2%80%93%20Empareja2.pdf',
          description: 'Descarga la estructura de desglose del trabajo (EDT/WBS) de Empareja2.',
        },
        {
          title: 'Cronograma – Empareja2 (PDF)',
          url: '/Cronograma%20%E2%80%93%20Empareja2.pdf',
          description: 'Descarga el cronograma del proyecto Empareja2.',
        },
        {
          title: 'Análisis de Selección de Sistema Operativo – Empareja2 (PDF)',
          url: '/An%C3%A1lisis%20de%20Selecci%C3%B3n%20de%20Sistema%20Operativo%20%E2%80%93%20Empareja2.pdf',
          description: 'Descarga el análisis de selección del sistema operativo para Empareja2.',
        },
        {
          title: 'Análisis de Selección de RDBMS – Empareja2 (PDF)',
          url: '/An%C3%A1lisis%20de%20Selecci%C3%B3n%20de%20RDBMS%20%E2%80%93%20Empareja2.pdf',
          description: 'Descarga el análisis de selección del RDBMS para Empareja2.',
        },
        {
          title: 'Acta de Constitución Empareja2 (PDF)',
          url: '/Acta_de_Constituci%C3%B3n_Empareja2.pdf',
          description: 'Descarga el acta de constitución del proyecto Empareja2.',
        },
        {
          title: 'Acta de Cierre Empareja2 (PDF)',
          url: '/Acta_de_Cierre_Empareja2.pdf',
          description: 'Descarga el acta de cierre del proyecto Empareja2.',
        },
      ],
    },
  },
  experiences: [],
  featuredProjects: [],
  projectArchivePage: {
    title: 'Proyectos',
    description: 'Archivo de proyectos: aún en construcción.',
    intro: 'Aquí iré agregando los proyectos que desarrolle a lo largo de mi carrera.',
  },
  projectArchive: [],
  contact: {
    email: 'epuertor@unbosque.edu.co',
    github: 'https://github.com/Puerto314',
    instagram: 'https://instagram.com/puerto314',
  },
} as const;

export type ProjectArchiveRow = (typeof site.projectArchive)[number];
export type FeaturedProject = (typeof site.featuredProjects)[number];
