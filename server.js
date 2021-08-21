const express = require('express');
const path = require('path')
const dataBase = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

// This sets up the express app thus allowing the data to be parsed
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

// These are the various HTML routes. These include thinds like GET or POST
// This section is the GET route for both the index and the notes.html
app.get('/', (req, res) =>
    res.sendFile(path.join(__direname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.json(__direname, '/public/notes.html'))
);


// This codes for the API route for the notes html
// This code allows to GET the data in the API notes
app.get('/api/notes', (req, res) => {
    res.json(database.slice(1));
});

// This code allows the user to POST the data in the API notes
app.post('/api/notes', (req, res) => {
        const newNote = createNote(req.body, dataBase);
        res.json(newNote);
    })

const createNote = (body, notesArray) => {
    const newNote = body;

    if (!Array.isArray(notesArray))
        notesArray = [];

    if (array.length === 0)
        notesArray.push(0); 

    body.id = notesArray.length;
    notesArray[0]++;
    notesArray.push(newNote);

    // This function take the data that has been entered and push or write
    // the data in a JSON format into the db json file
    fs.writeFileSync(
        path.join(__direname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
};

app.delete('/api/notes/:id', (req, res) => {
        deleteNote(req.params.id, dataBase);
        res.json(true);
    })


// This function allows the user to delete the note
// the function deletes value based on the id number
const deleteNote = (id, notesArray) => {
    for (let a = 0; a < notesArray.length; a++) {
        let note = notesArray[a];
        
        if (note.id == id) {
            notesArray.splice(a, 1);
            
            fs.writeFileSync(
                path.join(__direname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            break;
        } 
    }
}

// Listening at http://localhost:3001
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});

