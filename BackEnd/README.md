## Gestor de Cursos Online

Proyecto MVP desarrollado para la materia Ingeniería de Software, aplicando patrones de diseño y arquitectura (MVC, Repository, Singleton) y validado con pruebas en equipo.

 Instalación

   git clone https://github.com/RomeroGerardo/TP_IngenieriaSoftware.git
   cd TP-MVP/BackEnd

Iniciamos proyecto y Creamos Dependencias: 
   npm init -y
   npm install express mysql2
--------------------------------------------------------------------

## Creamos Base de datos:

CREATE DATABASE gestor_cursos;
USE gestor_cursos;

CREATE TABLE profesores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE
);

CREATE TABLE cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  profesor_id INT,
  FOREIGN KEY (profesor_id) REFERENCES profesores(id)
);

CREATE TABLE alumnos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE
);

CREATE TABLE inscripciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  alumno_id INT,
  curso_id INT,
  FOREIGN KEY (alumno_id) REFERENCES alumnos(id),
  FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

## Levantamos Servidor:
node server.js
-------------------------------------------------------
## Patrones aplicados

MVC: controladores manejan la lógica de rutas y llaman a los repositories.

Repository: encapsula consultas SQL y devuelve promesas/objetos.

Singleton: db.js mantiene una única conexión a MySQL.

