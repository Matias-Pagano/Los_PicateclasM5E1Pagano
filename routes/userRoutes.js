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


const upload = multer({ storage: storage });

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//implementacion sobre el router

// Formulario de registro
router.get('/register', guestMiddleware, userController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, userController.login);

// Procesar el login
router.post('/login', userController.loginProcess);

// Perfil de Usuario
router.get('/adminUser', authMiddleware, userController.profile);

// Logout
router.get('/logout/', userController.logout);

 //hacemos visible al router
 module.exports = router;
