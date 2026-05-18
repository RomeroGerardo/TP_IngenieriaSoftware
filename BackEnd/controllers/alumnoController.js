// backend/controllers/alumnoController.js
const alumnoRepository = require("../repositories/alumnoRepository");

exports.crearAlumno = async (req, res) => {
  const { nombre, email } = req.body;
  try {
    const alumno = await alumnoRepository.crearAlumno(nombre, email);
    res.json(alumno);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarAlumnos = async (req, res) => {
  try {
    const alumnos = await alumnoRepository.obtenerAlumnos();
    res.json(alumnos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
