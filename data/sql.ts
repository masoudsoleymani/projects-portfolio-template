export interface SqlExercise {
  title: string; // Ej: 'Ejercicio 1'
  tags: string[]; // Conceptos que practica
  statement: string; // Enunciado
  code: string; // Script SQL (Oracle)
}

export interface SqlFolder {
  slug: string;
  title: string;
  description: string;
  icon: string;
  exercises: SqlExercise[];
}

export const sqlFolders: SqlFolder[] = [
  {
    "slug": "c2",
    "title": "C2 · Recuperar datos con SELECT",
    "description": "SELECT, alias, concatenación, literales, NULL y DISTINCT (ejercicios tipo LAB).",
    "exercises": [
      {
        "title": "Resumen salarial",
        "tags": [
          "Concatenación",
          "Literales"
        ],
        "statement": "Muestra una sola columna llamada `Resumen Salarial` con el formato: *King gana 24000 al mes y 288000 al año*.",
        "code": "SELECT last_name || ' gana ' || salary || ' al mes y ' || salary*12 || ' al año'\n       AS \"Resumen Salarial\"\nFROM   hr.employees;\n"
      },
      {
        "title": "Ingreso anual con comisión",
        "tags": [
          "NULL",
          "Aritmética"
        ],
        "statement": "Muestra apellido, salario, `commission_pct` y el ingreso anual total con comisión `12*salary*(1+commission_pct)` con alias `Ingreso Total`. ¿Por qué King sale vacío? ¿Es correcto que salga así?",
        "code": "SELECT last_name, salary, commission_pct,\n       12 * salary * (1 + commission_pct) AS \"Ingreso Total\"\nFROM   hr.employees;\n\n-- King sale vacío porque cualquier operación aritmética con NULL da NULL.\n-- Se arregla con NVL(commission_pct, 0).\n"
      },
      {
        "title": "Combinaciones distintas",
        "tags": [
          "DISTINCT"
        ],
        "statement": "Muestra las combinaciones distintas de `department_id` y `job_id` en EMPLOYEES. ¿Salen más o menos filas que con `SELECT DISTINCT job_id`? ¿Por qué?",
        "code": "SELECT DISTINCT department_id, job_id\nFROM   hr.employees;\n\n-- Salen más filas que con SELECT DISTINCT job_id: un mismo job_id puede estar en\n-- varios departamentos y DISTINCT elimina repetidos de la combinación completa.\n"
      },
      {
        "title": "Operador q",
        "tags": [
          "Comilla alternativa"
        ],
        "statement": "Usando el operador `q`, muestra para cada empleado: *Steven's job is AD_PRES* (con `first_name`) en una columna llamada `Cargo`.",
        "code": "SELECT first_name || q'['s job is ]' || job_id AS \"Cargo\"\nFROM   hr.employees;\n"
      },
      {
        "title": "Rango salarial de los cargos",
        "tags": [
          "Aritmética",
          "Alias"
        ],
        "statement": "Muestra de JOBS: `job_title`, `min_salary`, `max_salary` y la diferencia entre máximo y mínimo con alias `Rango`. Luego ese rango anual.\n#",
        "code": "SELECT job_title,\n       min_salary,\n       max_salary,\n       max_salary - min_salary        AS \"Rango\",\n       (max_salary - min_salary) * 12 AS \"Rango Anual\"\nFROM   hr.jobs;\n"
      }
    ],
    "icon": "ph:folder"
  },
  {
    "slug": "c3",
    "title": "C3 · Restringir y ordenar datos",
    "description": "WHERE, operadores lógicos, LIKE, ORDER BY, FETCH y variables de sustitución.",
    "exercises": [
      {
        "title": "Ejercicio 1",
        "tags": [
          "WHERE",
          "BETWEEN",
          "IN",
          "ORDER BY"
        ],
        "statement": "Muestra apellido, salario y `department_id` de los empleados que ganan entre 5000 y 12000 y trabajan en los departamentos 20 o 50 (sin usar `OR`). Ordena por salario descendente y, si empatan, por apellido.",
        "code": "SELECT last_name, salary, department_id\nFROM   hr.employees\nWHERE  salary BETWEEN 5000 AND 12000\nAND    department_id IN (20, 50)\nORDER BY salary DESC, last_name;\n"
      },
      {
        "title": "Ejercicio 2",
        "tags": [
          "LIKE",
          "ESCAPE",
          "alias en ORDER BY"
        ],
        "statement": "Muestra apellido, `job_id`, `commission_pct` y el salario anual (`Salario Anual`) de los empleados cuyo `job_id` empiece por `SA_` (el `_` debe ser literal) y que tengan comisión. Ordena usando el alias.\n- Extra: ¿por qué `LIKE 'SA_%'` sin ESCAPE también traería un job_id como `SAX`?",
        "code": "SELECT last_name, job_id, commission_pct, salary*12 AS \"Salario Anual\"\nFROM   hr.employees\nWHERE  job_id LIKE 'SA\\_%' ESCAPE '\\'\nAND    commission_pct IS NOT NULL\nORDER BY \"Salario Anual\" DESC;\n"
      },
      {
        "title": "Ejercicio 3",
        "tags": [
          "Precedencia",
          "NOT",
          "NULL"
        ],
        "statement": "Sin ejecutarla, explica qué trae esta consulta:\nSELECT last_name, job_id, salary, department_id FROM employees WHERE job_id LIKE '%MAN' OR job_id LIKE '%REP' AND salary > 10000;\nLuego corrígela para que traiga gerentes (MAN) o representantes (REP) que ganen más de 10000 y que no estén en el departamento 80, sin perder a quien no tiene departamento asignado (Grant).",
        "code": "-- AND se evalúa antes que OR, así que la consulta original se lee:\n--   job_id LIKE '%MAN'  OR  (job_id LIKE '%REP' AND salary > 10000)\n-- Trae TODOS los gerentes sin importar el salario, y solo los REP que ganan más de 10000.\n\nSELECT last_name, job_id, salary, department_id\nFROM   hr.employees\nWHERE  (department_id != 80 OR department_id IS NULL)\nAND    salary > 10000\nAND    (job_id LIKE '%MAN' OR job_id LIKE '%REP');\n"
      },
      {
        "title": "Ejercicio 4",
        "tags": [
          "FETCH",
          "OFFSET",
          "WITH TIES"
        ],
        "statement": "a) Los 3 empleados más recientes (por `hire_date`) del departamento 50.\nb) La \"página 3\" del listado de empleados ordenado por apellido, mostrando 4 por página.\nc) Los 5 salarios más altos incluyendo empates. ¿En qué se diferencia el resultado si usas `ONLY`?",
        "code": "-- a) Los 3 empleados más recientes del departamento 50\nSELECT employee_id, first_name, last_name, hire_date\nFROM   hr.employees\nWHERE  department_id = 50\nORDER BY hire_date DESC\nFETCH FIRST 3 ROWS ONLY;\n\n-- b) Página 3 con 4 empleados por página: OFFSET (página - 1) x tamaño = 8\nSELECT last_name\nFROM   hr.employees\nORDER BY last_name\nOFFSET 8 ROWS FETCH NEXT 4 ROWS ONLY;\n\n-- c) Los 5 salarios más altos incluyendo empates\nSELECT last_name, salary\nFROM   hr.employees\nORDER BY salary DESC\nFETCH FIRST 5 ROWS WITH TIES;\n"
      },
      {
        "title": "Ejercicio 5",
        "tags": [
          "&",
          "&&"
        ],
        "statement": "Sobre la tabla JOBS:\na) Muestra `job_title`, `min_salary` y una columna que el usuario elija una sola vez (`&&`), de los cargos cuyo `min_salary` sea mayor o igual a un valor que el usuario digite (`&`). Ordena por la misma columna elegida.",
        "code": "SELECT job_title, min_salary, &&columna\nFROM   hr.jobs\nWHERE  min_salary >= &salario_minimo\nORDER BY &columna;\n"
      }
    ],
    "icon": "ph:folder"
  },
  {
    "slug": "c4",
    "title": "C4 · Funciones de una sola fila",
    "description": "Funciones de carácter, numéricas y de fecha, y funciones anidadas.",
    "exercises": [
      {
        "title": "Ejercicio 1",
        "tags": [
          "Mayúsculas",
          "LENGTH",
          "SUBSTR"
        ],
        "statement": "Muestra `employee_id`, el apellido en mayúsculas con alias `APELLIDO` y la cantidad de letras del apellido con alias `Letras`, solo de los empleados cuyo apellido termine en `'n'` o en `'s'` (compara en minúsculas). Ordena por `Letras` de mayor a menor.",
        "code": "SELECT employee_id, UPPER(last_name) AS APELLIDO, LENGTH(last_name) AS Letras\nFROM   hr.employees\nWHERE  LOWER(SUBSTR(last_name, -1)) IN ('n', 's')\nORDER BY Letras DESC;\n"
      },
      {
        "title": "Ejercicio 2",
        "tags": [
          "INSTR",
          "REPLACE",
          "LPAD"
        ],
        "statement": "Para los empleados del departamento 50 muestra el apellido, la posición de la primera `'a'` del apellido, el `job_id` reemplazando `'ST_'` por `'STOCK_'`, y el salario rellenado a la izquierda con `'$'` hasta completar 10 caracteres con alias `Salario`.",
        "code": "SELECT last_name,\n       INSTR(last_name, 'a')                AS \"Posición a\",\n       REPLACE(job_id, 'ST_', 'STOCK_')     AS Cargo,\n       LPAD(salary, 10, '$')                AS Salario\nFROM   hr.employees\nWHERE  department_id = 50;\n"
      },
      {
        "title": "Ejercicio 3",
        "tags": [
          "Anidamiento"
        ],
        "statement": "Genera un correo corporativo para los empleados que tienen comisión, con alias `Correo`: la primera letra del `first_name` + las primeras 7 letras del `last_name`, todo en minúsculas y terminado en `'@empresa.com'` (ej. Ellen Abel → `eabel@empresa.com`). Usa funciones anidadas.",
        "code": "SELECT LOWER(CONCAT(CONCAT(SUBSTR(first_name, 1, 1), SUBSTR(last_name, 1, 7)), '@empresa.com')) AS Correo\nFROM   hr.employees\nWHERE  commission_pct IS NOT NULL;\n"
      }
    ],
    "icon": "ph:folder"
  },
  {
    "slug": "c5",
    "title": "C5 · Conversión y expresiones condicionales",
    "description": "TO_CHAR, TO_DATE, NVL, NVL2, DECODE y CASE.",
    "exercises": [
      {
        "title": "Ejercicio 1",
        "tags": [
          "TO_CHAR fechas/números",
          "TO_DATE"
        ],
        "statement": "Muestra el apellido, la fecha de contratación con el formato `17 de June de 2011` (sin espacios de relleno, alias `Contratación`) y el salario con formato `$24,000.00` (alias `Salario`), solo de los empleados contratados antes del 1 de enero de 2012 usando `TO_DATE` con un formato numérico. Ordena por fecha de contratación.",
        "code": "SELECT last_name,\n       TO_CHAR(hire_date, 'fmDD \"de\" Month \"de\" YYYY') AS \"Contratación\",\n       TO_CHAR(salary, '$99,999.00')                  AS Salario\nFROM   hr.employees\nWHERE  hire_date < TO_DATE('01/01/2012', 'DD/MM/YYYY')\nORDER BY hire_date;\n"
      },
      {
        "title": "Ejercicio 2",
        "tags": [
          "NVL",
          "NVL2",
          "NVL con TO_CHAR"
        ],
        "statement": "Muestra apellido, salario, la comisión mostrando `0` cuando no tenga (alias `Comisión`), una columna `Tipo` que diga `'Salario + Comisión'` o `'Solo salario'` según tenga comisión o no, el ingreso anual total correcto con la comisión incluida (alias `Ingreso Anual`), y el jefe mostrando `'Sin jefe'` cuando `manager_id` sea NULL (alias `Jefe`). Ordena por `Ingreso Anual` descendente.",
        "code": "SELECT last_name,\n       salary,\n       NVL(commission_pct, 0)                                   AS \"Comisión\",\n       NVL2(commission_pct, 'Salario + Comisión', 'Solo salario') AS \"Tipo\",\n       (salary + salary * NVL(commission_pct, 0)) * 12          AS \"Ingreso Anual\",\n       NVL(TO_CHAR(manager_id), 'Sin jefe')                     AS \"Jefe\"\nFROM   hr.employees\nORDER BY \"Ingreso Anual\" DESC;\n"
      },
      {
        "title": "Ejercicio 3",
        "tags": [
          "DECODE",
          "CASE buscado"
        ],
        "statement": "Muestra apellido, `job_id` y salario, el salario revisado según el cargo usando DECODE (`IT_PROG` +10 %, `ST_CLERK` +15 %, `SA_REP` +20 %, los demás igual, alias `Revisado`), y una categoría usando CASE buscado sobre el salario revisado: menor a 5000 `'Bajo'`, menor a 10000 `'Medio'`, menor a 20000 `'Alto'`, el resto `'Ejecutivo'` (alias `Categoría`). Solo de los empleados de los departamentos 50, 60 y 80.",
        "code": "SELECT last_name, job_id, salary,\n       DECODE(job_id, 'IT_PROG',  1.10*salary,\n                      'ST_CLERK', 1.15*salary,\n                      'SA_REP',   1.20*salary,\n                      salary) AS Revisado,\n       CASE WHEN DECODE(job_id, 'IT_PROG', 1.10*salary, 'ST_CLERK', 1.15*salary,\n                                'SA_REP', 1.20*salary, salary) < 5000  THEN 'Bajo'\n            WHEN DECODE(job_id, 'IT_PROG', 1.10*salary, 'ST_CLERK', 1.15*salary,\n                                'SA_REP', 1.20*salary, salary) < 10000 THEN 'Medio'\n            WHEN DECODE(job_id, 'IT_PROG', 1.10*salary, 'ST_CLERK', 1.15*salary,\n                                'SA_REP', 1.20*salary, salary) < 20000 THEN 'Alto'\n            ELSE 'Ejecutivo'\n       END AS \"Categoría\"\nFROM   hr.employees\nWHERE  department_id IN (50, 60, 80);\n"
      }
    ],
    "icon": "ph:folder"
  },
  {
    "slug": "c6",
    "title": "C6 · Funciones de grupo y datos agregados",
    "description": "COUNT, SUM, AVG, MIN, MAX, GROUP BY y HAVING.",
    "exercises": [
      {
        "title": "Ejercicio 1",
        "tags": [
          "Funciones de grupo",
          "NULL",
          "DISTINCT"
        ],
        "statement": "En una sola consulta sobre EMPLOYEES muestra: el total de empleados, cuántos tienen comisión, cuántos departamentos distintos tienen empleados, el promedio de comisión entre los que tienen comisión y el promedio de comisión contando a todos los empleados (ambos redondeados a 4 decimales), el salario más alto y el más bajo, y la fecha de contratación más antigua y la más reciente. Pon un alias claro a cada columna.",
        "code": "SELECT COUNT(*)                              AS \"Total Empleados\",\n       COUNT(commission_pct)                 AS \"Con Comisión\",\n       COUNT(DISTINCT department_id)         AS \"Deptos Distintos\",\n       ROUND(AVG(commission_pct), 4)         AS \"Prom. Comisión (con)\",\n       ROUND(AVG(NVL(commission_pct, 0)), 4) AS \"Prom. Comisión (todos)\",\n       MAX(salary)                           AS \"Salario Máximo\",\n       MIN(salary)                           AS \"Salario Mínimo\",\n       MIN(hire_date)                        AS \"Más Antigua\",\n       MAX(hire_date)                        AS \"Más Reciente\"\nFROM   hr.employees;\n"
      },
      {
        "title": "Ejercicio 2",
        "tags": [
          "GROUP BY varias columnas",
          "WHERE",
          "HAVING",
          "ORDER BY"
        ],
        "statement": "Para cada combinación de departamento y cargo muestra el `department_id`, el `job_id`, la cantidad de empleados, el total de salarios y el salario promedio redondeado a 2 decimales, teniendo en cuenta solo a los empleados que tienen departamento y ganan más de 3000, y mostrando solo los grupos cuyo total de salarios supere 10000. Ordena por departamento ascendente y, dentro de cada departamento, por total de salarios descendente.",
        "code": "SELECT   department_id, job_id,\n         COUNT(*)              AS Empleados,\n         SUM(salary)           AS Total,\n         ROUND(AVG(salary), 2) AS Promedio\nFROM     hr.employees\nWHERE    department_id IS NOT NULL\nAND      salary > 3000\nGROUP BY department_id, job_id\nHAVING   SUM(salary) > 10000\nORDER BY department_id, Total DESC;\n"
      },
      {
        "title": "Ejercicio 3",
        "tags": [
          "Anidamiento",
          "HAVING",
          "WHERE",
          "TO_CHAR"
        ],
        "statement": "Muestra, con formato `$99,999.00` y alias `Mayor Promedio`, el promedio salarial más alto entre los departamentos que tengan al menos 2 empleados, sin tener en cuenta a los empleados que no tienen departamento.",
        "code": "SELECT   TO_CHAR(MAX(AVG(salary)), '$99,999.00') AS \"Mayor Promedio\"\nFROM     hr.employees\nWHERE    department_id IS NOT NULL\nGROUP BY department_id\nHAVING   COUNT(*) >= 2;\n"
      }
    ],
    "icon": "ph:folder"
  },
  {
    "slug": "c7",
    "title": "C7 · Joins",
    "description": "JOIN con USING y ON, self-join, nonequijoin y OUTER JOIN.",
    "exercises": [
      {
        "title": "Ejercicio 1",
        "tags": [
          "JOIN de 5 tablas",
          "USING",
          "ON",
          "WHERE"
        ],
        "statement": "Muestra el apellido de cada empleado, el nombre de su cargo (`job_title`), el nombre de su departamento, la ciudad y el nombre del país donde trabaja, solo para los empleados que trabajan en Estados Unidos (`country_id = 'US'`) y ganan más de 5000. Une JOBS con `USING` y el resto de tablas con `ON`, y ordena por ciudad y luego por apellido.",
        "code": "SELECT e.last_name,\n       j.job_title,\n       d.department_name,\n       l.city,\n       c.country_name\nFROM   hr.employees e\nJOIN   hr.jobs j        USING (job_id)\nJOIN   hr.departments d ON (e.department_id = d.department_id)\nJOIN   hr.locations l   ON (d.location_id = l.location_id)\nJOIN   hr.countries c   ON (l.country_id = c.country_id)\nWHERE  c.country_id = 'US'\nAND    e.salary > 5000\nORDER BY l.city, e.last_name;\n"
      },
      {
        "title": "Ejercicio 2",
        "tags": [
          "Self-join",
          "nonequijoin"
        ],
        "statement": "Muestra, para cada empleado que tenga jefe, su apellido, su salario y su grado salarial (`grade_level` de JOB_GRADES), junto con el apellido y el salario de su jefe, solo para los empleados que fueron contratados antes que su jefe. Ordena por el grado salarial del empleado.",
        "code": "-- Primero se crea la tabla JOB_GRADES (no viene en el esquema HR estándar)\nCREATE TABLE job_grades (\n  grade_level VARCHAR2(3),\n  lowest_sal  NUMBER,\n  highest_sal NUMBER\n);\nINSERT INTO job_grades VALUES ('A', 1000, 2999);\nINSERT INTO job_grades VALUES ('B', 3000, 5999);\nINSERT INTO job_grades VALUES ('C', 6000, 9999);\nINSERT INTO job_grades VALUES ('D', 10000, 14999);\nINSERT INTO job_grades VALUES ('E', 15000, 24999);\nINSERT INTO job_grades VALUES ('F', 25000, 40000);\nCOMMIT;\n\n-- Consulta: self-join (jefe) + nonequijoin (grado salarial)\nSELECT   e.last_name   AS empleado, e.salary  AS salario,\n         j.grade_level AS grado,\n         em.last_name  AS jefe,     em.salary AS salario_jefe\nFROM     hr.employees e\nJOIN     hr.employees em ON (e.manager_id = em.employee_id)\nJOIN     job_grades j    ON (e.salary BETWEEN j.lowest_sal AND j.highest_sal)\nWHERE    e.hire_date < em.hire_date\nORDER BY j.grade_level;\n"
      },
      {
        "title": "Ejercicio 3",
        "tags": [
          "LEFT JOIN",
          "funciones de grupo"
        ],
        "statement": "Muestra todos los departamentos, incluidos los que no tienen empleados, con el nombre del departamento, la ciudad, la cantidad de empleados (que debe ser 0 cuando no tenga) y el salario promedio redondeado a 2 decimales (que debe mostrar 0 cuando no tenga empleados). Ordena por cantidad de empleados de mayor a menor.",
        "code": "SELECT   d.department_name, l.city,\n         COUNT(e.employee_id)               AS cantidad,\n         NVL(ROUND(AVG(e.salary), 2), 0)    AS promedio\nFROM     hr.departments d\nJOIN     hr.locations   l ON (d.location_id = l.location_id)\nLEFT JOIN hr.employees  e ON (d.department_id = e.department_id)\nGROUP BY d.department_name, l.city\nORDER BY cantidad DESC;\n"
      }
    ],
    "icon": "ph:folder"
  },
  {
    "slug": "c8",
    "title": "C8 · Subconsultas",
    "description": "Subconsultas de una y varias filas, ANY/ALL, varias columnas y NULL.",
    "exercises": [
      {
        "title": "Ejercicio 1",
        "tags": [
          "Subconsultas de una fila",
          "función de grupo"
        ],
        "statement": "Muestra el apellido, el `job_id`, el salario y la fecha de contratación de los empleados que tienen el mismo cargo que Davies, fueron contratados después que él y ganan menos que el salario promedio de toda la empresa. No escribas ningún valor a mano: todo debe salir de subconsultas.",
        "code": "SELECT last_name,\n       job_id,\n       salary,\n       hire_date\nFROM   hr.employees\nWHERE  job_id    = (SELECT job_id    FROM hr.employees WHERE last_name = 'Davies')\nAND    hire_date > (SELECT hire_date FROM hr.employees WHERE last_name = 'Davies')\nAND    salary    < (SELECT AVG(salary) FROM hr.employees);\n"
      },
      {
        "title": "Ejercicio 2",
        "tags": [
          "HAVING",
          "ALL"
        ],
        "statement": "Muestra el `department_id`, la cantidad de empleados y el salario máximo de los departamentos cuyo salario máximo sea mayor que el salario de todos los empleados del departamento 60, sin tener en cuenta a los empleados sin departamento. Ordena por salario máximo de mayor a menor.",
        "code": "SELECT   department_id,\n         COUNT(*)     AS empleados,\n         MAX(salary)  AS maximo\nFROM     hr.employees\nWHERE    department_id IS NOT NULL\nGROUP BY department_id\nHAVING   MAX(salary) > ALL (SELECT salary\n                            FROM   hr.employees\n                            WHERE  department_id = 60)\nORDER BY maximo DESC;\n"
      },
      {
        "title": "Ejercicio 3",
        "tags": [
          "Varias columnas",
          "NOT IN con NULL"
        ],
        "statement": "Muestra el nombre del departamento, el apellido y el salario de los empleados que tienen el salario más alto de su departamento (comparando salario y departamento por pares), pero solo de los que no son jefes de nadie. Ten cuidado con los NULL de `manager_id`.",
        "code": "SELECT d.department_name, e.last_name, e.salary\nFROM   hr.employees e\nJOIN   hr.departments d ON (e.department_id = d.department_id)\nWHERE  (e.salary, e.department_id) IN (SELECT   MAX(salary), department_id\n                                       FROM     hr.employees\n                                       GROUP BY department_id)\nAND    e.employee_id NOT IN (SELECT manager_id\n                             FROM   hr.employees\n                             WHERE  manager_id IS NOT NULL);\n"
      }
    ],
    "icon": "ph:folder"
  },
  {
    "slug": "c9",
    "title": "C9 · Operadores de conjuntos",
    "description": "UNION, UNION ALL, INTERSECT y MINUS.",
    "exercises": [
      {
        "title": "Ejercicio 1",
        "tags": [
          "UNION ALL",
          "columna faltante",
          "ORDER BY"
        ],
        "statement": "Muestra el `employee_id`, el `job_id` y el salario de todos los cargos actuales (EMPLOYEES) y anteriores (JOB_HISTORY) de los empleados, incluyendo repetidos. Como JOB_HISTORY no tiene salario, esa columna debe quedar vacía para los cargos anteriores. Ordena por `employee_id` y luego por `job_id`.",
        "code": "SELECT employee_id,\n       job_id,\n       salary AS \"SALARIO\"\nFROM   hr.employees\nUNION ALL\nSELECT employee_id,\n       job_id,\n       TO_NUMBER(NULL) AS \"SALARIO\"\nFROM   hr.job_history\nORDER BY 1, 2;\n"
      },
      {
        "title": "Ejercicio 2",
        "tags": [
          "INTERSECT"
        ],
        "statement": "Muestra el `employee_id` y el `job_id` de los empleados que actualmente tienen un cargo que ya habían tenido antes según JOB_HISTORY.",
        "code": "SELECT employee_id,\n       job_id\nFROM   hr.employees\nINTERSECT\nSELECT employee_id,\n       job_id\nFROM   hr.job_history;\n"
      },
      {
        "title": "Ejercicio 3",
        "tags": [
          "MINUS"
        ],
        "statement": "Muestra el `department_id` y el nombre de los departamentos que no tienen ningún empleado asignado, usando un operador de conjuntos (no OUTER JOIN ni subconsultas). Ordena por el nombre del departamento.",
        "code": "SELECT department_id, department_name\nFROM   hr.departments\nMINUS\nSELECT d.department_id, d.department_name\nFROM   hr.departments d\nJOIN   hr.employees  e ON (d.department_id = e.department_id)\nORDER BY 2;\n"
      }
    ],
    "icon": "ph:folder"
  },
  {
    "slug": "generales",
    "title": "Ejercicios generales",
    "description": "Ejercicios estilo laboratorio que combinan varios temas sobre el esquema HR de ORACLE",
    "exercises": [
      {
        "title": "Ejercicio 1",
        "tags": [
          "JOIN de 6 tablas",
          "UPPER",
          "NVL",
          "WHERE",
          "ORDER BY"
        ],
        "statement": "Buscar el nombre completo de los empleados (nombre y apellido en una sola columna, en mayúsculas), el nombre de su cargo, su salario anual incluyendo la comisión y el nombre del país donde trabajan, solo de los empleados del continente 'Americas' contratados antes del año 2010. Ordenar por salario anual de mayor a menor.",
        "code": "SELECT  UPPER(e.FIRST_NAME ||  ' ' || e.LAST_NAME) AS \"Nombre_completo\",\n        j.JOB_TITLE,\n        e.SALARY * 12 * (1+ NVL(e.COMMISSION_PCT, 0)) AS \"SALARIO_ANUAL\",\n        c.COUNTRY_NAME\nFROM HR.EMPLOYEES e\n    JOIN HR.JOBS j ON (e.JOB_ID = j.JOB_ID)\n    JOIN HR.DEPARTMENTS d ON (e.DEPARTMENT_ID = d.DEPARTMENT_ID)\n    JOIN HR.LOCATIONS l ON (d.LOCATION_ID = l.LOCATION_ID)\n    JOIN HR.COUNTRIES c ON (l.COUNTRY_ID = c.COUNTRY_ID)\n    JOIN HR.REGIONS r ON (c.REGION_ID = r.REGION_ID)\nWHERE r.REGION_NAME = 'Americas' AND e.HIRE_DATE < TO_DATE('01/01/2010', 'DD/MM/YYYY')\nORDER BY SALARIO_ANUAL DESC;\n"
      },
      {
        "title": "Ejercicio 2",
        "tags": [
          "GROUP BY",
          "HAVING",
          "TO_CHAR",
          "ROUND"
        ],
        "statement": "Buscar, por cada continente, la cantidad de empleados, el total de salarios con formato $999,999.00 y el salario promedio redondeado a 2 decimales, mostrando solo los continentes que tengan más de 5 empleados. Ordenar por cantidad de empleados de mayor a menor.",
        "code": "SELECT r.REGION_NAME,\n        COUNT(e.EMPLOYEE_ID) AS CANTIDAD_EMPLEADOS,\n        TO_CHAR(SUM(e.SALARY), '$999,999.00') AS SALARIO_TOTAL,\n        ROUND(AVG(e.SALARY),2) AS PROMEDIO\nFROM HR.EMPLOYEES e\n     JOIN HR.DEPARTMENTS d ON (e.DEPARTMENT_ID = d.DEPARTMENT_ID)\n     JOIN HR.LOCATIONS l ON (d.LOCATION_ID = l.lOCATION_ID)\n     JOIN HR.COUNTRIES c ON (l.COUNTRY_ID = c.COUNTRY_ID)\n     JOIN HR.REGIONS r ON (c.REGION_ID = r.REGION_ID)\nGROUP BY r.REGION_NAME\nHAVING COUNT(e.EMPLOYEE_iD) > 5\nORDER BY CANTIDAD_EMPLEADOS DESC;\n"
      },
      {
        "title": "Ejercicio 3",
        "tags": [
          "Self-join",
          "Subconsulta en el FROM",
          "WHERE",
          "ORDER BY"
        ],
        "statement": "Buscar el nombre y apellido de los empleados, el nombre de su departamento, el apellido de su jefe y su salario, solo de los empleados que ganan más que el salario promedio de su propio departamento. Ordenar por nombre del departamento y luego por salario descendente.",
        "code": "SELECT e.FIRST_NAME nombre,\n       e.LAST_NAME apellido,\n       ds.DEPARTMENT_NAME,\n       em.LAST_NAME jefe,\n       e.SALARY salario\nFROM HR.EMPLOYEES e JOIN HR.EMPLOYEES em\n    ON(e.MANAGER_ID = em.EMPLOYEE_ID)\n    JOIN HR.DEPARTMENTS ds ON (e.DEPARTMENT_ID = ds.DEPARTMENT_ID)\n    JOIN (SELECT DEPARTMENT_ID, AVG(SALARY) PROM\n          FROM HR.EMPLOYEES\n          GROUP BY DEPARTMENT_ID) d\n    ON e.DEPARTMENT_ID = d.DEPARTMENT_ID\nWHERE e.SALARY > d.PROM\nORDER BY ds.DEPARTMENT_NAME, e.SALARY DESC;\n"
      },
      {
        "title": "Ejercicio 4",
        "tags": [
          "LEFT JOIN",
          "CASE",
          "NVL",
          "GROUP BY"
        ],
        "statement": "Buscar todos los departamentos, incluso los que no tienen empleados, mostrando el nombre del departamento, la ciudad, el apellido del jefe del departamento (o 'Sin jefe' si no tiene), la cantidad de empleados y una columna Tamaño que diga 'Vacío' si tiene 0 empleados, 'Pequeño' si tiene entre 1 y 5, y 'Grande' si tiene más de 5. Ordenar por cantidad de empleados de mayor a menor.",
        "code": "SELECT d.DEPARTMENT_NAME,\n       l.CITY,\n       NVL (em.LAST_NAME,'Sin jefe') JEFE,\n       COUNT(e.EMPLOYEE_ID) AS CANTIDAD,\n       (CASE WHEN COUNT(e.EMPLOYEE_ID) = 0 THEN 'Vacío'\n             WHEN COUNT(e.EMPLOYEE_ID) >= 1  AND 5 >= COUNT(e.EMPLOYEE_ID) THEN 'Pequeño'\n             ELSE 'Grande' END) AS \"Tamaño\"\nFROM HR.DEPARTMENTS d\n     JOIN HR.LOCATIONS l ON (d.LOCATION_ID = l.LOCATION_ID)\n     LEFT JOIN HR.EMPLOYEES e ON (d.DEPARTMENT_ID = e.DEPARTMENT_ID)\n     LEFT JOIN HR.EMPLOYEES em ON(d.MANAGER_ID = em.EMPLOYEE_ID)\nGROUP BY d.DEPARTMENT_NAME, l.CITY, NVL(em.LAST_NAME, 'Sin jefe')\nORDER BY CANTIDAD DESC;\n"
      }
    ],
    "icon": "ph:folder"
  }
];
