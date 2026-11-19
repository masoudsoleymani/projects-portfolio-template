-- EMPAREJA2 - 02_insercion_datos.sql
-- Datos de prueba (ficticios). Ejecutar DESPUES de 01_creacion_objetos.sql
-- Ejecucion: mysql -u root -p < 02_insercion_datos.sql
--
-- Contenido: 5 ciudades, 6 universidades, 10 carreras, oferta academica,
-- 26 usuarios (2 administradores + 24 estudiantes), intereses, redes
-- sociales, reacciones, comentarios y 7 reportes.

USE empareja2;

-- Catalogos
INSERT INTO ciudad (id_ciudad, nombre_ciudad, departamento) VALUES
(1, 'Bogotá D.C.',   'Bogotá D.C.'),
(2, 'Medellín',      'Antioquia'),
(3, 'Cali',          'Valle del Cauca'),
(4, 'Barranquilla',  'Atlántico'),
(5, 'Bucaramanga',   'Santander');

INSERT INTO universidad (id_universidad, nombre_universidad, sigla, calle, barrio, id_ciudad) VALUES
(1, 'Universidad El Bosque',                    'UNBOSQUE',  'Avenida Carrera 9 No. 131A-02', 'Usaquén',    1),
(2, 'Universidad Nacional de Colombia',         'UNAL',      'Carrera 30 No. 45-03',          'Teusaquillo', 1),
(3, 'Pontificia Universidad Javeriana',         'PUJ',       'Carrera 7 No. 40-62',           'Chapinero',   1),
(4, 'Universidad de los Andes',                 'UNIANDES',  'Carrera 1 No. 18A-12',          'La Candelaria', 1),
(5, 'Universidad del Rosario',                  'UROSARIO',  'Calle 12C No. 6-25',            'La Candelaria', 1),
(6, 'Universidad EAFIT',                        'EAFIT',     'Carrera 49 No. 7 Sur-50',       'El Poblado',  2);

INSERT INTO carrera (id_carrera, nombre_carrera, facultad) VALUES
(1,  'Ingeniería de Sistemas',       'Ingeniería'),
(2,  'Medicina',                     'Medicina'),
(3,  'Psicología',                   'Psicología'),
(4,  'Derecho',                      'Ciencias Jurídicas'),
(5,  'Administración de Empresas',   'Ciencias Económicas y Administrativas'),
(6,  'Diseño Industrial',            'Artes y Diseño'),
(7,  'Biología',                     'Ciencias'),
(8,  'Odontología',                  'Odontología'),
(9,  'Economía',                     'Ciencias Económicas y Administrativas'),
(10, 'Arquitectura',                 'Arquitectura y Diseño');

-- Oferta academica (que carreras ofrece cada universidad)
INSERT INTO ofrecer (id_universidad, id_carrera) VALUES
(1, 1), (1, 2), (1, 3), (1, 5), (1, 6), (1, 8),
(2, 1), (2, 2), (2, 3), (2, 7), (2, 9), (2, 10),
(3, 1), (3, 2), (3, 3), (3, 4), (3, 6), (3, 9), (3, 10),
(4, 1), (4, 3), (4, 4), (4, 5), (4, 7), (4, 9), (4, 10),
(5, 2), (5, 3), (5, 4), (5, 5), (5, 9),
(6, 1), (6, 4), (6, 5), (6, 6), (6, 9);

