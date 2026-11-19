-- EMPAREJA2 - 03_consultas_varias.sql
-- Consultas varias sobre las tablas de la base de datos.

USE empareja2;

-- A. CATALOGOS Y PERFILES

-- A1. Universidades con su ciudad (INNER JOIN con USING)
SELECT nombre_universidad, sigla, nombre_ciudad, departamento
FROM universidad
JOIN ciudad USING (id_ciudad)
ORDER BY nombre_universidad;

-- A2. Carreras que ofrece una universidad (INNER JOIN con USING; cambiar el id)
SELECT nombre_carrera, facultad
FROM ofrecer
JOIN carrera USING (id_carrera)
WHERE id_universidad = 1
ORDER BY nombre_carrera;

-- A3. Universidades que ofrecen una carrera (INNER JOIN; cambiar el nombre)
SELECT un.nombre_universidad, un.sigla
FROM carrera c
JOIN ofrecer o      ON o.id_carrera = c.id_carrera
JOIN universidad un ON un.id_universidad = o.id_universidad
WHERE c.nombre_carrera = 'Ingeniería de Sistemas';

-- A4. Perfil de un estudiante (INNER JOIN; cambiar el id)
SELECT CONCAT(u.nombre_usuario, ' ', u.apellido)          AS nombre,
       TIMESTAMPDIFF(YEAR, u.fecha_nacimiento, CURDATE()) AS edad,
       un.nombre_universidad,
       c.nombre_carrera,
       e.semestre
FROM estudiante e
JOIN usuario u      ON u.id_usuario = e.id_usuario
JOIN universidad un ON un.id_universidad = e.id_universidad
JOIN carrera c      ON c.id_carrera = e.id_carrera
WHERE e.id_usuario = 3;

-- A5. Estudiantes de una universidad con filtro de carrera y semestre (INNER JOIN; cambiar valores)
SELECT CONCAT(u.nombre_usuario, ' ', u.apellido) AS nombre, c.nombre_carrera, e.semestre
FROM estudiante e
JOIN usuario u ON u.id_usuario = e.id_usuario
JOIN carrera c ON c.id_carrera = e.id_carrera
WHERE e.id_universidad = 1
  AND e.semestre >= 5
ORDER BY nombre;

-- A6. Carreras que no tienen ningun estudiante (LEFT JOIN + IS NULL)
SELECT c.nombre_carrera
FROM carrera c
LEFT JOIN estudiante e ON e.id_carrera = c.id_carrera
WHERE e.id_usuario IS NULL;

-- A7. Combinaciones universidad-carrera que NO se ofrecen (CROSS JOIN + LEFT JOIN)
SELECT un.sigla, c.nombre_carrera
FROM universidad un
CROSS JOIN carrera c
LEFT JOIN ofrecer o ON o.id_universidad = un.id_universidad
                   AND o.id_carrera = c.id_carrera
WHERE o.id_universidad IS NULL
ORDER BY un.sigla, c.nombre_carrera;

-- A8. Intereses, redes sociales y comentarios de un estudiante (cambiar el id)
SELECT interes FROM interes_estudiante WHERE id_estudiante = 3;

SELECT tipo_red_social, url_perfil FROM red_social WHERE id_usuario = 3;

-- INNER JOIN (el autor del comentario es un usuario)
SELECT CONCAT(nombre_usuario, ' ', apellido) AS autor, contenido_comentario, fecha_hora_comentario
FROM comentario c
JOIN usuario u ON u.id_usuario = c.id_autor
WHERE c.id_destinatario = 3
ORDER BY fecha_hora_comentario DESC;

-- =====================================================================
-- B. ESTADISTICAS
-- =====================================================================

-- B1. Estudiantes por universidad, incluidas las que no tienen (RIGHT JOIN)
SELECT un.sigla, COUNT(e.id_usuario) AS total_estudiantes
FROM estudiante e
RIGHT JOIN universidad un ON un.id_universidad = e.id_universidad
GROUP BY un.id_universidad, un.sigla
ORDER BY total_estudiantes DESC;

-- B2. Estudiantes por carrera (INNER JOIN con USING)
SELECT nombre_carrera, COUNT(*) AS total
FROM estudiante
JOIN carrera USING (id_carrera)
GROUP BY nombre_carrera
ORDER BY total DESC;

-- B3. Estudiantes por genero (INNER JOIN con USING)
SELECT genero, COUNT(*) AS total
FROM usuario
JOIN estudiante USING (id_usuario)
GROUP BY genero;

-- B4. Edad promedio, minima y maxima de los estudiantes (INNER JOIN con USING)
SELECT ROUND(AVG(TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE())), 1) AS edad_promedio,
       MIN(TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()))           AS edad_min,
       MAX(TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()))           AS edad_max
FROM usuario
JOIN estudiante USING (id_usuario);

-- B5. Intereses mas populares (sin JOIN)
SELECT interes, COUNT(*) AS personas
FROM interes_estudiante
GROUP BY interes
ORDER BY personas DESC, interes
LIMIT 10;

-- B6. Estudiantes que mas reacciones han recibido (INNER JOIN)
SELECT CONCAT(u.nombre_usuario, ' ', u.apellido) AS nombre, COUNT(*) AS reacciones_recibidas
FROM reaccion r
JOIN usuario u ON u.id_usuario = r.id_destinatario
GROUP BY r.id_destinatario, nombre
ORDER BY reacciones_recibidas DESC
LIMIT 10;

