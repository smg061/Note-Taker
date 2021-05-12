
const express = require('express');
// dependencies
const path = require('path');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const ejs = require('ejs');
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
    fs.readFile(path.join(__dirname, 'db/db.json'),(err,data)=>
    {
        if (err) throw err;
        res.json(data);
    })
})


app.listen(PORT, () => 
{
    console.log(`Server listening on PORT ${PORT}`);

})

