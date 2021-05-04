// // Dependencies
// const express = require('express');

// const path = require('path');

// // creating 'express' server
// const app = express();

// // Initial port setup
// const PORT =  process.env.PORT || 8080;

// const notes = require("./db/db.json")



// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.set('view engine', 'ejs')

// app.set('views', './views');

// // 2 routes
// // require("./public/index.html")(app);
// // require("./public/notes.html")(app);

// app.get("/", function(req, res) {
//     res.render("index");
//   });

// app.get("/notes", function(req, res) {
//   res.render("notes");
// });

// app.listen(PORT, () => {
//     console.log("Server is running on " + PORT);
// });






const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require("path");
const uuid = require("uuid");
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");


const app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Setting routes for APIs
//This gets notes saved and joins it in db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

// Post function to add new notes to db.json
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

//used for deleting notes
app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
    res.json(delNote);
})


//HTML calls
//calls home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
//call for notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//Start listen
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});