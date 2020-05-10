// Standard import tags
const express = require("express");
const app = express();

const path = require("path");
const PORT = process.env.PORT || 3000


app.use(express.static('public'))


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.listen(PORT, function (error) {
    if (error) {
        console.log("You made a mistake")
    } else {
        console.log(`listening on port: locahost:${PORT}`)
    }
})

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./index.html"))
})

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"))
})