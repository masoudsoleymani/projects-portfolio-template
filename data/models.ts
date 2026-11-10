export type ModelCategory = 'er' | 'eer' | 'reduccion';

export interface ModelItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  image: string;
  category: ModelCategory;
}

export const models: ModelItem[] = [
  {
    id: 'Hospital-v1',
    title: 'Modelo ER - Sistema de Gestión de Hospital (Urgencias)',
    description:
      'Modelo entidad-relación para el área de Urgencias de un hospital. Contempla las entidades PACIENTE (cédula, dirección, teléfonos, nombre, apellidos, fecha de nacimiento y edad) y MÉDICO (cédula, nombre completo, especialidad y celular), junto con el registro de Triage: si un paciente fue evaluado, en qué fecha y con qué nivel de prioridad.',
    date: '2026',
    category: 'er',
    image: '/models/Modelo ER-Hospital.png',
  },

  {
    id: 'Aerolinea-v1',
    title: 'Modelo ER - Sistema de Gestión de Aerolínea',
    description:
      'Modelo entidad-relación para las operaciones de una aerolínea. Incluye AVIÓN (número de cola, tipo y base de origen), PILOTO (código, nombre y horas de vuelo) y TRIPULACIÓN (código, nombre y teléfonos), todos asociados a una base de regreso, además de la entidad VUELO con su origen, destino, hora y número.',
    date: '2026',
    category: 'er',
    image: '/models/Modelo ER-Aerolínea.png',
  },

  {
    id: 'Biblioteca-v1',
    title: 'Modelo ER - Sistema de Gestión de Biblioteca',
    description:
      'Modelo entidad-relación para la gestión de préstamos en una biblioteca. Incluye SOCIO (código, cédula, dirección, teléfono, nombre y apellidos) y LIBRO (título, año de escritura, autor o autores, año de edición, editorial e ISBN), con un atributo para indicar si el ejemplar está dañado.',
    date: '2026',
    category: 'er',
    image: '/models/Modelo ER-Biblioteca.png',
  },

  {
    id: 'Streaming-v1',
    title: 'Modelo ER - Plataforma de Streaming',
    description:
      'Modelo entidad-relación para una plataforma de streaming universitaria. Incluye CONTENIDO (series, películas, documentales, videos) con su productor, año de lanzamiento y categoría, y USUARIO con su información personal, gustos, historial de búsquedas e historial de reproducción.',
    date: '2026',
    category: 'er',
    image: '/models/Modelo ER-Streaming.png',
  },

  {
    id: 'Torneo-Futbol-v1',
    title: 'Modelo ER - Torneo de Fútbol (University Champions League)',
    description:
      'Modelo entidad-relación para el sistema de estadísticas del torneo de fútbol de la universidad. Incluye EQUIPO (con su programa académico y semestre) y JUGADOR, además del registro de puntos por partido, tarjetas amarillas y rojas por jugador, y las posiciones de la tabla en tiempo real.',
    date: '2026',
    category: 'er',
    image: '/models/Modelo ER-Torneo Futbol.png',
  },

  {
    id: 'quiz1-taller-mecanico',
    title: 'Modelo ER - Taller de Mecánica Automotriz',
    description:
      'Corrección de un modelo entidad-relación entregado con errores. Se identificaron y corrigieron problemas en las entidades CLIENTE, VEHICULO y MECANICO, ajustando cardinalidades (1:M en Poseer y M:N en Reparar), el atributo multivaluado de correos, el atributo derivado de antigüedad, y los atributos de la relación Reparar (fecha y descripción de la falla).',
    date: '2026',
    category: 'er',
    image: '/models/Ejercicio1 Quiz1.png',
  },
  {
    id: 'quiz1-almacen-equipos',
    title: 'Modelo ER - Almacén de Préstamo de Equipos Audiovisuales',
    description:
      'Diseño de un modelo entidad-relación desde cero a partir de reglas de negocio. Incluye las entidades EQUIPO, UNIDAD FISICA y USUARIO, un atributo multivaluado (proveedores autorizados), un atributo compuesto (nombre completo) y uno derivado (días de mora), la relación M:N Prestar, y una relación reflexiva 1:1 (Remplazar) entre unidades físicas.',
    date: '2026',
    category: 'eer',
    image: '/models/Ejercicio2 Quiz1.png',
  },
  {
    id: 'taller1-aeroandes-er',
    title: 'Modelo ER - Aerolínea AeroAndes',
    description:'Modelo entidad-relación conceptual de una aerolínea, en notación de Peter Chen. Incluye las entidades PASAJERO, RUTA, VUELO (entidad débil), AVION, CERTIFICADO, TRIPULANTE, INSUMO, PROVEEDOR y TABLET, con atributos compuestos, multivaluados y derivados; relaciones binarias, recursivas (SUPERVISA, CONECTA), una relación ternaria (SUMINISTRA), una agregación (DOTA) y una jerarquía de especialización total y disjunta de TRIPULANTE en PILOTO y AUXILIAR.',
    date: '2026',
    category: 'eer',
    image: '/models/Taller 1 Tranformaciones Modelo ER-Modelo E-R.drawio.png',
  },
 {
    id: 'servicios-urgencia-er',
    title: 'Modelo ER Extendido - Servicios de Urgencia Hospitalaria',
    description:
      'Modelo entidad-relación con especialización total y disjunta de EMPLEADO en CONDUCTOR_AMBULANCIA y PERSONAL_SANITARIO. Incluye las entidades HOSPITAL, GRUPO y AMBULANCIA; la relación M:N entre PERSONAL_SANITARIO y HOSPITAL (con fechas de alta y baja), la relación de GUARDIAS (fecha, turno, horas), los VIAJES de los conductores a los hospitales (fecha, población, kilómetros, horas), la pertenencia de cada sanitario a un GRUPO (con el puesto que ocupa), y la relación 1:1 opcional entre CONDUCTOR_AMBULANCIA y AMBULANCIA.',
    date: '2026',
    category: 'eer',
    image: '/models/Ejercicio3-discoduroderoer.drawio.png',
  },
  {
    id: 'biblioteca-enciclopedias-er',
    title: 'Modelo ER Extendido - Biblioteca de Enciclopedias',
    description:
      'Modelo entidad-relación con especialización de EMPLEADO en EMPLEADO_MANTENIMIENTO y EMPLEADO_GESTION. Incluye ENCICLOPEDIA relacionada M:N con AUTOR, y TOMO como entidad débil dependiente de ENCICLOPEDIA (identificado por su número, repetible entre enciclopedias). Contempla ALUMNO con varias TARJETA de acceso (clave compuesta DNI + tipo de acceso), cada una asociada a un TIPO_ACCESO (máximo de consultas y precio); la relación M:N de CONSULTA entre TARJETA y TOMO (fecha y duración); la ubicación de cada TOMO en un ARMARIO (pasillo, letra y capacidad); y las relaciones de mantenimiento de armarios y elaboración de tarjetas a cargo de cada tipo de empleado.',
    date: '2026',
    category: 'eer',
    image: '/models/Ejercicio4-discoduroderoer.drawio.png',
  },
  {
    id: 'ongs-er',
    title: 'Modelo ER Extendido - Coordinadora Nacional de ONGs',
    description:
      'Modelo entidad-relación con especialización total de TRABAJADOR en ASALARIADO (cargo, seguridad social, IRPF) y VOLUNTARIO (edad, profesión, horas dedicadas). Incluye ASOCIACION (CIF, denominación, tipo, utilidad pública) relacionada M:N con SOCIO (con cuota mensual y aportación anual derivada), y 1:N con TRABAJADOR. Contempla PROYECTO, asignado M:N a los trabajadores de la asociación, con una relación reflexiva de composición entre PROYECTO y sus SUBPROYECTOS.',
    date: '2026',
    category: 'eer',
    image: '/models/Ejercicio2-discoduroderoer.drawio.png',
  },
  {
    id: 'taller-reduccion-tablas-libreria',
    title: 'Taller Reducción a Tablas - Librería',
    description:
      'Modelo entidad-relación de una librería, utilizado como punto de partida para el taller de reducción a tablas. Incluye AUTOR y EDITOR relacionados M:N con LIBRO (escrito-por, editado-por); CLIENTE relacionado M:N con CESTA-DE-LA-COMPRA (cesta-de), la cual a su vez contiene libros mediante otra relación M:N (contiene); y ALMACEN relacionado M:N con LIBRO (almacena). Al tratarse de relaciones M:N, cada una requiere una tabla intermedia al reducir el modelo al esquema relacional.',
    date: '2026',
    category: 'reduccion',
    image: '/models/Actividad Tranformacion.drawio.png',
  },
  {
    id: 'parcial1-cineandes-er',
    title: 'Modelo ER Extendido - Cadena de Cines CineAndes',
    description:
      'Modelo entidad-relación extendido para la cadena de cines CineAndes. Incluye SEDE (dirección compuesta, teléfono multivaluado) relacionada 1:N con SALA, y SALA relacionada 1:N con SILLA (ambas entidades débiles). Contempla PELICULA (con antigüedad derivada e idioma multivaluado) y su relación reflexiva de secuela/precuela; FUNCION como entidad débil dependiente de SALA, relacionada con PELICULA (proyectar) y con CLIENTE mediante la relación M:N comprar. Incluye además EMPLEADO con una especialización total y disjunta en PROYECCIONISTA y TAQUILLERO, una relación reflexiva de supervisión, y las relaciones entregar (PROVEEDOR-PRODUCTO-SEDE) y comprar con MEDIO_PAGO resuelta como agregación.',
    date: '2026',
    category: 'eer',
    image: '/models/preparcialBasesDatos1.drawio.png',
  },
  {
    id: 'parcial1-cineandes-reduccion',
    title: 'Parcial 1 - Reducción a Tablas: CineAndes',
    description:
      'Aplicación de las reglas de transformación al modelo entidad-relación extendido de CineAndes, dejándolo listo para el paso al modelo relacional. Se elimina el atributo multivaluado teléfono de SEDE creando la entidad TELEFONO; se transforma la relación M:N:M entregar (PROVEEDOR-PRODUCTO-SEDE) en la entidad asociativa PRO_SED_PRO; se separa el atributo multivaluado idioma de PELICULA en la entidad IDIOMA; y se convierte la agregación comprar-MEDIO_PAGO en la entidad FUN_MED_CLIE, resultante de reducir la relación M:N entre FUNCION y CLIENTE junto con su relación con MEDIO_PAGO.',
    date: '2026',
    category: 'reduccion',
    image: '/models/preparcialBasesDatos1Reduccion.drawio.png',
  },
 {
    id: 'actividad-zoologico-reduccion',
    title: 'Actividad Reducción a Tablas - Zoológico',
    description:
      'Aplicación de las reglas de transformación al modelo entidad-relación de un zoológico, dejándolo listo para el paso al modelo relacional. Las relaciones M:N entre HABITAT y CONTINENTE, HABITAT y ESPECIE, ZONA e ITINERARIO, y entre ESPECIE y CUIDADOR (con el atributo fecha) e ITINERARIO y GUIA (con el atributo hora) se convierten en entidades asociativas (HABIT_CONTI, HABIT_ESPE, ZONA_ITINERA, ESPE_CUIDA e ITINE_GUIA), cada una conectada con sus entidades originales mediante relaciones 1:N. Además, el atributo multivaluado teléfono de CUIDADOR y GUIA se separa en la entidad débil TELEFONO.',
    date: '2026',
    category: 'reduccion',
    image: '/models/Actividad TranformacionPunto2.drawio.png',
  },
  //FALTA PONER REDUCCION A TABLAS DEL TALLER 1
];