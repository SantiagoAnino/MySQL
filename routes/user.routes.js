import {Router} from "express"
import connection from "../connection.js"

const router = Router()

router.get("/byId/:id", (req, res) =>{

    const id = req.params.id
    const query = 'SELECT * FROM users WHERE id = ?'

    connection.query(query,[id],(error,results)=>{
        if(error){
            console.log("Error al ejecutar la query", error)
            res.send(500).json("Error al ejecutar la consulta")
        }else{
            res.status(200).json(results)
        }
    })
})

router.get('/all', (req, res) => {
    try {
        const query = 'SELECT * FROM users';
        connection.query(query, (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                res.status(200).json(results);
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al leer los usuarios', error: error.message });
    }
});

router.get('/byName/:name', (req, res) => {
    const name = req.params.name;

    try {
        const query = 'SELECT * FROM users WHERE name = ?';
        connection.query(query, [name], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                if (results.length) {
                    res.status(200).json(results);
                } else {
                    res.status(400).json(`No hay usuarios llamados ${name}`);
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al leer los usuarios', error: error.message });
    }
});

router.post('/byID', (req, res) => {
    const userID = req.body.id;

    try {
        const query = 'SELECT * FROM users WHERE id = ?';
        connection.query(query, [userID], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                if (results.length) {
                    res.status(200).json(results);
                } else {
                    res.status(400).json(`No existe el usuario: ${userID}`);
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al leer los usuarios', error: error.message });
    }
});

const getRandomNumber = () => Math.floor(Math.random() * 1000).toString().padStart(3, '0');

router.post('/addUser', async (req, res) => {
    try {
        const { name, lastname } = req.body;
        const pass = `${name}${getRandomNumber()}`;

        const query = 'INSERT INTO users (name, lastname, username, pass) VALUES (?, ?, ?, ?)';
        connection.query(query, [name, lastname, `${name}${lastname}`, pass], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                const newUser = {
                    name,
                    lastname,
                    username: `${name}${lastname}`,
                    pass,
                    id: results.insertId,
                };

                res.status(200).json(newUser);
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el usuario", error: error.message });
    }
});

router.put('/updateUser/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, lastname } = req.body;

    try {
        const query = 'UPDATE users SET name = ?, lastname = ?, username = ?, pass = ? WHERE id = ?';
        connection.query(query, [name, lastname, `${name}${lastname}`, `${name}${getRandomNumber()}`, userId], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                if (results.affectedRows > 0) {
                    const updatedUser = {
                        name,
                        lastname,
                        username: `${name}${lastname}`,
                        pass: `${name}${getRandomNumber()}`,
                        id: userId,
                    };

                    res.status(200).json(updatedUser);
                } else {
                    res.status(404).json({ message: `Usuario con ID ${userId} no encontrado` });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
});

export default router