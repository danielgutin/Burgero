const express = require('express');
const router = express.Router();

// Different Routers.
const login = require('./login');
const system = require('./system');
const cart = require('./cart');
const mail = require('./mail');


// Define the roots for the different routes.
router.use('/login', login);
router.use('/system', system);
router.use('/cart', cart);
router.use('/mail', mail);



module.exports = router;