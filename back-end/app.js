// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const axios = require("axios");

// we will put some server logic here later...
// export the express app we created to make it available to other module
app.use(morgan('dev'));
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// app.post('/signup', (req, res) => {
//     console.log(req.body);
//     res.status(200).json({message: 'hello'});

// })

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body);
});

app.get('/searchpage', (req, res) => {
    let drink = req.query.drink;
    axios.get(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${drink}`)
        .then(function (response) {
            //console.log(response);
            console.log(response.data);
            res.status(200).json(response.data.drinks);
        })
        .catch(function (error) {
            console.log(error);
        });    
});

module.exports = app

app.get("/json-example", cors(),(req, res) => {
    // assemble an object with the data we want to send
    console.log(req.body)
    const body = {
      query: req.query.search,
      title: "Hello!",
      heading: "Hello!",
      message: "Welcome to this JSON document, served up by Express",
      imagePath: "/static/images/donkey.jpg",
    }
  
    // send the response as JSON to the client
    res.json(body)
  })
