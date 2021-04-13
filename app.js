const express = require('express')
const app = express()
const port = process.env.PORT;
const path = require('path');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/Register', (req, res) => {
    res.render('register');
});

app.get('/Login', (req, res) => {
    res.render('login');
});

app.listen(port || 3000, () => {
    if (port == undefined) {
    console.log('Servidor corriendo en el puerto 3000')
    } else {
    console.log('Servidor corriendo en el puerto ' + port);
}});
