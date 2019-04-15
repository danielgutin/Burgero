
![alt text](https://github.com/danielgutin/burgero/blob/master/burgero-gh.png)

# Burgero - Best Burger In Town App 

### Burgero is small size ordering app.


Live Demo : 
https://burgero.herokuapp.com/

Local computer : 
if you wish to run the app on your local computer, just clone the repo.
* install the packages with `npm install` ( both client & server folders)
* run the code with `npm start` \ `node index` ( first for client, second for server )

Burgero using Mlab service for remote MongoDB, you can of course run mongoDB locally. \
Burgero using serval private keys & properties which stored in config file ( when app not in production).\
**config file contains the following properties:**\
    {\
        "mongoDB" : {\
            "username" : "<mlab username>",\
            "password" : "<mlab password>"\
        },\
        "mailsender" : {\
            "email" : "<email account username>,\
            "password" : "<email account password >",\
            "validator-key" : "<API KEY>"\
        }\
    }

**mongoDB** -  used for Mlab connection.  
**mailsender** - nodeMailer authentication, mandatory step for sending emails.  
**validator-key** - the api key recieved from MailBoxLayer API, used for email address verification.  (https://mailboxlayer.com/)  


**Burgero has serval features :**
- [x] Login with authentication System ( Express + MongoDB )
- [x] Building Hamburger with special Controller
- [X] Generating PDF of the ordered Hamburger
- [X] Cart Containing all the Burgers Ordered.
- [X] Commiting Purchase ( Only registered users )
- [X] Send the reciept To The user's Email.
- [X] Authentication process for Truthy Mail address validation. 
- [ ] Sharing the hamburger via the different social media.
- [ ] Additions of Fries & Different Soft Drinks
- [ ] Responsive screen sizes.


* if you have any suggestions for new features I would love to hear about it.

