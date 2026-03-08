const express = require('express');
const app = express();//here we are creating an application

app.get('/', (req, res) => {
    res.send('Hello World');
}); //app.get() means 'when someone visits this route with a GET request', / means the homepage

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}) // app.listen() listens FOR browsers/clients that want to connect to your server on port 3000