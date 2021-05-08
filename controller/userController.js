const jsonDB = require('../model/jsonDatabase');
const userModel = jsonDB('user');
const { validationResult } = require('express-validator');

const controlador = {
    register: (req, res) => {
        res.render('register')
    },
    storeUser: (req, res) => {
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
         return res.render('register', {
             errors: resultValidation.mapped(),
             oldData: req.body //Esto es para que no se vaya borrando lo que uno escribe
         });
     }
        // return res.send('Se ha registrado con éxito') //acá iria un res.redirect hacia la página del uduario

    // Atrapo los contenido del formulario
        const user = req.body;

         // Verificar si viene un archivo, para nombrarlo  
         user.image = req.file ? req.file.filename : '';
      
        console.log(user.image)

    // Delego la responsabilidad al modelo para crear producto  
       console.log(user)
    // Cuidade sólo mando el cuerpo del FORM, el Id me lo asigna el Modelo  
    userModel.create(user);
   
        res.redirect('/')
    },
    login: (req, res) => {
        res.render('login');
    },
    userLogin: (req, res) => {
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
         return res.render('login', {
             errors: resultValidation.mapped(),
             oldData: req.body //Esto es para que no se vaya borrando lo que uno escribe
         });
     }
    }}

module.exports = controlador;