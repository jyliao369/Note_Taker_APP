const express = require('express');
const router = require('express').Router();
const { readAndAppend, writeToFile, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');

// This is the GET route for the submitted notes
router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// This is the POST route for submitting notes
router.post('/', (req, res) => {
    // Destructuing the json
    const { title, test, } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);
    } else {
        res.json('Error in posting feedback');
    }
});

// This function allows the user to delete any notes created based on id
router.delete('/:id', (re, res) => {
    const {id} = req.params
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    const noteIndex = notes.findIndex((note) => note.note_id === id);
    notes.splice(noteIndex, 1);
    writeToFile("./db/db.json", notes);

    return res.send();
});

module.exports = router;