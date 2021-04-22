const express = require('express')
const app = express()
const port = process.env.PORT;
const path = require('path');
//donde estan los gerentes de ruteo
const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const methodOverride = require('method-override');   
const { render } = require('ejs');
// Requerimos este módulo para asegurar compatibilidad de métodos PUT y DELETE en todos los navegadores.
app.use(methodOverride('_method'))

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');

//llamo al ruteo
app.use('/', homeRouter);

app.use('/products', productRouter);

app.use('/', userRouter); 

app.use('/', loginRouter); 

app.use((req, res, next) => {
    res.status(404).render('not-found');
})

/*app.get('/', (req, res) => {
    res.render('home');
});

app.get('/Register', (req, res) => {
    res.render('register');
});

app.get('/Login', (req, res) => {
    res.render('login');
});*/

app.listen(port || 3000, () => {
    if (port == undefined) {
    console.log('Servidor corriendo en el puerto 3000')
    } else {
    console.log('Servidor corriendo en el puerto ' + port);
}});
