const mongoose =require('mongoose');

const noteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
   }, {
          timestamps: true
    });

    const Note = mongoose.model('Note', noteSchema);

    module.exports = Note;


    //alice = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWFjOWY3OWM4OTBmODJlZjc0MTdmYTQiLCJ1c2VybmFtZSI6ImFsaWNlMiIsImlhdCI6MTc3MjkyMDcxOCwiZXhwIjoxNzcyOTI0MzE4fQ.Yycr8N0HXVwOzg4jHdMCndeZVhgCfFDu2qUV7e6d0us