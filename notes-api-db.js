const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/Note');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();

app.use(express.json());
//Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/your_db')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const SECRET_KEY = 'mySecretKey123';

const verifyToken = (req, res, next) =>{
    const token = req.headers['authorization'];
    if (!token){
        return res.status(403).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

//Register route
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'User registered succesfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login route
app.post('/login', async (req,res) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            username: user.username
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/notes', verifyToken, async (req, res) => {
    try {
        const note = new Note({
            text: req.body.text,
            userId: req.userId
        });
        const newNote = await note.save();
        res.json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//GET all notes
app.get('/notes', verifyToken, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId });
        res.json(notes);
    } catch (error) {
        res.status(500).json({message: error.message });
    }
});

//GET single note by ID
app.get('/notes/:id', verifyToken, async (req, res) =>{
    try{
        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.userId
        });
        if (!note){
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch(error){
        res.status(500).json({ message: error.message});
    }
});

//DELETE note by ID
app.delete('/notes/:id', verifyToken, async (req, res) =>{
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });
        if(!note){
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted'});
    } catch (error){
        res.status(500).json({ messgae: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
