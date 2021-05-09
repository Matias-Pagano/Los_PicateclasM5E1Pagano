const userDB = require('../model/User');
const userModel = userDB('users');
const { validationResult } = require('express-validator');
let bcrypt = require('bcryptjs');

let userController = {

    register: (req, res) => {
        res.render('register')
    },
    login: (req, res) => {
        res.render('login')
    },

    adminUser: (req, res) => {
        console.log('entro al home del produt controller y redirijo')

        res.render('adminUser')

    },

// Función que muestra el detalle del producto, cuando hacemos click en la foto
    showUser: (req, res) => {
        console.log('me hicieron click :' + req.params.id)

      // Le delego al modelo la responsabilidad
     // que la busque por ID del registro seleccionado 
     // es por ello que atrapo em parámetro id  
     const user = userModel.find(req.params.id);
     console.log(user)
     if (user) {
         res.render('adminUser', { user });
     } else {
         res.render('not-found');
     }
 },

// Función que muestra el formulario de crear Productos
    createUser: (req, res) => {
        console.log('entre a register');
        res.render('register');
    },
// Función que simula el almacenamiento, en este caso en array
storeUser: (req, res) => {
    console.log('Entre al registro')
    console.log(req.files);

    const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
         return res.render('register', {
             errors: resultValidation.mapped(),
             oldData: req.body //Esto es para que no se vaya borrando lo que uno escribe
         });
     }

 // Atrapo los contenido del formulario
    const user = req.body;

    console.log(' soy la nueva: ' + req.body.image)
            console.log('soy la vieja '+ req.body.oldImage)
            user.id = req.params.id;

     // Verificar si viene un archivo, para nombrarlo  
     user.image = req.file ? req.file.filename : req.body.oldImagen;
  
     if (req.body.image===undefined) {
        user.image = user.oldImage
    }
    
      console.log('.......MOSTRA LA IMAGEN.......')
    console.log(user.image)
    console.log(user)
   
   
  // Elimino de la estructura auxiliar, porque no existe en Json 
    delete user.oldImage;


// Delego la responsabilidad al modelo para crear producto  
   console.log(user)
// Cuidade sólo mando el cuerpo del FORM, el Id me lo asigna el Modelo  
userModel.create(user);

    res.redirect('/adminUser')
},

// FUnción que muestra el formulario de edición
editUser: (req, res) => {
    // Delego al modelo que busque el producto     
         let user = userModel.find(req.params.id);
 
         console.log(user)
         if (user) {
             res.render('edit', { user });
         } else {
             res.render('not-found');
         }
     },

// Función que realiza cambios en el producto seleccionado
updateUser: (req, res) => {
    console.log("Entré al update")
    // Armo la estructura del registro auxiliar (product)

    let  user = req.body;
  

    console.log(' soy la nueva: ' +req.body.image)
    console.log('soy la vieja '+ req.body.oldImage)
    user.id = req.params.id;

 
      user.image = req.file ? req.file.filename : req.body.oldImagen;
    
      if (req.body.image===undefined) {
        user.image = user.oldImage
    }
    
      console.log('.......MOSTRA LA IMAGEN.......')
    console.log(user.image)
    console.log(user)
   
   
  // Elimino de la estructura auxiliar, porque no existe en Json 
    delete user.oldImage;


    // Delego la responsabilidad al modelo que actualice
    userModel.update(user);
      

    res.redirect('/')
},

// Función que elimina del Array visitados ek producto seleccionado
destroyUser: (req, res) => {
    console.log('entre destroy')
    userModel.delete(req.params.id);

// Ahora se mostrará todo porque los productos los varga de un archivo       
    res.redirect('/')
},


// cart: (req, res) => {
//     res.render('products/cart');
// },

searchUser: (req, res) => {

    let userABuscar = req.query
    res.send(userABuscar)
}

}

module.exports = userController;

// const controlador = {
//     admin: (req, res) => {

//         let users = userModel.all();
//         res.render('adminUser', {users});
//     },
//     register: (req, res) => {
//         res.render('register')
//     },
//     storeUser: (req, res) => {
//         const resultValidation = validationResult(req);
//         if(resultValidation.errors.length > 0){
//          return res.render('register', {
//              errors: resultValidation.mapped(),
//              oldData: req.body //Esto es para que no se vaya borrando lo que uno escribe
//          });
//      }
//         // return res.send('Se ha registrado con éxito') //acá iria un res.redirect hacia la página del uduario

//     // Atrapo los contenido del formulario
//         let users = req.body;

//         usersId = userModel.create(users);

//         res.redirect('/aminUser/' + usersId);

//          // Verificar si viene un archivo, para nombrarlo  
//          users.image = req.file ? req.file.filename : '';
      
//         console.log(users.image)

//     // Delego la responsabilidad al modelo para crear producto  
//        console.log(users)
//     // Cuidade sólo mando el cuerpo del FORM, el Id me lo asigna el Modelo  
//     userModel.register(users);
   
//         res.redirect('/')
//     },
//     login: (req, res) => {
//         res.render('login');
//     },
//     userLogin: (req, res) => {
//         const resultValidation = validationResult(req);
//         if(resultValidation.errors.length > 0){
//          return res.render('login', {
//              errors: resultValidation.mapped(),
//              oldData: req.body //Esto es para que no se vaya borrando lo que uno escribe
//          });
//      }
//     }}

