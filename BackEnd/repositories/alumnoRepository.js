// backend/repositories/alumnoRepository.js
const db = require("../db");

class AlumnoRepository {
  crearAlumno(nombre, email) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO alumnos (nombre, email) VALUES (?, ?)",
        [nombre, email],
        (err, result) => {
          if (err) return reject(err);
          resolve({ id: result.insertId, nombre, email });
        }
      );
    });
  }

  obtenerAlumnos() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM alumnos", (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = new AlumnoRepository();
