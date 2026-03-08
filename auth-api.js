const express = require('express');

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('./models/User');

const app = express();
app.use(express.json());
const SECRET_KEY = 'mySecretKey123';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    // if (!authHeader) {
   //   return res.status(403).json({ message: 'No token provided' });
   // }

    // Remove "Bearer "
    //const token = authHeader.split(" ")[1];


    if (!token){
        return res.status(403).json({ message: 'No token provided'});
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

mongoose.connect('mongodb://localhost:27017/notesdb')
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('MongoDB connection error:', err));

 app.post('/register', async (req, res) => {
    try{
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

        res.status(201).json({ message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 });

 app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email});
        if(!user) {
            return res.status(400).json({ message: 'Invalid crendentials'});
        }

        const token = jwt.sign(
        { userId: user._id, username: user.username },
    SECRET_KEY,
    { expiresIn: '1h'}
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


app.get('/profile', verifyToken, (req, res) => {
    res.json({
        message: 'This is protected data',
        userId: req.userId
    });
});

app.listen(4000, () => {
    console.log('Auth server running on port 4000');
});