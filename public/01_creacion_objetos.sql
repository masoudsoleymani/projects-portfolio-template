-- EMPAREJA2 - 01_creacion_objetos.sql
-- Crea la base de datos y tablas
-- Requiere MySQL 8.0.16 o superior.
-- Ejecucion: mysql -u root -p < 01_creacion_objetos.sql

DROP DATABASE IF EXISTS empareja2;
CREATE DATABASE empareja2
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;
USE empareja2;

-- 1. TABLAS

CREATE TABLE ciudad (
    id_ciudad      BIGINT       NOT NULL AUTO_INCREMENT,
    nombre_ciudad  VARCHAR(80)  NOT NULL,
    departamento   VARCHAR(80)  NOT NULL,
    PRIMARY KEY (id_ciudad),
    UNIQUE KEY uq_ciudad_nombre_departamento (nombre_ciudad, departamento)
);

CREATE TABLE universidad (
    id_universidad      BIGINT       NOT NULL AUTO_INCREMENT,
    nombre_universidad  VARCHAR(150) NOT NULL,
    sigla               VARCHAR(20)  NOT NULL,
    calle               VARCHAR(100) NOT NULL,
    barrio              VARCHAR(100) NOT NULL,
    id_ciudad           BIGINT       NOT NULL,
    PRIMARY KEY (id_universidad),
    UNIQUE KEY uq_universidad_nombre (nombre_universidad),
    UNIQUE KEY uq_universidad_sigla (sigla),
    KEY fk_universidad_ciudad (id_ciudad),
    CONSTRAINT fk_universidad_ciudad FOREIGN KEY (id_ciudad) REFERENCES ciudad (id_ciudad)
);

CREATE TABLE carrera (
    id_carrera      BIGINT       NOT NULL AUTO_INCREMENT,
    nombre_carrera  VARCHAR(100) NOT NULL,
    facultad        VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_carrera),
    UNIQUE KEY uq_carrera_nombre (nombre_carrera)
);

CREATE TABLE ofrecer (
    id_universidad  BIGINT NOT NULL,
    id_carrera      BIGINT NOT NULL,
    PRIMARY KEY (id_universidad, id_carrera),
    KEY fk_ofrecer_carrera (id_carrera),
    CONSTRAINT fk_ofrecer_carrera     FOREIGN KEY (id_carrera)     REFERENCES carrera (id_carrera),
    CONSTRAINT fk_ofrecer_universidad FOREIGN KEY (id_universidad) REFERENCES universidad (id_universidad)
);

CREATE TABLE usuario (
    id_usuario        BIGINT       NOT NULL AUTO_INCREMENT,
    correo            VARCHAR(100) NOT NULL,
    contrasena_hash   VARCHAR(255) NOT NULL,
    nombre_usuario    VARCHAR(50)  NOT NULL,
    apellido          VARCHAR(50)  NOT NULL,
    genero            VARCHAR(30)  NOT NULL DEFAULT 'NO_ESPECIFICA',
    fecha_nacimiento  DATE         NOT NULL,
    foto_perfil       VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id_usuario),
    UNIQUE KEY uq_usuario_correo (correo),
    CONSTRAINT chk3_usuario_genero CHECK (genero IN ('MASCULINO','FEMENINO','OTRO','NO_ESPECIFICA'))
);

CREATE TABLE administrador (
    id_usuario               BIGINT    NOT NULL,
    fecha_designacion_admin  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario),
    CONSTRAINT fk_administrador_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuario (id_usuario) ON DELETE CASCADE
);

CREATE TABLE estudiante (
    id_usuario      BIGINT           NOT NULL,
    id_universidad  BIGINT           NOT NULL,
    id_carrera      BIGINT           NOT NULL,
    semestre        TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_usuario),
    KEY ix_estudiante_carrera (id_carrera),
    KEY fk_estudiante_oferta (id_universidad, id_carrera),
    CONSTRAINT fk_estudiante_oferta  FOREIGN KEY (id_universidad, id_carrera)
        REFERENCES ofrecer (id_universidad, id_carrera),
    CONSTRAINT fk_estudiante_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuario (id_usuario) ON DELETE CASCADE,
    CONSTRAINT chk3_estudiante_semestre CHECK (semestre BETWEEN 1 AND 20)
);

