export interface NormalizationStep {
  label: string; // Ej: 'Relación base', '1FN', '2FN', '3FN'
  image: string; // Ej: '/normalizacion/pedidos-1fn.png'
  explanation: string;
}

export interface NormalizationExercise {
  id: string;
  title: string;
  description?: string;
  statement?: string; // Enunciado del ejercicio (contexto)
  date?: string;
  steps: NormalizationStep[];
}

export const normalizationExercises: NormalizationExercise[] = [
  {
    id: 'proyectos-empleados',
    title: 'Normalización - Proyectos y Empleados',
    description:
      'Normalización de una relación que registra qué empleados trabajan en cada proyecto y cuántas horas les dedican, desde la relación base hasta la tercera forma normal.',
    statement:
      'Una empresa registra en una sola relación los proyectos, los empleados asignados a cada uno y las horas que cada empleado dedica a cada proyecto. Cada empleado tiene una profesión y cada profesión tiene un valor por hora.\nSe pide identificar las dependencias funcionales y llevar la relación paso a paso hasta la tercera forma normal (3FN).',
    date: '2026',
    steps: [
      {
        label: 'Relación base',
        image: '/normalizacion/ejercicio1/base.png',
        explanation:
          'Relación inicial con todos los datos en una sola tabla: proyectos, empleados y las horas que cada empleado dedica a cada proyecto. Todavía no está en ninguna forma normal: una de las celdas contiene un valor no atómico ("20 c", horas con una letra añadida), lo que rompe la atomicidad que exige la 1FN.\nClave primaria: (cod_proyecto, cod_empleado).\nDependencias funcionales:\n• cod_proyecto → nom_proyecto\n• cod_empleado → nom_empleado, profesion, vlr_hora\n• profesion → vlr_hora\n• (cod_proyecto, cod_empleado) → hrs_asignadas',
      },
      {
        label: '1FN',
        image: '/normalizacion/ejercicio1/1fn.png',
        explanation:
          'Para pasar a 1FN se corrige el valor no atómico: "20 c" se deja como 20, de modo que cada celda tenga un solo valor, sin grupos repetitivos, y cada fila se identifique con la clave compuesta (cod_proyecto, cod_empleado).\nLos colores marcan la redundancia que todavía existe: el nombre de cada proyecto se repite en todas sus filas (amarillo, morado y verde) y los datos de cada empleado se repiten en cada proyecto en el que participa (naranja, verde claro y azul). Esa repetición nace de dependencias parciales de la clave, que se resuelven en 2FN.',
      },
      {
        label: '2FN',
        image: '/normalizacion/ejercicio1/2fn.png',
        explanation:
          'Una relación está en 2FN si está en 1FN y ningún atributo depende solo de una parte de la clave. Aquí nom_proyecto depende únicamente de cod_proyecto, y nom_empleado, profesion y vlr_hora dependen únicamente de cod_empleado.\nSolución: separar en tres tablas. PROYECTO (cod_proyecto, nom_proyecto), EMPLEADO (cod_empleado, nom_empleado, profesion, vlr_hora) y PROYECTO-EMPLEADO (cod_proyecto, cod_empleado, hrs_asignadas), que conserva la clave compuesta porque hrs_asignadas sí depende de ambos atributos.\nAsí se evitan las anomalías de actualización: en la relación base el empleado 2030 aparece escrito como Yamyle, Yamile y Llamile; ahora su nombre se guarda una sola vez.',
      },
      {
        label: '3FN',
        image: '/normalizacion/ejercicio1/3fn.png',
        explanation:
          'Una relación está en 3FN si está en 2FN y ningún atributo no clave depende de otro atributo no clave (no hay dependencias transitivas). En EMPLEADO, vlr_hora depende de profesion y profesion depende de cod_empleado, es decir: cod_empleado → profesion → vlr_hora.\nSolución: crear la tabla PROFESION (profesion, vlr_hora) y dejar profesion en EMPLEADO como llave foránea. Así el valor por hora de cada profesión se guarda una sola vez, y si cambia se actualiza en un único lugar en vez de en cada empleado con esa profesión.\nResultado final: PROYECTO, EMPLEADO, PROYECTO-EMPLEADO y PROFESION, todas en 3FN.',
      },
    ],
  },

  {
    id: 'estudiantes-calificaciones',
    title: 'Normalización - Estudiantes y Calificaciones',
    description:
      'Normalización de una relación de estudiantes con los cursos que toman y sus calificaciones, partiendo de celdas con varios valores hasta obtener las tablas finales con sus claves primarias y foráneas.',
    statement:
      'Se tiene una relación de estudiantes con los atributos Cod, Name, Email, Courses y GradePoints. Un estudiante puede tomar varios cursos y tener una calificación por cada uno.\nSe pide determinar si la relación está en 1FN, normalizarla y presentar las tablas resultantes indicando nombre, columnas, llaves primarias y llaves foráneas.',
    date: '2026',
    steps: [
      {
        label: 'Relación base',
        image: '/normalizacion/ejercicio2/base.png',
        explanation:
          'La relación no está en 1FN: las columnas Courses y GradePoints guardan varios valores en una misma celda (por ejemplo, John Doe tiene NN204, SI204, IT221 y las notas 2,3,3). Esto viola la atomicidad y, además, hace imposible saber con certeza qué nota corresponde a qué curso.\nClave: Cod.\nDependencias funcionales:\n• Cod → Name, Email\n• (Cod, Courses) → GradePoints',
      },
      {
        label: '1FN',
        image: '/normalizacion/ejercicio2/1fn.png',
        explanation:
          'Para pasar a 1FN cada curso se coloca en su propia fila con su calificación, de modo que cada celda tenga un único valor. Como ahora un mismo estudiante aparece varias veces, la clave pasa a ser (Cod, Courses).\nTodavía hay redundancia: Name y Email se repiten en cada curso del estudiante, porque dependen solo de Cod (una parte de la clave). Eso se resuelve en la siguiente etapa.',
      },
      {
        label: 'Tablas finales',
        image: '/normalizacion/ejercicio2/1fn-tablas.png',
        explanation:
          'Name y Email dependen solo de Cod, mientras que GradePoints depende de la clave completa (Cod, Courses). Al separar esas dependencias se obtiene la 2FN, y como no hay dependencias entre atributos no clave, la relación queda también en 3FN.\nTablas resultantes:\n• ESTUDIANTE (Cod, Name, Email). PK: Cod.\n• CALIFICACION (Courses, Cod, GradePoints). PK: (Cod, Courses). FK: Cod → ESTUDIANTE.\nAsí los datos de cada estudiante se guardan una sola vez y la tabla CALIFICACION conserva una nota por cada estudiante y curso.',
      },
    ],
  },

  {
    id: 'miembros-cenas',
    title: 'Normalización - Miembros y Cenas',
    description:
      'Normalización de una relación que registra las cenas a las que asisten los miembros, el lugar donde se realizan y los platos servidos, desde la relación base con grupos repetitivos hasta la tercera forma normal.',
    statement:
      'Un restaurante registra las cenas a las que asisten sus miembros: de cada miembro se guarda su número, nombre y dirección; de cada cena su número, fecha y lugar (con código y descripción); y de cada cena los platos servidos (código y descripción).\nSe pide: (a) identificar los atributos multivaluados, (b) escribir el esquema de la relación Member_Dinner, (c) dibujar el diagrama de dependencias funcionales en 1FN y (d) normalizar paso a paso hasta 3FN.\nNota: el atributo FOOD puede ser multivaluado, ya que en una cena pueden servirse varias comidas.',
    date: '2026',
    steps: [
      {
        label: 'Relación base',
        image: '/normalizacion/ejercicio3/base.png',
        explanation:
          'Relación inicial sin normalizar: cada cena sirve varios platos, así que los datos del miembro, la cena y el lugar solo aparecen en la primera fila y las siguientes quedan vacías. Ese grupo repetitivo (FoodCode y Food Description) es lo que impide estar en 1FN.\nClave: (MemberNum, DinnerNum).\nDependencias funcionales:\n• MemberNum → MemberName, MemberAddress\n• DinnerNum → DinnerDate, VenueCode, VenueDescription\n• VenueCode → VenueDescription\n• FoodCode → Food Description',
      },
      {
        label: '1FN',
        image: '/normalizacion/ejercicio3/1fn.png',
        explanation:
          'Para pasar a 1FN se elimina el grupo repetitivo: se completan los datos del miembro, la cena y el lugar en cada fila, de modo que cada celda tenga un solo valor y cada plato quede en su propia fila. Como ahora un mismo miembro y una misma cena aparecen con varios platos, la clave pasa a ser (MemberNum, DinnerNum, FoodCode).\nCada color agrupa las filas de una misma participación (miembro + cena), por ejemplo el miembro 235 en la cena D0003. Se ve la redundancia que queda: nombre, dirección, fecha y lugar se repiten en cada plato. Esa repetición viene de dependencias parciales de la clave, que se resuelven en 2FN.',
      },
      {
        label: '2FN',
        image: '/normalizacion/ejercicio3/2fn.png',
        explanation:
          'Una relación está en 2FN si está en 1FN y ningún atributo depende solo de una parte de la clave. Aquí MemberName y MemberAddress dependen solo de MemberNum; DinnerDate, VenueCode y VenueDescription dependen solo de DinnerNum; y Food Description depende solo de FoodCode.\nSolución: separar en cuatro tablas. MEMBER (MemberNum, MemberName, MemberAddress), DINNER (DinnerNum, DinnerDate, VenueCode, VenueDescription), FOOD (FoodCode, Food Description) y MEMBER-DINNER-FOOD (MemberNum, DinnerNum, FoodCode), que conserva la clave completa y registra quién asistió a cada cena y qué platos se sirvieron.\nEn DINNER todavía queda VenueDescription dependiendo de VenueCode, que se resuelve en 3FN.',
      },
      {
        label: '3FN',
        image: '/normalizacion/ejercicio3/3fn.png',
        explanation:
          'Una relación está en 3FN si está en 2FN y no tiene dependencias transitivas. En DINNER, VenueDescription depende de VenueCode y VenueCode depende de DinnerNum, es decir: DinnerNum → VenueCode → VenueDescription.\nSolución: crear la tabla VENUE (VenueCode, VenueDescription) y dejar VenueCode en DINNER como llave foránea. Así la descripción de cada lugar se guarda una sola vez y, si cambia, se actualiza en un único sitio.\nResultado final: MEMBER, DINNER, VENUE, FOOD y MEMBER-DINNER-FOOD, todas en 3FN.',
      },
    ],
  },

  {
    id: 'visitas-clinica',
    title: 'Normalización - Visitas a la Clínica',
    description:
      'Normalización de una relación que registra las visitas de pacientes a proveedores de salud, con su diagnóstico, desde la verificación de 1FN hasta la tercera forma normal.',
    statement:
      'Una clínica registra las visitas de sus pacientes con los atributos VisitaNo, DiaVisita, PacNo, PacEdad, PacCiudad, ProvNo, ProvEspecialidad y Diagnostico. En una visita el paciente puede ser atendido por más de un proveedor.\nDependencias dadas:\n• PacNo → PacEdad, PacCiudad\n• ProvNo → ProvEspecialidad\n• VisitaNo → PacNo, DiaVisita, PacEdad, PacCiudad\n• (VisitaNo, ProvNo) → Diagnostico\nSe pide determinar si la relación está en 1FN y normalizarla hasta 3FN.',
    date: '2026',
    steps: [
      {
        label: 'Relación base',
        image: '/normalizacion/ejercicio4/base.png',
        explanation:
          'La relación ya cumple 1FN: todos los atributos son atómicos y no hay grupos repetitivos. Cuando una visita tiene varios proveedores, cada uno ocupa su propia fila con su diagnóstico.\nClave: (VisitaNo, ProvNo).\nDependencias funcionales:\n• PacNo → PacEdad, PacCiudad\n• ProvNo → ProvEspecialidad\n• VisitaNo → PacNo, DiaVisita, PacEdad, PacCiudad\n• (VisitaNo, ProvNo) → Diagnostico',
      },
      {
        label: '1FN',
        image: '/normalizacion/ejercicio4/1fn.png',
        explanation:
          'Se verifica que la relación está en 1FN: cada celda tiene un solo valor, no hay atributos multivaluados ni grupos repetitivos y cada fila se identifica con (VisitaNo, ProvNo). No se requiere ningún cambio.\nLo que sí se observa es la redundancia: los datos de la visita y del paciente se repiten cuando una visita tiene más de un proveedor, y la especialidad del proveedor se repite en cada una de sus visitas. Esto se resuelve en 2FN.',
      },
      {
        label: '2FN',
        image: '/normalizacion/ejercicio4/2fn.png',
        explanation:
          'Una relación está en 2FN si está en 1FN y ningún atributo depende solo de una parte de la clave. Aquí DiaVisita, PacNo, PacEdad y PacCiudad dependen solo de VisitaNo, y ProvEspecialidad depende solo de ProvNo.\nSolución: separar en tres tablas. CITA (VisitaNo, DiaVisita, PacNo, PacEdad, PacCiudad), PROVEDOR (ProvNo, ProvEspecialidad) y CITA-PROVEEDOR (VisitaNo, ProvNo, Diagnostico), que conserva la clave compuesta porque Diagnostico depende de ambos atributos.\nEn CITA todavía queda un problema: PacEdad y PacCiudad dependen de PacNo, que a su vez depende de VisitaNo. Se resuelve en 3FN.',
      },
      {
        label: '3FN',
        image: '/normalizacion/ejercicio4/3fn.png',
        explanation:
          'Una relación está en 3FN si está en 2FN y no tiene dependencias transitivas. En CITA, PacEdad y PacCiudad dependen de PacNo y PacNo depende de VisitaNo, es decir: VisitaNo → PacNo → PacEdad, PacCiudad.\nSolución: crear la tabla PACIENTE (PacNo, PacEdad, PacCiudad) y dejar PacNo en CITA como llave foránea. Así la edad y la ciudad de cada paciente se guardan una sola vez.\nResultado final: CITA (VisitaNo, DiaVisita, PacNo), PACIENTE, PROVEDOR y CITA-PACIENTE-PROVEEDOR (VisitaNo, ProvNo, Diagnostico), todas en 3FN.',
      },
    ],
  },

  {
    id: 'renta-peliculas',
    title: 'Normalización - Renta de Películas',
    description:
      'Normalización de la relación Rentals de un servicio de alquiler de películas, desde 1FN hasta 3FN, verificando además que no se requiere descomposición adicional para BCNF.',
    statement:
      'Un servicio de alquiler de películas por correo tiene la relación Rentals (RentalID, Title, CustomerID, MailedOutDate, Director, MovieCategory, Price), cuya clave primaria es (RentalID, Title).\nSe pide: indicar si RentalID → CustomerID y Director → Title son verdaderas, listar las dependencias funcionales, normalizar hasta 3FN y verificar si la descomposición cumple BCNF.',
    date: '2026',
    steps: [
      {
        label: 'Relación base',
        image: '/normalizacion/ejercicio5/base.png',
        explanation:
          'Relación Rentals con los datos de la renta, de la película y de su categoría en una sola tabla. Clave primaria: (RentalID, Title).\nVerificación de dependencias:\n• RentalID → CustomerID: verdadera, cada renta pertenece a un solo cliente.\n• Director → Title: falsa, un director puede dirigir varias películas (en cambio Title → Director sí se cumple).\nDependencias funcionales:\n• RentalID → CustomerID, MailedOutDate\n• Title → Director\n• MovieCategory → Price',
      },
      {
        label: '1FN',
        image: '/normalizacion/ejercicio5/1fn.png',
        explanation:
          'Se verifica 1FN: cada celda tiene un solo valor y cada fila se identifica con (RentalID, Title). Cada película rentada ocupa su propia fila, aun cuando pertenezca a la misma renta.\nSe observa redundancia: los datos de la renta (CustomerID y MailedOutDate) se repiten por cada película de la misma renta, y el director, la categoría y el precio se repiten cada vez que una película se renta de nuevo. Esa repetición viene de dependencias parciales de la clave.',
      },
      {
        label: '2FN',
        image: '/normalizacion/ejercicio5/2fn.png',
        explanation:
          'Una relación está en 2FN si está en 1FN y ningún atributo depende solo de una parte de la clave. Aquí CustomerID y MailedOutDate dependen solo de RentalID, y Director, MovieCategory y Price dependen solo de Title.\nSolución: separar los datos de la renta (RENTA) de los datos de la película (PELICULA), de modo que cada atributo dependa de la clave completa de su tabla.\nEn PELICULA todavía queda Price dependiendo de MovieCategory (resaltado en colores: Old → $4.25 y New → $5.50), que se resuelve en 3FN.',
      },
      {
        label: '3FN',
        image: '/normalizacion/ejercicio5/3fn.png',
        explanation:
          'Una relación está en 3FN si está en 2FN y no tiene dependencias transitivas. En PELICULA, Price depende de MovieCategory y MovieCategory depende de Title, es decir: Title → MovieCategory → Price.\nSolución: crear la tabla CATEGORIA (MovieCategory, Price) y dejar MovieCategory en PELICULA como llave foránea. La relación entre rentas y películas queda en RENTA-PELICULA (RentalID, Title).\nResultado final: RENTA (RentalID, CustomerID, MailedOutDate), PELICULA (Title, Director, MovieCategory), CATEGORIA (MovieCategory, Price) y RENTA-PELICULA (RentalID, Title).\nBCNF: no se requiere ningún cambio, porque en todas las tablas cada determinante es una llave candidata.',
      },
    ],
  },

  {
    id: 'clinica-citas',
    title: 'Normalización - Clínica (Citas)',
    description:
      'Normalización de una relación que gestiona las citas de una clínica con sus pacientes, doctores y consultorios, desde la relación base hasta la tercera forma normal.',
    statement:
      'Una clínica gestiona sus citas en una sola relación CITA_CLINICA con los atributos: ID_Cita, Fecha_Cita, Hora_Cita, ID_Paciente, Nombre_Paciente, Telefono_Paciente, ID_Doctor, Nombre_Doctor, Especialidad_Doctor, Consultorio_Asignado, Piso_Consultorio, Diagnóstico y Tratamiento_Recomendado.\nSe pide enumerar las dependencias funcionales, determinar en qué forma normal está y normalizarla hasta 3FN, indicando en cada paso las tablas resultantes con sus claves primarias y foráneas.\nNota: Especialidad_Doctor → Piso_Consultorio no es una dependencia válida, porque una misma especialidad puede ocupar varios pisos.',
    date: '2026',
    steps: [
      {
        label: 'Relación base (2FN)',
        image: '/normalizacion/taller-clinica/base.png',
        explanation:
          'Relación inicial con los datos de la cita, el paciente, el doctor y el consultorio en una sola tabla. Cada celda tiene un solo valor, así que cumple 1FN. Su clave primaria es solo ID_Cita (un único atributo), por lo que no puede haber dependencias parciales y la relación ya está en 2FN. El problema son las dependencias transitivas.\nDependencias funcionales:\n• ID_Cita → Fecha_Cita, Hora_Cita, ID_Paciente, ID_Doctor, Consultorio_Asignado, Diagnóstico, Tratamiento_Recomendado\n• ID_Paciente → Nombre_Paciente, Telefono_Paciente\n• ID_Doctor → Nombre_Doctor, Especialidad_Doctor\n• Consultorio_Asignado → Piso_Consultorio\nCon esto, los datos del paciente, del doctor y del consultorio se repiten en cada cita: si un paciente cambia de teléfono hay que modificar todas sus citas, y si se elimina su única cita se pierden sus datos.',
      },
      {
        label: '3FN',
        image: '/normalizacion/taller-clinica/3fn.png',
        explanation:
          'Una relación está en 3FN si está en 2FN y ningún atributo no clave depende de otro atributo no clave. Aquí Nombre_Paciente y Telefono_Paciente dependen de ID_Paciente; Nombre_Doctor y Especialidad_Doctor dependen de ID_Doctor; y Piso_Consultorio depende de Consultorio_Asignado.\nSolución: separar en cuatro tablas.\n• CITA (ID_Cita, Fecha_Cita, Hora_Cita, ID_Paciente, ID_Doctor, Consultorio_Asignado, Diagnóstico, Tratamiento_Recomendado). PK: ID_Cita. FK: ID_Paciente, ID_Doctor y Consultorio_Asignado.\n• PACIENTE (ID_Paciente, Nombre_Paciente, Telefono_Paciente)\n• DOCTOR (ID_Doctor, Nombre_Doctor, Especialidad_Doctor)\n• CONSULTORIO (Consultorio_Asignado, Piso_Consultorio)\nEn las imágenes, el subrayado simple marca la llave primaria y el doble la llave foránea.\nBCNF: no se requiere ningún cambio, porque en todas las tablas cada determinante es llave candidata.',
      },
    ],
  },

  {
    id: 'tienda-sucursales',
    title: 'Normalización - Tienda (Ventas por Sucursal)',
    description:
      'Normalización de una relación de ventas de una tienda con varias sucursales, productos y vendedores, pasando por la dependencia parcial (2FN) y la transitiva (3FN).',
    statement:
      'Una tienda distribuye productos en varias sucursales y registra sus ventas en una sola relación VENTA_SUCURSAL con los atributos: ID_Venta, Fecha_Venta, ID_Sucursal, Nombre_Sucursal, Ciudad_Sucursal, ID_Producto, Nombre_Producto, Categoría_Producto, Precio_Unitario, Cantidad_Vendida, ID_Vendedor, Nombre_Vendedor y Comisión_Vendedor.\nSe pide enumerar las dependencias funcionales, determinar en qué forma normal está y normalizarla paso a paso hasta 3FN, indicando las tablas con sus claves primarias y foráneas.\nSupuesto: una venta puede incluir varios productos, cada uno con su cantidad.',
    date: '2026',
    steps: [
      {
        label: 'Relación base',
        image: '/normalizacion/taller-tienda/base.png',
        explanation:
          'Relación inicial con los datos de la venta, la sucursal, el producto y el vendedor en una sola tabla. Como una venta puede tener varios productos, la clave primaria es (ID_Venta, ID_Producto). Cumple 1FN, pero no 2FN porque hay atributos que dependen solo de una parte de la clave.\nDependencias funcionales:\n• ID_Venta → Fecha_Venta, ID_Sucursal, ID_Vendedor\n• ID_Sucursal → Nombre_Sucursal, Ciudad_Sucursal\n• ID_Vendedor → Nombre_Vendedor, Comisión_Vendedor\n• ID_Producto → Nombre_Producto, Categoría_Producto, Precio_Unitario\n• (ID_Venta, ID_Producto) → Cantidad_Vendida\nLos datos del producto y de la venta se repiten por cada fila: si cambia el precio de un producto o la comisión de un vendedor hay que actualizar muchos registros, y si alguno falla quedan datos inconsistentes.',
      },
      {
        label: '2FN',
        image: '/normalizacion/taller-tienda/2fn.png',
        explanation:
          'Una relación está en 2FN si está en 1FN y ningún atributo depende solo de una parte de la clave. Aquí los datos de la venta (fecha, sucursal y vendedor) dependen solo de ID_Venta, y los datos del producto dependen solo de ID_Producto. Solo Cantidad_Vendida depende de la clave completa.\nSolución: separar en tres tablas.\n• VENTA (ID_Venta, Fecha_Venta, ID_Sucursal, Nombre_Sucursal, Ciudad_Sucursal, ID_Vendedor, Nombre_Vendedor, Comisión_Vendedor). PK: ID_Venta.\n• PRODUCTO (ID_Producto, Nombre_Producto, Categoría_Producto, Precio_Unitario). PK: ID_Producto.\n• VENTA-PRODUCTO (ID_Venta, ID_Producto, Cantidad_Vendida). PK: (ID_Venta, ID_Producto).\nEn VENTA todavía quedan dependencias transitivas: la sucursal y el vendedor dependen de ID_Venta, pero sus datos dependen de ID_Sucursal e ID_Vendedor. Se resuelve en 3FN.',
      },
      {
        label: '3FN',
        image: '/normalizacion/taller-tienda/3fn.png',
        explanation:
          'Una relación está en 3FN si está en 2FN y no tiene dependencias transitivas. En VENTA, Nombre_Sucursal y Ciudad_Sucursal dependen de ID_Sucursal, y Nombre_Vendedor y Comisión_Vendedor dependen de ID_Vendedor, que a su vez dependen de ID_Venta.\nSolución: crear las tablas SUCURSAL y VENDEDOR y dejar sus identificadores en VENTA como llaves foráneas.\n• VENTA (ID_Venta, Fecha_Venta, ID_Sucursal, ID_Vendedor). PK: ID_Venta. FK: ID_Sucursal, ID_Vendedor.\n• SUCURSAL (ID_Sucursal, Nombre_Sucursal, Ciudad_Sucursal)\n• VENDEDOR (ID_Vendedor, Nombre_Vendedor, Comisión_Vendedor)\n• PRODUCTO (ID_Producto, Nombre_Producto, Categoría_Producto, Precio_Unitario)\n• VENTA-PRODUCTO (ID_Venta, ID_Producto, Cantidad_Vendida). FK: ID_Venta, ID_Producto.\nAhora el precio de un producto y la comisión de un vendedor se guardan una sola vez. En las imágenes, el subrayado simple marca la llave primaria y el doble la llave foránea.\nBCNF: no se requiere ningún cambio, porque en todas las tablas cada determinante es llave candidata.',
      },
    ],
  },
];
