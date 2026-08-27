
export interface ModelItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  image: string;
}

export const models: ModelItem[] = [
     {
    id: 'Hospital-v1',
    title: 'Modelo ER - Sistema de Gestión de Hospital (Urgencias)',
    description:
      'Modelo entidad-relación para el área de Urgencias de un hospital. Contempla las entidades PACIENTE (cédula, dirección, teléfonos, nombre, apellidos, fecha de nacimiento y edad) y MÉDICO (cédula, nombre completo, especialidad y celular), junto con el registro de Triage: si un paciente fue evaluado, en qué fecha y con qué nivel de prioridad.',
    date: '2026',
    image: '/models/Modelo ER-Hospital.png',
  },

  {
    id: 'Aerolinea-v1',
    title: 'Modelo ER - Sistema de Gestión de Aerolínea',
    description:
      'Modelo entidad-relación para las operaciones de una aerolínea. Incluye AVIÓN (número de cola, tipo y base de origen), PILOTO (código, nombre y horas de vuelo) y TRIPULACIÓN (código, nombre y teléfonos), todos asociados a una base de regreso, además de la entidad VUELO con su origen, destino, hora y número.',
    date: '2026',
    image: '/models/Modelo ER-Aerolínea.png',
  },

  {
    id: 'Biblioteca-v1',
    title: 'Modelo ER - Sistema de Gestión de Biblioteca',
    description:
      'Modelo entidad-relación para la gestión de préstamos en una biblioteca. Incluye SOCIO (código, cédula, dirección, teléfono, nombre y apellidos) y LIBRO (título, año de escritura, autor o autores, año de edición, editorial e ISBN), con un atributo para indicar si el ejemplar está dañado.',
    date: '2026',
    image: '/models/Modelo ER-Biblioteca.png',
  },

  {
    id: 'Streaming-v1',
    title: 'Modelo ER - Plataforma de Streaming',
    description:
      'Modelo entidad-relación para una plataforma de streaming universitaria. Incluye CONTENIDO (series, películas, documentales, videos) con su productor, año de lanzamiento y categoría, y USUARIO con su información personal, gustos, historial de búsquedas e historial de reproducción.',
    date: '2026',
    image: '/models/Modelo ER-Streaming.png',
  },

  {
    id: 'Torneo-Futbol-v1',
    title: 'Modelo ER - Torneo de Fútbol (University Champions League)',
    description:
      'Modelo entidad-relación para el sistema de estadísticas del torneo de fútbol de la universidad. Incluye EQUIPO (con su programa académico y semestre) y JUGADOR, además del registro de puntos por partido, tarjetas amarillas y rojas por jugador, y las posiciones de la tabla en tiempo real.',
    date: '2026',
    image: '/models/Modelo ER-Torneo Futbol.png',
  },

  {
    id: 'quiz1-taller-mecanico',
    title: 'Modelo ER - Taller de Mecánica Automotriz',
    description:
      'Corrección de un modelo entidad-relación entregado con errores. Se identificaron y corrigieron problemas en las entidades CLIENTE, VEHICULO y MECANICO, ajustando cardinalidades (1:M en Poseer y M:N en Reparar), el atributo multivaluado de correos, el atributo derivado de antigüedad, y los atributos de la relación Reparar (fecha y descripción de la falla).',
    date: '2026',
    image: '/models/Ejercicio1 Quiz1.png',
  },
  {
    id: 'quiz1-almacen-equipos',
    title: 'Modelo ER - Almacén de Préstamo de Equipos Audiovisuales',
    description:
      'Diseño de un modelo entidad-relación desde cero a partir de reglas de negocio. Incluye las entidades EQUIPO, UNIDAD FISICA y USUARIO, un atributo multivaluado (proveedores autorizados), un atributo compuesto (nombre completo) y uno derivado (días de mora), la relación M:N Prestar, y una relación reflexiva 1:1 (Remplazar) entre unidades físicas.',
    date: '2026',
    image: '/models/Ejercicio2 Quiz1.png',
  },
   
];