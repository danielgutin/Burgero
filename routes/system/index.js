var express = require('express');
var router = express.Router();
const systemController = require('../../controllers/system');

// Home page route.
router.post( '/addtocart', systemController.newBurger );

module.exports = router;
