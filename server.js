
// Setup empty JS object to act as endpoint for all routes
projectData ={};
 // Express to run server and routes
const express = require('express');

// start up an instance of app
const app = express();

///Dependencies
const bodyParser = require('body-parser');
///Middleware
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

const port = process.env.PORT || 8000;
//Spin up the server
const server = app.listen(port, listening);
//const server = app.listen(port, ()=>{console.log(`running on localhost: {$port}`)});
//Call back to debug
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get("/getData", (req, res) =>{
    res.send(projectData);
    console.log(projectData);
});

// Post Route
app.post("/setData", (req, res) => {
    console.log(req.body);
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    //projectData = {...req.body};
    res.send({ message: "Successfull" });
    console.log(projectData);
   
});