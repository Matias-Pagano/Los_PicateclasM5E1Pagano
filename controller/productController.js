let visitados = require('../data/datosProductos');

let controladorProducto = {
    leerTodos: function(){
        console.log('leo productos desde data')
        return visitados
    }
}

module.exports = controladorProducto