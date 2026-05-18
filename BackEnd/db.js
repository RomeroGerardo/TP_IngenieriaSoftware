const mysql = require ("mysql2")

let conexion

function getConnection() {
    if(!conexion) {
        conexion =mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "gestor_cursos"
        })

        conexion.connect ((err) => {
            if (err) {
                console.error("Error de Conexión", err)
                return
            }
            console.log("Conexión Exitosa")
        })
    }

    return conexion
}

module.exports = getConnection()