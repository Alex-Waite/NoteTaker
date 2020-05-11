// Standard import tags
const express = require("express");
const app = express();
const fs = require("fs")
const path = require("path");

// obj destructuring
const {
    v4: uuid4
} = require('uuid');

// Standard express server stuff

const PORT = process.env.PORT || 3050
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


// POSTS the notes (Uploads)

app.post('/api/notes', function (req, res) {
    let notesContent = req.body;
    let note = notesContent;
    note.id = uuid4()
    let notesArray = fs.readFileSync(path.join(__dirname, "./db/db.json"));
    notesArray = JSON.parse(notesArray)
    notesArray.push(note)
    notesArray = JSON.stringify(notesArray)
    fs.writeFile(path.join(__dirname, "./db/db.json"), notesArray, 'utf8', function (error) {
        if (error) {
            console.log("Mistake (json wanst written to file??)");;
        }
        res.send(note);
        console.log("Success!");
    });

});

// GETS the notes

app.get('/api/notes', function (req, res) {
    fs.readFile(path.join(__dirname, "./db/db.json"), function (error, data) {
        if (error) {
            console.log("Mistake somewhere here (unread data???)");
        } else {
            console.log(data)
            let jsonParseData = JSON.parse(data);
            console.log(jsonParseData)
            res.send(jsonParseData);
        }
    });

});

// DELETES the notes

app.delete("/api/notes/:id", function (req, res) {
    let idToBeDel = req.params.id
    console.log(req.params.id)
    path.join(__dirname, "./db/db.json")
})

// Displays the html

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./index.html"))
})

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

// Sets the server up on the specified port

app.listen(PORT, function (error) {
    if (error) {
        console.log("You made a mistake connecting")
    } else {
        console.log(`listening on port: locahost:${PORT}`)
    }
})