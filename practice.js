const express = require('express');
const app = express();

app.use(express.json());


let notes = [
    {id:1, text:'first note'},
    {id:2, text: 'second note'}
];

app.get('/notes', (req, res)=>{
    res.json(notes)
})
//adding a new note
app.post('/notes', (req, res) => {
    const newNote = [
        id = notes.length + 1,
        text = req.body.text
    ]
   notes.push ()
   res.json()
})



app.get('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    notes.find(n =>n.id ===id)

    if(note){
        res.json(note)
    }
    else{
        res.status(404).json({message: "note not found" })
    }
})





