// backend/controllers/inscripcionController.js
const inscripcionRepository = require("../repositories/inscripcionRepository");

exports.inscribirAlumno = async (req, res) => {
  const { alumno_id, curso_id } = req.body;
  try {
    const inscripcion = await inscripcionRepository.inscribirAlumno(alumno_id, curso_id);
    res.json(inscripcion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarInscripciones = async (req, res) => {
  try {
    const inscripciones = await inscripcionRepository.obtenerInscripciones();
    res.json(inscripciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
