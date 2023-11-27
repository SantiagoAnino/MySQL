import {Router} from "express"
import connection from "../connection.js"

const router = Router()

router.put('/changePrice', (req, res) =>{
    const data = {
        id : parseInt(req.body.id),
        newPrice : parseFloat(req.body.newPrice),
        type : parseInt(req.body.type)
    }

    const column = data.type == 1 ? 'purchase_price' : 'selling_price'

    try{
        const query = `UPDATE items SET ${column} = ? WHERE id = ?`;
        connection.query(query, [data.newPrice, data.id], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                res.status(200).json(results);
            }
        });
    }catch(error){
        res.send(500).json("Error al ejecutar la consulta", error)
    }
})



// get - mostrar todos los items
router.get('/all', (req, res) => {
    try {
        const query = 'SELECT * FROM items';
        connection.query(query, (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                res.status(200).json(results);
            }
        });
    } catch (error) {
        res.status(500).send("Error al leer los items");
    }
});

router.get('/byName/:art', (req, res) => {
    const articulo = req.params.art;
    try {
        const query = 'SELECT * FROM items WHERE name = ?';
        connection.query(query, [articulo], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                if (results.length) {
                    res.status(200).json(results);
                } else {
                    res.status(400).json(`${articulo} no fue encontrado.`);
                }
            }
        });
    } catch (error) {
        res.status(500).send("Error al leer los items");
    }
});

router.get('/byCategory/:category', (req, res) => {
    const category = req.params.category;
    try {
        const query = 'SELECT * FROM items WHERE category = ?';
        connection.query(query, [category], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                if (results.length) {
                    res.status(200).json(results);
                } else {
                    res.status(400).json(`No hay items en la categoría ${category}.`);
                }
            }
        });
    } catch (error) {
        res.status(500).send("Error al leer los items");
    }
});

router.post('/updateSellingPrice/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const newSellingPrice = req.body.newSellingPrice;

    try {
        const query = 'UPDATE items SET selling_price = ? WHERE id = ?';
        connection.query(query, [newSellingPrice, itemId], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                if (results.affectedRows > 0) {
                    res.status(200).json({ message: `Precio de venta actualizado para el ítem con ID ${itemId}` });
                } else {
                    res.status(404).json({ message: `Item con id ${itemId} no encontrado.` });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el selling_price.' });
    }
});

router.post('/calculateProfit/:id', (req, res) => {
    const itemId = parseInt(req.params.id);

    try {
        const query = 'SELECT purchase_price, selling_price FROM items WHERE id = ?';
        connection.query(query, [itemId], (error, results) => {
            if (error) {
                console.log("Error al ejecutar la query", error);
                res.status(500).json("Error al ejecutar la consulta");
            } else {
                if (results.length) {
                    const purchasePrice = results[0].purchase_price;
                    const sellingPrice = results[0].selling_price;
                    const profit = sellingPrice - purchasePrice;

                    res.status(200).json({ message: `La ganancia bruta del item con ID ${itemId}: $${profit}` });
                } else {
                    res.status(404).json({ message: `Item con id ${itemId} no encontrado.` });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al calcular la ganancia.' });
    }
});
export default router