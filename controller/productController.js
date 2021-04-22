let visitados = require('../data/datosProductos');

let productController = {
    leerTodos: function(){
        console.log('leo productos desde data')
        return visitados
    }
}

module.exports = productController