
const express = require('express');
// dependencies
const path = require('path');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const ejs = require('ejs');

// read the database
const db = require(path.join(__dirname, 'db/db.json'));
// data parsing setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// serving static pages and render engine setup
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')


//GET routes
app.get('/', function(req, res)
{
    res.render('index');
})

app.get('/notes', function(req, res)
{
    res.render('notes')
})

app.get('/api/notes', function(req, res)
{
    res.json(db);
})

app.post('/api/notes', function(req, res)
{
    let newNote = req.body;
    db.push(newNote);
    console.log(newNote)
    res.json(newNote);

})

app.delete('/api/notes', function(req,res)
{
    let deleteNote = req.body;
    newDb = db.filter(notes => note.title!== deleteNote.title);
    console.log(newDb);

})

app.listen(PORT, () => 
{
    console.log(`Server listening on PORT ${PORT}`);

})

