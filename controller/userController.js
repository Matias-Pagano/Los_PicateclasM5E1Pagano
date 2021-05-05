const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('products');
const { validationResult } = require('express-validator');

const controlador = {
    register: (req, res) => {
        res.render('register')
    },
    login: (req, res) => {
        res.render('login');
    }
}

module.exports = controlador;