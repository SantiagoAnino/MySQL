import {Router} from "express"
import connection from '../connection.js'
import { get_user_byId } from "../utils/user.js";
import { generate_id} from "../utils/sales.js"

const router = Router()

router.post('/add', (req, res) =>{
    const item = parseInt(req.body.item)
    const total = parseFloat(req.body.total)
    const seller = parseInt(req.body.seller)

    const id = generate_id(item, seller)

    try{
        const query = `INSERT INTO sales (id, item, total, seller) VALUES (?,?,?,?)`

        connection.query(query, [id, item, total, seller], (error, results) => {
            if(error){
                console.log("Error al ejecutar la query", error)
                res.send(500).json("Error al ejecutar la consulta")
            }else{
                res.status(200).json(results)
            }
        })
    }catch(error){
        res.send(500).json("Error al ejecutar la consulta",error)
    }
})



router.get('/all', (req, res) => {
    try {
        const query = 'SELECT * FROM sales';
        connection.query(query, (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                if (results.length) {
                    res.status(200).json(results);
                } else {
                    res.status(400).json("No hay ventas");
                }
            }
        });
    } catch (error) {
        res.status(500).json("Error al buscar las ventas");
    }
});

router.get('/byDate/:from/:to', (req, res) => {
    const from = req.params.from;
    const to = req.params.to;

    try {
        const query = 'SELECT * FROM sales WHERE date BETWEEN ? AND ?';
        connection.query(query, [from, to], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                if (results.length) {
                    res.status(200).json(results);
                } else {
                    res.status(400).json(`No hay ventas entre ${from} y ${to}`);
                }
            }
        });
    } catch (error) {
        res.status(500).json("Error al buscar las ventas por fecha");
    }
});

router.post('/details', (req, res) => {
    const from = req.body.from;
    const to = req.body.to;

    try {
        const query = 'SELECT * FROM sales WHERE date BETWEEN ? AND ?';
        connection.query(query, [from, to], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                const mappedResults = results.map(e => {
                    const sellerInfo = get_user_byId(e.seller);
                    const sellerName = sellerInfo ? `${sellerInfo.name} ${sellerInfo.lastname}` : '';
                    return {
                        id: e.id,
                        id_item: e.id_item,
                        total: e.total,
                        date: e.date,
                        seller: sellerName,
                    };
                });
                if (mappedResults.length) {
                    res.status(200).json(mappedResults);
                } else {
                    res.status(400).json(`No hay ventas entre ${from} y ${to}`);
                }
            }
        });
    } catch (error) {
        res.status(500).json("Error al buscar los detalles de ventas");
    }
});

router.post('/byDate', (req, res) => {
    const { date } = req.body;

    if (!date) {
        res.status(400).json({ message: "La fecha es requerida en el cuerpo de la solicitud." });
        return;
    }

    try {
        const query = 'SELECT id, total FROM sales WHERE date = ?';
        connection.query(query, [date], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                if (results.length) {
                    res.status(200).json(results);
                } else {
                    res.status(404).json(`No hay ventas para la fecha ${date}`);
                }
            }
        });
    } catch (error) {
        res.status(500).json("Error al buscar las ventas por fecha");
    }
});

router.put('/updateTotal/:id', async (req, res) => {
    const saleId = req.params.id; // Cambiado a cadena
    const { total } = req.body;

    try {
        const query = 'UPDATE sales SET total = ? WHERE id = ?';
        connection.query(query, [total, saleId], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                if (results.affectedRows > 0) {
                    res.status(200).json({ message: `Total de la venta actualizado para la venta con ID ${saleId}` });
                } else {
                    res.status(404).json({ message: `Venta con ID ${saleId} no encontrada.` });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el total de la venta.' });
    }
});

router.delete('/deleteSale/:id', async (req, res) => {
    const saleId = req.params.id; // Cambiado a cadena

    try {
        const query = 'DELETE FROM sales WHERE id = ?';
        connection.query(query, [saleId], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                if (results.affectedRows > 0) {
                    res.status(200).json({ message: `Venta con ID ${saleId} eliminada correctamente.` });
                } else {
                    res.status(404).json({ message: `Venta con ID ${saleId} no encontrada.` });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la venta.' });
    }
});

export default router