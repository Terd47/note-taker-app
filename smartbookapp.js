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

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  
  app.get("/api/notes", function(req, res) {
      fs.readFile(path.join(__dirname, "/db/db.json"), 'utf-8', (err, data) => {
          if(err){
              console.log(err);
          }
      
          if(data){
              data = JSON.parse(data);
              res.json(data);
          }
      });
  });

  //route to save user input to the database file
  // =============================================================
  app.post('/api/notes', (req, res) => {
    const {title, text} = req.body

    fs.readFile(path.join(__dirname, "/db/db.json"), 'utf-8', (err, data) => {
        if(err){
            console.log(err);
        }
    
        if(data){
            data = JSON.parse(data);
            data.push({
                title: title,
                text: text,
                id: Date.now()
            });
            fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(data), (err) => {
                if(err) {
                    console.log("Error writing to file", err);
                }
                res.json(data);
                res.end();
            });
        }else{
            data =[{
                title: title,
                text: text,
                id: Date.now()
            }];
            fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(data), (err) => {
                if(err) {
                    console.log("Error writing to file", err);
                }
                res.json(data);
                res.end();
            });
            res.send(false);
            res.end();
        }
        console.log('testing this section of code');
    });
})
 
// functionality to delete notes
// =============================================================
app.delete('/api/notes/:id', (req,res) => {
    let { id } = req.params;
    if(id) {
        id = parseInt(id);
        fs.readFile(path.join(__dirname, '/db/db.json'),'utf-8',(err, data) => {
            if(err){
                console.log("Error reading file", err);
            }
            if(data){
                data = JSON.parse(data);
                data = data.filter( d => d.id !== id);
                fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(data), (err) => {
                    if(err){
                        console.log(err);
                    }
                });
                res.json(data);
                res.end();
            } else {
                res.send(false);
                res.end();
            }
        });
    }
});

// redirects user to index.html if searched page is not found
// =============================================================
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

// Starts the server to begin listening on defined port
// =============================================================
app.listen(PORT, function() {
    // prints app name on server startup
    // =============================================================
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
