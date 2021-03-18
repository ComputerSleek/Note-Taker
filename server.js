// Dependencies
const express = require('express');

const path = require('path');

// creating 'express' server
const app = express();

// Initial port setup
const PORT =  process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2 routes
require("./public/index.html")(app);
require("./public/notes.html")(app);

app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });

app.listen(PORT, () => {
    console.log("Server is running on " + PORT);
});