-- B7. Estudiantes que no han recibido ninguna reaccion (LEFT JOIN + IS NULL)
SELECT e.id_usuario, CONCAT(u.nombre_usuario, ' ', u.apellido) AS nombre
FROM estudiante e
JOIN usuario u ON u.id_usuario = e.id_usuario
LEFT JOIN reaccion r ON r.id_destinatario = e.id_usuario
WHERE r.id_autor IS NULL;

-- B8. Estudiantes sin red social registrada (LEFT JOIN + IS NULL)
SELECT e.id_usuario, CONCAT(u.nombre_usuario, ' ', u.apellido) AS nombre
FROM estudiante e
JOIN usuario u ON u.id_usuario = e.id_usuario
LEFT JOIN red_social rs ON rs.id_usuario = e.id_usuario
WHERE rs.id_usuario IS NULL;

-- B9. Comentarios recibidos por cada estudiante, incluso los que tienen 0 (LEFT JOIN)
SELECT CONCAT(u.nombre_usuario, ' ', u.apellido) AS nombre,
       COUNT(c.numero_comentario) AS comentarios_recibidos
FROM estudiante e
JOIN usuario u ON u.id_usuario = e.id_usuario
LEFT JOIN comentario c ON c.id_destinatario = e.id_usuario
GROUP BY e.id_usuario, nombre
ORDER BY comentarios_recibidos DESC;

-- =====================================================================
-- C. MATCHES Y REACCIONES
-- =====================================================================

-- C1. Todos los matches: reaccion mutua (SELF JOIN)
SELECT r1.id_autor AS estudiante_1, r1.id_destinatario AS estudiante_2
FROM reaccion r1
JOIN reaccion r2 ON r2.id_autor = r1.id_destinatario
                AND r2.id_destinatario = r1.id_autor
WHERE r1.id_autor < r1.id_destinatario
ORDER BY r1.id_autor;

-- C2. Matches de un estudiante con nombre (SELF JOIN + INNER JOIN; cambiar el id)
SELECT CONCAT(u.nombre_usuario, ' ', u.apellido) AS match_con
FROM reaccion r1
JOIN reaccion r2 ON r2.id_autor = r1.id_destinatario
                AND r2.id_destinatario = r1.id_autor
JOIN usuario u   ON u.id_usuario = r1.id_destinatario
WHERE r1.id_autor = 3;

-- C3. Comprobar si dos estudiantes tienen match: 1 = si, 0 = no (SELF JOIN)
SELECT COUNT(*) AS hay_match
FROM reaccion r1
JOIN reaccion r2 ON r2.id_autor = r1.id_destinatario
                AND r2.id_destinatario = r1.id_autor
WHERE r1.id_autor = 3 AND r1.id_destinatario = 4;

-- C4. Quienes reaccionaron a un estudiante y aun no recibieron respuesta (LEFT JOIN + IS NULL)
SELECT r.id_autor
FROM reaccion r
LEFT JOIN reaccion respuesta ON respuesta.id_autor = r.id_destinatario
                            AND respuesta.id_destinatario = r.id_autor
WHERE r.id_destinatario = 3
  AND respuesta.id_autor IS NULL;

-- C5. Estudiantes con intereses en comun con el estudiante 3 (SELF JOIN)
SELECT oi.id_estudiante, COUNT(*) AS intereses_en_comun
FROM interes_estudiante mi
JOIN interes_estudiante oi ON oi.interes = mi.interes
                          AND oi.id_estudiante <> mi.id_estudiante
WHERE mi.id_estudiante = 3
GROUP BY oi.id_estudiante
ORDER BY intereses_en_comun DESC;

-- C6. Companeros de universidad del estudiante 3 a los que aun no ha reaccionado
--     (SELF JOIN + LEFT JOIN + IS NULL)
SELECT e2.id_usuario
FROM estudiante e1
JOIN estudiante e2 ON e2.id_universidad = e1.id_universidad
                  AND e2.id_usuario <> e1.id_usuario
LEFT JOIN reaccion r ON r.id_autor = e1.id_usuario
                    AND r.id_destinatario = e2.id_usuario
WHERE e1.id_usuario = 3
  AND r.id_autor IS NULL;

-- =====================================================================
-- D. REPORTES Y ADMINISTRACION
-- =====================================================================

-- D1. Reportes abiertos con nombre de quien reporta y de quien es reportado
--     (dos INNER JOIN a la misma tabla con alias distintos)
SELECT r.id_reporte, r.tipo_reporte, r.estado_reporte,
       CONCAT(u1.nombre_usuario, ' ', u1.apellido) AS realizador,
       CONCAT(u2.nombre_usuario, ' ', u2.apellido) AS reportado
FROM reporte r
JOIN usuario u1 ON u1.id_usuario = r.id_realizador
JOIN usuario u2 ON u2.id_usuario = r.id_reportado
WHERE r.estado_reporte IN ('PENDIENTE', 'EN_REVISION')
ORDER BY r.fecha_hora_reporte;

-- D2. Reportes por tipo y estado (sin JOIN)
SELECT tipo_reporte, estado_reporte, COUNT(*) AS total
FROM reporte
GROUP BY tipo_reporte, estado_reporte
ORDER BY tipo_reporte, estado_reporte;

-- D3. Usuarios mas reportados (INNER JOIN)
SELECT CONCAT(u.nombre_usuario, ' ', u.apellido) AS nombre, COUNT(*) AS veces_reportado
FROM reporte r
JOIN usuario u ON u.id_usuario = r.id_reportado
GROUP BY r.id_reportado, nombre
ORDER BY veces_reportado DESC;

-- D4. Administradores (INNER JOIN con USING)
SELECT id_usuario, CONCAT(nombre_usuario, ' ', apellido) AS administrador, correo,
       fecha_designacion_admin
FROM administrador
JOIN usuario USING (id_usuario);
