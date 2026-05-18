// backend/repositories/inscripcionRepository.js
const db = require("../db");

class InscripcionRepository {
  inscribirAlumno(alumno_id, curso_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO inscripciones (alumno_id, curso_id) VALUES (?, ?)",
        [alumno_id, curso_id],
        (err, result) => {
          if (err) return reject(err);
          resolve({ id: result.insertId, alumno_id, curso_id });
        }
      );
    });
  }

  obtenerInscripciones() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT inscripciones.id, alumnos.nombre AS alumno, cursos.nombre AS curso
         FROM inscripciones
         JOIN alumnos ON inscripciones.alumno_id = alumnos.id
         JOIN cursos ON inscripciones.curso_id = cursos.id`,
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }
}

module.exports = new InscripcionRepository();
