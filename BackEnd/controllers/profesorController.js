const profesorRepository = require("../repositories/profesorRepository");

exports.crearProfesor = async (req, res) => {
  const { nombre, email } = req.body;
  try {
    const profesor = await profesorRepository.crearProfesor(nombre, email);
    res.json(profesor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarProfesores = async (req, res) => {
  try {
    const profesores = await profesorRepository.obtenerProfesores();
    res.json(profesores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