-- Usuarios (1-2 administradores, 3-26 estudiantes)
INSERT INTO usuario (id_usuario, correo, contrasena_hash, nombre_usuario, apellido, genero, fecha_nacimiento, foto_perfil) VALUES
(1,  'laura.gomez@empareja2.edu.co',   '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Laura',     'Gómez',      'FEMENINO',      '1990-04-12', NULL),
(2,  'carlos.rincon@empareja2.edu.co', '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Carlos',    'Rincón',     'MASCULINO',     '1988-09-30', NULL),
(3,  'vrojas@unbosque.edu.co',         '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Valentina', 'Rojas',      'FEMENINO',      '2003-02-14', 'fotos/vrojas.jpg'),
(4,  'sherrera@unbosque.edu.co',       '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Santiago',  'Herrera',    'MASCULINO',     '2002-07-21', 'fotos/sherrera.jpg'),
(5,  'ctorres@unbosque.edu.co',        '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Camila',    'Torres',     'FEMENINO',      '2004-01-09', 'fotos/ctorres.jpg'),
(6,  'amolina@unbosque.edu.co',        '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Andrés',    'Molina',     'MASCULINO',     '2001-11-03', NULL),
(7,  'dcastro@unbosque.edu.co',        '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Daniela',   'Castro',     'FEMENINO',      '2003-05-27', 'fotos/dcastro.jpg'),
(8,  'svargas@unbosque.edu.co',        '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Sebastián', 'Vargas',     'MASCULINO',     '2002-12-15', NULL),
(9,  'mortiz@unal.edu.co',             '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Mariana',   'Ortiz',      'FEMENINO',      '2004-03-18', 'fotos/mortiz.jpg'),
(10, 'fgutierrez@unal.edu.co',         '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Felipe',    'Gutiérrez',  'MASCULINO',     '2001-08-05', NULL),
(11, 'imejia@unal.edu.co',             '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Isabella',  'Mejía',      'FEMENINO',      '2003-10-22', 'fotos/imejia.jpg'),
(12, 'nparra@unal.edu.co',             '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Nicolás',   'Parra',      'MASCULINO',     '2002-06-30', NULL),
(13, 'sramirez@javeriana.edu.co',      '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Sofía',     'Ramírez',    'FEMENINO',      '2003-09-11', 'fotos/sramirez.jpg'),
(14, 'dsalazar@javeriana.edu.co',      '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'David',     'Salazar',    'MASCULINO',     '2000-12-02', NULL),
(15, 'jpena@javeriana.edu.co',         '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Juliana',   'Peña',       'FEMENINO',      '2004-04-25', NULL),
(16, 'mcardona@javeriana.edu.co',      '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Mateo',     'Cardona',    'MASCULINO',     '2002-02-08', 'fotos/mcardona.jpg'),
(17, 'lbeltran@uniandes.edu.co',       '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Laura',     'Beltrán',    'FEMENINO',      '2003-07-19', 'fotos/lbeltran.jpg'),
(18, 'tacosta@uniandes.edu.co',        '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Tomás',     'Acosta',     'MASCULINO',     '2001-05-13', NULL),
(19, 'gnino@uniandes.edu.co',          '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Gabriela',  'Niño',       'FEMENINO',      '2002-11-29', NULL),
(20, 'aduarte@uniandes.edu.co',        '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Alejandro', 'Duarte',     'MASCULINO',     '2004-08-16', NULL),
(21, 'pcifuentes@urosario.edu.co',     '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Paula',     'Cifuentes',  'OTRO',          '2003-01-31', 'fotos/pcifuentes.jpg'),
(22, 'jospina@urosario.edu.co',        '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Julián',    'Ospina',     'MASCULINO',     '2002-03-07', NULL),
(23, 'nsuarez@urosario.edu.co',       '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Natalia',   'Suárez',     'FEMENINO',      '2003-06-04', NULL),
(24, 'elozano@eafit.edu.co',           '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Esteban',   'Lozano',     'NO_ESPECIFICA', '2001-10-10', NULL),
(25, 'mzapata@eafit.edu.co',           '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Manuela',   'Zapata',     'FEMENINO',      '2004-09-23', 'fotos/mzapata.jpg'),
(26, 'crestrepo@eafit.edu.co',         '$2a$10$7EqJtq98hPqEX7fNZaFWoOa5yQbV1k3pYhJ9x1Z0bKq3mV8cLw5uS', 'Camilo',    'Restrepo',   'MASCULINO',     '2002-04-17', NULL);

INSERT INTO administrador (id_usuario, fecha_designacion_admin) VALUES
(1, '2026-01-15 09:00:00'),
(2, '2026-02-01 10:30:00');

-- (id_usuario, id_universidad, id_carrera, semestre)
INSERT INTO estudiante (id_usuario, id_universidad, id_carrera, semestre) VALUES
(3,  1, 1, 5),  (4,  1, 1, 7),  (5,  1, 3, 3),  (6,  1, 2, 9),  (7,  1, 5, 5),  (8,  1, 8, 6),
(9,  2, 1, 3),  (10, 2, 7, 8),  (11, 2, 3, 5),  (12, 2, 10, 6),
(13, 3, 4, 5),  (14, 3, 1, 10), (15, 3, 6, 3),  (16, 3, 9, 7),
(17, 4, 1, 5),  (18, 4, 7, 8),  (19, 4, 4, 7),  (20, 4, 9, 3),
(21, 5, 3, 5),  (22, 5, 2, 8),  (23, 5, 4, 5),
(24, 6, 5, 9),  (25, 6, 6, 3),  (26, 6, 1, 7);

-- Intereses
INSERT INTO interes_estudiante (id_estudiante, interes) VALUES
(3, 'Videojuegos'), (3, 'Música'), (3, 'Cine'),
(4, 'Videojuegos'), (4, 'Fútbol'), (4, 'Programación'),
(5, 'Lectura'), (5, 'Yoga'), (5, 'Cine'),
(6, 'Fútbol'), (6, 'Gimnasio'),
(7, 'Música'), (7, 'Baile'), (7, 'Viajar'),
(8, 'Videojuegos'), (8, 'Música'),
(9, 'Programación'), (9, 'Anime'), (9, 'Cine'),
(10, 'Senderismo'), (10, 'Fotografía'),
(11, 'Lectura'), (11, 'Yoga'), (11, 'Fotografía'),
(12, 'Dibujo'), (12, 'Música'),
(13, 'Lectura'), (13, 'Viajar'), (13, 'Cine'),
(14, 'Programación'), (14, 'Videojuegos'), (14, 'Fútbol'),
(15, 'Dibujo'), (15, 'Anime'), (15, 'Fotografía'),
(16, 'Fútbol'), (16, 'Gimnasio'), (16, 'Música'),
(17, 'Programación'), (17, 'Senderismo'), (17, 'Videojuegos'),
(18, 'Senderismo'), (18, 'Fotografía'),
(19, 'Lectura'), (19, 'Cine'), (19, 'Viajar'),
(20, 'Fútbol'), (20, 'Videojuegos'),
(21, 'Lectura'), (21, 'Música'), (21, 'Yoga'),
(22, 'Gimnasio'), (22, 'Fútbol'),
(23, 'Baile'), (23, 'Música'), (23, 'Viajar'),
(24, 'Senderismo'), (24, 'Música'),
(25, 'Dibujo'), (25, 'Baile'), (25, 'Anime'),
(26, 'Programación'), (26, 'Videojuegos'), (26, 'Senderismo');

-- Redes sociales
INSERT INTO red_social (id_usuario, tipo_red_social, url_perfil) VALUES
(3,  'INSTAGRAM', 'https://instagram.com/valen.rojas'),
(3,  'TIKTOK',    'https://tiktok.com/@valen.rojas'),
(4,  'INSTAGRAM', 'https://instagram.com/santi.herrera'),
(5,  'INSTAGRAM', 'https://instagram.com/cami.torres'),
(7,  'INSTAGRAM', 'https://instagram.com/dani.castro'),
(9,  'INSTAGRAM', 'https://instagram.com/mari.ortiz'),
(9,  'X',         'https://x.com/mari_ortiz'),
(11, 'INSTAGRAM', 'https://instagram.com/isa.mejia'),
(13, 'LINKEDIN',  'https://linkedin.com/in/sofia-ramirez'),
(14, 'LINKEDIN',  'https://linkedin.com/in/david-salazar'),
(16, 'INSTAGRAM', 'https://instagram.com/mateo.cardona'),
(17, 'INSTAGRAM', 'https://instagram.com/lau.beltran'),
(19, 'LINKEDIN',  'https://linkedin.com/in/gabriela-nino'),
(21, 'INSTAGRAM', 'https://instagram.com/paula.cifuentes'),
(23, 'TIKTOK',    'https://tiktok.com/@nata.suarez'),
(25, 'INSTAGRAM', 'https://instagram.com/manu.zapata'),
(26, 'LINKEDIN',  'https://linkedin.com/in/camilo-restrepo');

-- Reacciones (id_autor, numero_reaccion, id_destinatario, fecha)
INSERT INTO reaccion (id_autor, numero_reaccion, id_destinatario, fecha_hora_reaccion) VALUES
(3, 1, 4,  '2026-10-01 10:00:00'), (3, 2, 7,  '2026-10-01 10:05:00'), (3, 3, 9,  '2026-10-02 18:20:00'),
(4, 1, 3,  '2026-10-01 11:15:00'), (4, 2, 8,  '2026-10-03 09:40:00'),
(5, 1, 6,  '2026-10-02 12:00:00'), (5, 2, 11, '2026-10-04 19:30:00'),
(6, 1, 5,  '2026-10-02 13:10:00'),
(7, 1, 3,  '2026-10-01 21:00:00'), (7, 2, 8,  '2026-10-05 08:15:00'),
(8, 1, 7,  '2026-10-05 09:00:00'),
(9, 1, 3,  '2026-10-03 07:45:00'), (9, 2, 10, '2026-10-06 16:00:00'),
(10, 1, 9, '2026-10-06 17:10:00'),
(11, 1, 5, '2026-10-04 20:00:00'), (11, 2, 12, '2026-10-07 11:00:00'),
(12, 1, 11,'2026-10-07 12:30:00'),
(13, 1, 14,'2026-10-02 14:00:00'), (13, 2, 19,'2026-10-03 15:00:00'),
(14, 1, 13,'2026-10-02 14:30:00'), (14, 2, 17,'2026-10-08 10:00:00'),
(15, 1, 16,'2026-10-04 09:00:00'),
(16, 1, 15,'2026-10-04 10:00:00'), (16, 2, 20,'2026-10-09 13:00:00'),
(17, 1, 14,'2026-10-08 11:00:00'), (17, 2, 18,'2026-10-09 14:00:00'),
(18, 1, 17,'2026-10-09 15:00:00'),
(19, 1, 13,'2026-10-03 16:00:00'),
(20, 1, 16,'2026-10-09 14:00:00'),
(21, 1, 22,'2026-10-05 18:00:00'), (21, 2, 23,'2026-10-05 18:10:00'),
(22, 1, 21,'2026-10-05 19:00:00'),
(23, 1, 21,'2026-10-06 08:00:00'),
(24, 1, 25,'2026-10-06 20:00:00'), (24, 2, 26,'2026-10-06 20:05:00'),
(25, 1, 24,'2026-10-07 09:00:00'),
(26, 1, 24,'2026-10-07 10:00:00'), (26, 2, 17,'2026-10-10 12:00:00');

-- Comentarios (id_autor, numero_comentario, id_destinatario, texto, fecha)
INSERT INTO comentario (id_autor, numero_comentario, id_destinatario, contenido_comentario, fecha_hora_comentario) VALUES
(3,  1, 4,  '¡Vi que también juegas! ¿Te animas a una partida esta semana?',             '2026-10-01 10:30:00'),
(4,  1, 3,  'Claro, el viernes después de clases me va perfecto.',                       '2026-10-01 11:45:00'),
(5,  1, 11, 'Me encantó tu foto del páramo, ¿dónde fue?',                                '2026-10-04 19:45:00'),
(11, 1, 5,  'Fue en Chingaza, te lo recomiendo muchísimo.',                              '2026-10-04 20:10:00'),
(13, 1, 14, 'Hola David, ¿cómo te va con el trabajo de grado?',                          '2026-10-02 14:10:00'),
(14, 1, 13, 'Hola Sofía, ahí vamos, gracias por preguntar.',                             '2026-10-02 15:00:00'),
(17, 1, 18, 'Si organizas otra caminata a Monserrate, cuenta conmigo.',                  '2026-10-09 15:30:00'),
(21, 1, 23, 'Vi que te gusta bailar, ¿conoces alguna academia buena?',                   '2026-10-05 18:30:00'),
(24, 1, 25, 'Tus dibujos están geniales.',                                               '2026-10-06 20:30:00'),
(25, 1, 24, 'Gracias, ¡me alegra que te gusten!',                                        '2026-10-07 09:30:00');

-- Reportes
INSERT INTO reporte (id_realizador, id_reportado, tipo_reporte, descripcion_reporte, estado_reporte, fecha_hora_reporte) VALUES
(5,  8,  'SPAM',                  'Envía el mismo mensaje promocional a varios perfiles.',          'PENDIENTE',   '2026-10-08 09:00:00'),
(9,  12, 'PERFIL_FALSO',          'La foto parece sacada de internet.',                             'EN_REVISION', '2026-10-08 10:30:00'),
(13, 20, 'ACOSO',                 'Insiste en contactarme luego de que le pedí que parara.',        'EN_REVISION', '2026-10-09 08:00:00'),
(17, 26, 'CONTENIDO_INAPROPIADO', 'Comentarios ofensivos en mi perfil.',                            'RESUELTO',    '2026-10-05 12:00:00'),
(21, 24, 'OTRO',                  NULL,                                                             'DESCARTADO',  '2026-10-06 15:00:00'),
(4,  15, 'SPAM',                  'Publica enlaces externos sospechosos.',                          'PENDIENTE',   '2026-10-10 17:00:00'),
(23, 22, 'PERFIL_FALSO',          'Los datos de carrera no coinciden con lo que dice en el perfil.','RESUELTO',    '2026-10-04 11:00:00');
