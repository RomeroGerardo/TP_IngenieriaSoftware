const db = require("../db");

class ProfesorRepository {
  crearProfesor(nombre, email) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO profesores (nombre, email) VALUES (?, ?)",
        [nombre, email],
        (err, result) => {
          if (err) return reject(err);
          resolve({ id: result.insertId, nombre, email });
        }
      );
    });
  }

  obtenerProfesores() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM profesores", (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = new ProfesorRepository();
