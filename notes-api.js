const express = require('express');
const app = express();
//=> A server object has been created, but it is not running yet

app.use(express.json()); // app.use adds a middleware, express.json specifically tells express 'when data comes in, treat it as JSON' 

let notes = [
    {id: 1, text: 'First note' },
    {id: 2, text: 'Second note'}
]; //Our "database" for now - just an array. id is a unique identifier, text is a note content...data will be lost when server restarts

app.get('/notes', (req, res) => {
    res.json(notes);//sends the entire notes array as JSON
});//app.get creates a GET route(GET is for reading/retrieving data)


//POST new note
app.post('/notes', (req, res) => {
    const newNote = {
        id: notes.length + 1,//generates an ID, how many notes we have,give room to add a new note
        text: req.body.text // get the text from the request 
    };
    notes.push(newNote);
    res.json(newNote);//sends back the created note
});

//GET single note by ID

app.get('/notes/:id' , (req, res) => {
    
    const id = parseInt(req.params.id);//req.params.id gets the :id from the URL(comes as text/string), parseInt() converts text to a number
    const note = notes.find(n => n.id === id);//searches through the array to find the note with matching ID

    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ message: 'Note not found'});
    }//If we found the note, send it back else, send an error

});


//DELETE note by ID
app.delete('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = notes.findIndex(n => n.id ===id);//finds the position of the note in the array , before we delete something from an array, we need to know it's index position 

    if (index !== -1) { //JS way of saying i couldn't find it is -1
        notes.splice(index, 1);
        res.json({ message: 'Note deleted'});
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


