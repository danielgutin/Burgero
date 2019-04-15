const userModel = require('../models/user');
const bcrypt = require("bcrypt");
const config = require('config');
const axios = require('axios');

// All functionallity of register / login goes here.
module.exports = loginController = {
    //------ check if user in DB & if so return positive answer ------ //
    loginUser : async (req, res) => {
        // Check if user with username recieved exist in DB.
        let user = await userModel.findOne({ email : req.body.username});
        if (!user) res.status(400).send('Username not found');
        
        //Check if password matched to the decrypted password in DB.
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if(!isValid) res.status(400).send('Password not Match');
        //the user Authenticated.
        //return users email & id for future usage.
        res.send({ email : user.email, id: user._id, username: user.username });
    },

    //------ register new user, using the userSchema ------- //
    newUser : async (req, res) => {

        //make sure mail is unique & not in db.
        let uniquieMail = await userModel.findOne({ email : req.body.email});
        if (uniquieMail) return res.status(400).send({code : 1, error: 'Failed to create User', content : 'Duplicate email'});
       
        // Creating user using the UserModal.
        const user = new userModel({
            username : req.body.username,
            password : req.body.password,
            email : req.body.email
        });

        //encrypting the password before saving to the db.
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(req.body.password, salt);

        // Create new user record in Users collection.
        try {
            const createUser = await user.save();
            // send back true means user successfully created.
            res.send(true);
        }
        // if creating record fails, console.log the err.
        // may fail for one of two reasons
        // 1. missing field.
        // 2. Duplicate email address.
        catch(err) {
            if(err.code){
                res.send({code : 1, error: 'Failed to create User', content : 'Duplicate email'});
            }
            res.send({code : 2, error: 'Failed to create User', content : 'Missing Field'});
        }

    },
    validateMail : (req, res) => {
         // Validate the email entered is Valid.
         axios.get(`http://apilayer.net/api/check?access_key=${process.env.validatorKey || config.get('mailsender.validator-key')}&email=${req.body.email}`)
          //On Successful registration   
          .then(function (respond) {
            if(respond.data.smtp_check) {
                res.status(200).send('Valid Email');
            } else {
                res.status(400).send('Invalid Email');
            }
          })
          //on falure.
          .catch(function (err) {
            res.status(400).send('Invalid Email');
          });
    }
}