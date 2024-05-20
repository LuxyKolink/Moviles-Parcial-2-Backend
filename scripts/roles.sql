create database if not exists superchat;
drop database if exists superchat;

INSERT INTO roles (name) VALUES ('Auxiliar');
INSERT INTO roles (name) VALUES ('Técnico Redes');
INSERT INTO roles (name) VALUES ('Servicios Generales');
INSERT INTO roles (name) VALUES ('Operador Logístico');
INSERT INTO roles (name) VALUES ('Contador');
INSERT INTO roles (name) VALUES ('Subgerente');

SELECT * FROM superchat.roles;