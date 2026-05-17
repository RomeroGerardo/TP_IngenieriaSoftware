let cursos = []
let idCounter = 1

class CursoRepository {
    crearCurso(nombre, profesor) {
        const curso = { id: idCounter++, nombre, profesor }
        cursos.push(curso)
        return curso
    }

    obtenerCursos() {
        return cursos
    }

}

module.exports = new cursoRepository()
