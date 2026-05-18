const cursoRepository = require("../repositories/cursoRepository")

exports.crearCurso = (req, res) => {
    const {nombre, profesor} = req.body
    const curso = cursoRepository.crearCurso(nombre,profesor)
    res.json(curso)
}

exports.listarCursos = (req, res) => {
    const cursos = cursoRepository.obtenerCursos()
    res.json(cursos)
}
