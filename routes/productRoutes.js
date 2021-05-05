const express = require('express');
const router = express.Router();
const controller = require('../controller/productController');
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});

const validaciones = [
    body('name').notEmpty().withMessage('Debes completar con un nombre válido'),
    body('descuento').notEmpty().withMessage('Debes completar con un número'),
    body('price').notEmpty().withMessage('Debes completar con un precio válido').bail()
        .isNumeric().withMessage('Debes completar con un número'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.gif', '.png'];
        if (!file) {
            throw new Error('Debes cargar una imagen válida')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son  ${acceptedExtensions.join(', ')}`);

            }

        }
        return true;
    })
]

const upload = multer({ storage: storage });

// Formulario de creación de productos (GET)
router.get('/cart', controller.cart);

// Formulario de creación de productos (GET)
router.get('/create', controller.create);

// Detalle de un producto particular (GET)
router.get('/:id', controller.show);

// El get de la Barra de Búsqueda
router.get('/search', controller.search)

// Formulario de edición de productos (GET)
router.get('/:id/edit', controller.edit);

// Acción de creación (a donde se envía el formulario) (POST)
router.post('/store', upload.single('image'), validaciones, controller.store);

// Acción de edición (a donde se envía el formulario) (PUT)
router.put('/:id', upload.single('image'), controller.update);

// Acción de borrado (DELETE)
router.delete('/:id', controller.destroy);

module.exports = router;