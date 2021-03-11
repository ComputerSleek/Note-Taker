// Dependencies
const express = require('express');

const path = require('path');

// creating 'express' server
const app = express();

// Initial port setup
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2 routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => console.log("Server is running on " + PORT));