CREATE TABLE interes_estudiante (
    id_estudiante  BIGINT      NOT NULL,
    interes        VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_estudiante, interes),
    CONSTRAINT fk_interes_estudiante FOREIGN KEY (id_estudiante)
        REFERENCES estudiante (id_usuario) ON DELETE CASCADE
);

CREATE TABLE red_social (
    id_usuario       BIGINT       NOT NULL,
    tipo_red_social  VARCHAR(50)  NOT NULL,
    url_perfil       VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_usuario, tipo_red_social),
    CONSTRAINT fk_red_social_estudiante FOREIGN KEY (id_usuario)
        REFERENCES estudiante (id_usuario) ON DELETE CASCADE
);

CREATE TABLE reaccion (
    id_autor             BIGINT    NOT NULL,
    numero_reaccion      INT       NOT NULL,
    id_destinatario      BIGINT    NOT NULL,
    fecha_hora_reaccion  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_autor, numero_reaccion),
    UNIQUE KEY uq_reaccion_autor_destinatario (id_autor, id_destinatario),
    KEY ix_reaccion_destinatario (id_destinatario),
    CONSTRAINT fk_reaccion_autor        FOREIGN KEY (id_autor)        REFERENCES estudiante (id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_reaccion_destinatario FOREIGN KEY (id_destinatario) REFERENCES estudiante (id_usuario) ON DELETE CASCADE,
    CONSTRAINT chk3_reaccion_no_a_si_mismo CHECK (id_autor <> id_destinatario)
);

CREATE TABLE comentario (
    id_autor               BIGINT        NOT NULL,
    numero_comentario      INT           NOT NULL,
    id_destinatario        BIGINT        NOT NULL,
    contenido_comentario   VARCHAR(1000) NOT NULL,
    fecha_hora_comentario  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_autor, numero_comentario),
    KEY ix_comentario_destinatario (id_destinatario, fecha_hora_comentario),
    CONSTRAINT fk_comentario_autor        FOREIGN KEY (id_autor)        REFERENCES estudiante (id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_comentario_destinatario FOREIGN KEY (id_destinatario) REFERENCES estudiante (id_usuario) ON DELETE CASCADE,
    CONSTRAINT chk3_comentario_no_a_si_mismo CHECK (id_autor <> id_destinatario)
);

CREATE TABLE reporte (
    id_reporte           BIGINT        NOT NULL AUTO_INCREMENT,
    id_realizador        BIGINT        NOT NULL,
    id_reportado         BIGINT        NOT NULL,
    tipo_reporte         VARCHAR(30)   NOT NULL,
    descripcion_reporte  VARCHAR(1000) DEFAULT NULL,
    estado_reporte       VARCHAR(20)   NOT NULL DEFAULT 'PENDIENTE',
    fecha_hora_reporte   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_reporte),
    KEY ix_reporte_realizador (id_realizador),
    KEY ix_reporte_reportado (id_reportado),
    KEY ix_reporte_estado (estado_reporte, fecha_hora_reporte),
    CONSTRAINT fk_reporte_realizador FOREIGN KEY (id_realizador) REFERENCES estudiante (id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_reporte_reportado  FOREIGN KEY (id_reportado)  REFERENCES estudiante (id_usuario) ON DELETE CASCADE,
    CONSTRAINT chk3_reporte_estado CHECK (estado_reporte IN ('PENDIENTE','EN_REVISION','RESUELTO','DESCARTADO')),
    CONSTRAINT chk3_reporte_no_a_si_mismo CHECK (id_realizador <> id_reportado),
    CONSTRAINT chk3_reporte_tipo CHECK (tipo_reporte IN ('SPAM','ACOSO','PERFIL_FALSO','CONTENIDO_INAPROPIADO','OTRO'))
);
