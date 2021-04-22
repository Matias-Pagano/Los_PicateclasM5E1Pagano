const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/Register', userController.index);

router.get('/Login', userController.login);
 
 module.exports = router;
