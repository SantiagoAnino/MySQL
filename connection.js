import { connect } from "http2"
import mysql from "mysql"


//es recomendable usar variables de entorno en un .env para que no queden expuestos los datos del servidor en el codigo
const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "aw2"
})

connection.connect((error)=>{
    if (error) {
        console.log("Error al conectar a la base de datos")
        return
    }

    console.log("Conectado a la base de datos")
})

export default connection