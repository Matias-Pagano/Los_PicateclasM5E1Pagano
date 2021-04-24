const express = require('express');
//ruteador de Express
const router = express.Router();
const userController = require('../controller/userController');
//implementacion sobre el router
router.get('/Register', userController.register);

router.get('/Login', userController.login);
 //hacemos visible al router
 module.exports = router;
