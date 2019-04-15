// nodeMailer obj.
const nodemailer = require("nodemailer");
// get config variables.
var config = require('config');
//path
const path = require('path');
// Handling errors with mailing.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


module.exports = mailFunction = {
    sendSingleMail : (req, res) => {
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.MAIL_USERNAME || config.get('mailsender.email')}`,
            pass: `${process.env.MAIL_PASSWORD || config.get('mailsender.password')}`
        }
        });

        var mailOptions = {
            from: `${process.env.MAIL_USERNAME || config.get('mailsender.email')}`,
            to: `${req.body.email}`,
            subject: 'Burgero Recipt',
            html: `<div><h2>Burgero App - Purchase Receipt</h2><img src="cid:unique@kreata.ee"/><h4>Thank You ${req.body.name} for using Burgero App, created by Daniel Gutin</h4></div>`,
            attachments: [{
            filename: 'burgero-gh.png',
            path: `${path.resolve(__dirname + '/burgero-gh.png')}`,
            cid: 'unique@kreata.ee' //same cid value as in the html img src
            }]
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(400).send('Mail Failed to Connect')
        } else {
            res.status(200).send('succesfully Sent')
        }
        });
    }    
}