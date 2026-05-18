const express = require("express")
const app = express()
app.use(express.json())

const cursoController = require("./controllers/cursoController")
const alumnoController = require("./controllers/alumnoController")
const inscripcionController = require("./controllers/inscripcionController")

app.post("/cursos", cursoController.crearCurso)
app.get("/cursos", cursoController.listarCursos)
app.post("/alumnos", alumnoController.crearAlumno)
app.get("/alumnos", alumnoController.listarAlumnos)
app.post("/inscripciones", inscripcionController.inscribirAlumno)
app.get("/inscripciones", inscripcionController.listarInscripciones)

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
})
