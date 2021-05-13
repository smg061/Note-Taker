
// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
// server setup
const app = express();
const PORT = process.env.PORT || 3000;
// read the database
let db = require(path.join(__dirname, 'db/db.json'));
// data parsing setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// serving static pages 
app.use(express.static(path.join(__dirname, 'public')))

//GET routes
app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/notes', function(req, res)
{
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.get('/api/notes', function(req, res)
{
    res.json(db);
})

app.post('/api/notes', function(req, res)
{
    addNewNote(req);
    updateDatabase(db);
    res.json(newNote);
})

app.delete('/api/notes/:id', function(req,res)
{
    let noteId = req.params.id;
    console.log(noteId);
    newDB = db.filter(note => note.id != noteId)
    updateDatabase(newDB);
})

app.listen(PORT, () => 
{
    console.log(`Server listening on PORT ${PORT}`);

})


function updateDatabase(db) {

    fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(db), err => 
    {
        if (err) throw err;
        else console.log("Note added succesfully");
    });

}

async function addNewNote(req)
{
    let newNote = req.body;
    let latestId = db[db.length-1].id+1; // get the id of the last element and add 1;
    newNote.id = latestId;
    db.push(newNote);

}
