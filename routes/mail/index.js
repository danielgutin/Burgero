var express = require('express');
var router = express.Router();

// Mail Controller.
const mailController = require('../../controllers/mail');

// send reciept to user Mail
router.post('/send_reciept', mailController.sendSingleMail );

//export the Mail router ( contains all /login routes.)
module.exports = router;
