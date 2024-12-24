// Imports
const express = require('express'); 
const bodyParser = require('body-parser'); 
// Initialize the app
const app = express();
const port = 8080;
// Start the server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));