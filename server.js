// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000 ;
const server = app.listen(port, listening);

// Callback to debug
function listening(){
    console.log(`server runing on localHost: ${port}`);
}

// Initialize all route with a callback function
app.post('/add' , weatherData)
app.get('/all' , getData )


// Callback function to complete GET '/all'

function getData(req ,res) {
    res.send(projectData)
}


// Post Route function

function  weatherData(req, res){
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.feelings;
    res.send();
}



