CREATE TABLE viajero (
    id_viajero NUMBER(6) PRIMARY KEY,
    nombre     VARCHAR2(50) NOT NULL,
    apellido   VARCHAR2(50) NOT NULL,
    pais       VARCHAR2(40)
);

CREATE TABLE epoca (
    id_epoca    NUMBER(6) PRIMARY KEY,
    nombre      VARCHAR2(80) NOT NULL,
    anio_inicio NUMBER(7) NOT NULL,
    anio_fin    NUMBER(7) NOT NULL
);

CREATE TABLE viaje (
    id_viaje    NUMBER(8) PRIMARY KEY,
    id_viajero  NUMBER(6) NOT NULL REFERENCES viajero (id_viajero),
    id_epoca    NUMBER(6) NOT NULL REFERENCES epoca (id_epoca),
    fecha_viaje DATE NOT NULL,
    costo       NUMBER(12,2) NOT NULL
);

INSERT INTO viajero VALUES (1, 'Marty', 'Romero', 'Colombia');
INSERT INTO viajero VALUES (2, 'Emma', 'Brown', 'Estados Unidos');
INSERT INTO viajero VALUES (3, 'Camila', 'Torres', 'Colombia');
INSERT INTO viajero VALUES (4, 'Hiroshi', 'Tanaka', 'Japon');
INSERT INTO viajero VALUES (5, 'Lucia', 'Fernandez', 'Espana');
INSERT INTO viajero VALUES (6, 'Pierre', 'Dubois', 'Francia');
INSERT INTO viajero VALUES (7, 'Andres', 'Gomez', 'Colombia');
INSERT INTO viajero VALUES (8, 'Sofia', 'Martins', 'Brasil');

INSERT INTO epoca VALUES (1, 'Imperio Romano', -27, 476);
INSERT INTO epoca VALUES (2, 'Edad Media', 476, 1453);
INSERT INTO epoca VALUES (3, 'Renacimiento', 1400, 1600);
INSERT INTO epoca VALUES (4, 'Revolucion Francesa', 1789, 1799);
INSERT INTO epoca VALUES (5, 'Prehistoria', -100000, -3000);
INSERT INTO epoca VALUES (6, 'Futuro 2100', 2100, 2100);

INSERT INTO viaje VALUES (1, 1, 1, DATE '2025-01-15', 12000);
INSERT INTO viaje VALUES (2, 1, 1, DATE '2025-02-20', 15500.50);
INSERT INTO viaje VALUES (3, 2, 1, DATE '2025-03-11', 9800);
INSERT INTO viaje VALUES (4, 3, 1, DATE '2025-04-02', 13250.75);
INSERT INTO viaje VALUES (5, 4, 1, DATE '2025-05-19', 18000);
INSERT INTO viaje VALUES (6, 1, 2, DATE '2025-06-08', 14000);
INSERT INTO viaje VALUES (7, 2, 2, DATE '2025-07-14', 11200);
INSERT INTO viaje VALUES (8, 5, 2, DATE '2025-08-22', 12800);
INSERT INTO viaje VALUES (9, 3, 3, DATE '2025-09-05', 16700);
INSERT INTO viaje VALUES (10, 5, 3, DATE '2025-10-17', 10500);
INSERT INTO viaje VALUES (11, 1, 4, DATE '2025-11-03', 13900);
INSERT INTO viaje VALUES (12, 2, 4, DATE '2025-11-25', 14750);
INSERT INTO viaje VALUES (13, 3, 4, DATE '2026-01-09', 12300);
INSERT INTO viaje VALUES (14, 6, 4, DATE '2026-02-14', 15900);
INSERT INTO viaje VALUES (15, 4, 5, DATE '2026-03-28', 25000);

COMMIT;

CREATE VIEW vista_epocas_mas_2_viajes AS
SELECT e.id_epoca, e.nombre, COUNT(v.id_viaje) AS total_viajes, ROUND(AVG(v.costo), 2) AS costo_promedio
FROM epoca e
INNER JOIN viaje v ON v.id_epoca = e.id_epoca
GROUP BY e.id_epoca, e.nombre
HAVING COUNT(v.id_viaje) > 2;

CREATE VIEW vista_viajes_por_viajero AS
SELECT vj.id_viajero, vj.nombre, vj.apellido, COUNT(v.id_viaje) AS total_viajes
FROM viajero vj
LEFT JOIN viaje v ON v.id_viajero = vj.id_viajero
GROUP BY vj.id_viajero, vj.nombre, vj.apellido;
