const express = require('express');
//ruteador de Express
const router = express.Router();
const userController = require('../controller/userController');

const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images/avatars'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});

const validacionesUser = [
    body('nombre').notEmpty().withMessage('Debes completar con un nombre válido'),
    body('usuario').notEmpty().withMessage('Debes completar con un nombre válido'),
    body('email').notEmpty().withMessage('Debes completar con un número').bail().isEmail().withMessage('Debes ingresar un Email válido'),
    body('domicilio').notEmpty().withMessage('Debes completar con un domicilio válido'),
    body('perfilUsuario').notEmpty().withMessage('Debes completar este campo'),
    body('password').notEmpty().withMessage('Debes completar con una contraseña válida').bail().isLength({min: 10}).withMessage('La contraseña debe tener al menos 10 caracteres'),
    body('confirmPassword').notEmpty().withMessage('Debes completar con una contraseña válida').bail().isLength({min: 10}).withMessage('La contraseña debe tener al menos 10 caracteres'),
    body('avatar').custom((value, { req }) => {
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

//implementacion sobre el router
router.get('/Register', userController.register);

router.post('/Register', upload.single('avatar'), validacionesUser, userController.storeUser);

router.get('/Login', userController.login);

// router.post('/Login', validacionesUser, userController.userLogin);

router.get('/adminUser', userController.adminUser);

// Detalle de un producto particular (GET)
router.get('/adminUser/:id', userController.showUser);

// El get de la Barra de Búsqueda
router.get('/searchUser', userController.searchUser)

// Formulario de edición de productos (GET)
router.get('/:id/edit', userController.editUser);

// Acción de creación (a donde se envía el formulario) (POST)
router.post('/store', upload.single('image'), validacionesUser, userController.storeUser);

// Acción de edición (a donde se envía el formulario) (PUT)
router.put('/:id', upload.single('image'), userController.updateUser);

// Acción de borrado (DELETE)
router.delete('/:id', userController.destroyUser);

 //hacemos visible al router
 module.exports = router;
