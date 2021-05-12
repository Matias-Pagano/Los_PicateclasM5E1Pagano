const express = require('express')
const app = express()
const port = process.env.PORT;
const path = require('path');
const session = require('express-session');
const cookies = require('cookie-parser');
//donde estan los gerentes de ruteo
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const loginRoutes = require('./routes/userRoutes');

const methodOverride = require('method-override');   
const { render } = require('ejs');
// Requerimos este módulo para asegurar compatibilidad de métodos PUT y DELETE en todos los navegadores.
app.use(methodOverride('_method'))

app.use(express.static('public'));
//Para capturar los datos configuramos lo siguiente
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//
app.set('view engine', 'ejs');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
	secret: "Shhh, es un secreto",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());

app.use(userLoggedMiddleware);

//llamo al ruteo
app.use('/', homeRoutes);
app.use('/', userRoutes); 
app.use('/', loginRoutes); 
app.use('/', userRoutes); 

app.use('/products', productRoutes);

app.use((req, res, next) => {
    res.status(404).render('not-found');
    next();
})

app.listen(port || 3000, () => {
    if (port == undefined) {
    console.log('Servidor corriendo en el puerto 3000')
    } else {
    console.log('Servidor corriendo en el puerto ' + port);
}});
