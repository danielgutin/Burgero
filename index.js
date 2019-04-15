// Express Server
const express = require('express');
// body Obj of the req parser.
const bodyParser = require('body-parser');
// Server requests convinient Monitoring.
const morgan  = require('morgan');
//the main router, contains all routes.
const route = require('./routes');
//mongoose tool for mongo db Connection.
const mongoose = require('mongoose');
// CORS middlware
const cors = require('cors');
// get config variables.
const config = require('config');
//path
const path = require('path');

// App Obj.
const app = express();
//MiddleWares.
// Serve static files from the React frontend app
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static("./client/build"));
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// Server requests convinient Monitoring.
app.use(morgan('tiny'))
// CORS Middleware
app.use(cors());

// Anything that doesn't match the above, send back index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
})

// Router Init.
app.use('/', route);



// Connection to mongoDB ( cloud based DB )
mongoose.connect(`mongodb://${ process.env.MONGO_USERNAME || config.get('mongoDB.username')}:${process.env.MONGO_PASSWORD || config.get('mongoDB.password')}@ds038319.mlab.com:38319/burgero`)
.then(() => {
  console.log('Database connection successful')
  return;
})
.catch(err => {
  console.error('Database connection error')
  console.log(err);
})




app.listen(process.env.PORT || 3001, () => console.log('listening on post ' + process.env.PORT || 3001));