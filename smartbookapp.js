// Dependencies
// =============================================================
const fs = require('fs');
const express = require("express");
const path = require("path");
const util =  require('util');
const logo = require('asciiart-logo');

// Sets up the Express App with port number
// =============================================================
let app = express();
let PORT = 3000;

const db = [];

console.log(db);

// static code to present user with the static html files
app.use(express.static('public'));

















// Starts the server to begin listening on defined port
// =============================================================
app.listen(PORT, function() {
    console.log(
        logo({
           name: 'Smart Book App',
           font: 'Big Money-ne',
           linechars: 10,
           padding: 2,
           margin: 3,
           borderColor: 'cyan',
           logoColor: 'bold-cyan',
           textColor: 'bold-green',
        })
        .emptyLine()
        .right('version 1.0')
        .emptyLine()
        .center('Take notes/ Organize your thoughts easily')
        .render()
    );
  console.log("App listening on PORT " + PORT);
});
