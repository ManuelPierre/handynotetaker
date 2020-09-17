var express = require("express");
var path = require("path");
var fs = require("fs");
var uniqid = require("uniqid");

var app = express();
var PORT = process.env.port || 3000;
const currentID = 0;

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.static("public"));
app.use(express.json());

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var notes = JSON.parse(data);

        console.log(notes);
        res.json(notes);
    });
});

app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id

    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var notes = JSON.parse(data);

        notes = notes.filter(note => {
            return note.id != id
        })

        fs.writeFile("./db/db.json", JSON.stringify(notes), function (
            error,
            data
        ) {
            if (error) {
                return console.log(error);
            }

            console.log("works")

            res.json(notes)
        });
    });

})

app.post("/api/notes", function (req, res) {
    console.log(req.body);
    let newNote = req.body;
    newNote.id = uniqid();

    res.json(req.body);


    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var notes = JSON.parse(data);

        notes.push(newNote)

        fs.writeFile("./db/db.json", JSON.stringify(notes), function (
            error,
            data
        ) {
            if (error) {
                return console.log(error);
            }

            console.log("works")
        });
    });


});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});