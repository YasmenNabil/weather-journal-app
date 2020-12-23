// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app=express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors);

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=8000;
const server=app.listen(port,listening);
function listening(){
    console.log('Server Running at Localhost ' + port);
}

//add GET route to gets data
app.get('/all', sendData);

function sendData (req, res) {
  res.send(projectData);
};

//add POST routr to recieve data
app.post('/data', addData);

function addData (req,res){
    let newData=req.body;
    console.log(newData);
    let newEntry={
        temperature : newData.temperature,
        date : newData.date,
        user_response : newData.user_response
    }
    projectData.push(newEntry);
};

