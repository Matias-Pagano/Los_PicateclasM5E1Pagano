let visitados = require('../data/datosProductos');

let homeController = {
    show: (req, res) => {
        console.log('Soy Home Contoller - Leo productos desde el Array')
      const products = [... visitados]
    
        res.render('home', { products });
    
    }    
}

module.exports = homeController