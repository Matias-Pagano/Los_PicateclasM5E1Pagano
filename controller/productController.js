// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/jsonDatabase');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');

const { validationResult } = require('express-validator');

let productController = {

    home: (req, res) => {
        console.log('entro al home del produt controller y redirijo')

        res.redirect('/')

    },

// Función que muestra el detalle del producto, cuando hacemos click en la foto
    show: (req, res) => {
        console.log('me hicieron click :' + req.params.id)

      // Le delego al modelo la responsabilidad
     // que la busque por ID del registro seleccionado 
     // es por ello que atrapo em parámetro id  
     const product = productModel.find(req.params.id);
     console.log(product)
     if (product) {
         res.render('productDetail', { product });
     } else {
         res.render('not-found');
     }
 },

// Función que muestra el formulario de crear Productos
    create: (req, res) => {
        console.log('entre a crear')
        res.render('create');
    },
// Función que simula el almacenamiento, en este caso en array
store: (req, res) => {
    console.log('Entre a store')
    console.log(req.files);

    const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
         return res.render('create', {
             errors: resultValidation.mapped(),
             oldData: req.body //Esto es para que no se vaya borrando lo que uno escribe
         });
     }

 // Atrapo los contenido del formulario
    const product = req.body;

    console.log(' soy la nueva: ' +req.body.image)
            console.log('soy la vieja '+ req.body.oldImage)
            product.id = req.params.id;

     // Verificar si viene un archivo, para nombrarlo  
     product.image = req.file ? req.file.filename : req.body.oldImagen;
  
     if (req.body.image===undefined) {
        product.image = product.oldImage
    }
    
      console.log('.......MOSTRA LA IMAGEN.......')
    console.log(product.image)
    console.log(product)
   
   
  // Elimino de la estructura auxiliar, porque no existe en Json 
    delete product.oldImage;


// Delego la responsabilidad al modelo para crear producto  
   console.log(product)
// Cuidade sólo mando el cuerpo del FORM, el Id me lo asigna el Modelo  
productModel.create(product);

    res.redirect('/')
},

// FUnción que muestra el formulario de edición
edit: (req, res) => {
    // Delego al modelo que busque el producto     
         let product = productModel.find(req.params.id);
 
         console.log(product)
         if (product) {
             res.render('edit', { product });
         } else {
             res.render('not-found');
         }
     },

// Función que realiza cambios en el producto seleccionado
update: (req, res) => {
    console.log("Entré al update")
    // Armo la estructura del registro auxiliar (product)

    let  product = req.body;
  

    console.log(' soy la nueva: ' +req.body.image)
    console.log('soy la vieja '+ req.body.oldImage)
    product.id = req.params.id;

 
      product.image = req.file ? req.file.filename : req.body.oldImagen;
    
      if (req.body.image===undefined) {
        product.image = product.oldImage
    }
    
      console.log('.......MOSTRA LA IMAGEN.......')
    console.log(product.image)
    console.log(product)
   
   
  // Elimino de la estructura auxiliar, porque no existe en Json 
    delete product.oldImage;


    // Delego la responsabilidad al modelo que actualice
    productModel.update(product);
      

    res.redirect('/')
},

// Función que elimina del Array visitados ek producto seleccionado
destroy: (req, res) => {
    console.log('entre destroy')
    productModel.delete(req.params.id);

// Ahora se mostrará todo porque los productos los varga de un archivo       
    res.redirect('/')
},


cart: (req, res) => {
    res.render('products/cart');
},

search: (req, res) => {

    let dataABuscar = req.query
    res.send(dataABuscar)
}

}


module.exports = productController

