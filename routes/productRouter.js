const express = require('express');
const router = express.Router();

const productController = require('../controller/productController');


router.get('/', (req, res) => {
    res.send("Listado de productos")
})

router.get('/create', (req, res) => {
    res.send("Crear un producto")
})

router.get('/:id', (req, res) => {
    res.send("Detalle de producto "+ req.params.id)
})

router.post('/', (req, res) => {
    res.send("Recibe datos de formulario")
    //res.send(req.body)
})


router.get('/edits/:id', (req, res) => {
    res.send("Muestra el formulario para editar el producto")
})

router.put('/', (req, res) => {
    res.send("Modificar producto")
})


router.delete('/:id', (req, res) => {
    res.send("Borra producto")
})


module.exports = router;