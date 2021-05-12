const path = require('path');
const { body } = require('express-validator');

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

module.exports = validacionesUser;