
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
    let newNote = req.body;
    let latestId = db.length > 0? db[db.length-1].id + 1 : 0; // get the id of the last element and add 1 to get latest id; if database is empty, give an id of 0
    newNote.id = latestId;
    db.push(newNote);
    updateDatabase(db);
    res.json(newNote);
})

app.delete('/api/notes/:id', function(req,res)
{
    let noteId = req.params.id;
    console.log(noteId);
    // newDB = db.filter(note => note.id != noteId)
    removeNoteById(noteId);
    updateDatabase(db);
})

app.listen(PORT, () => 
{
    console.log(`Server listening on PORT ${PORT}`);

})


async function updateDatabase(db) {
    await fs.promises.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(db), err => 
    {
        if (err) throw err;
        else console.log("Note added succesfully");
    });
}

function removeNoteById(noteId)
{
    for (let i = 0; i < db.length; i++) 
    {
        if(db[i].id == noteId)
        {
            db.splice(i, 1);
        }
    }
}