const express = require('express');
const path = require('path');
const errorMiddleware = require('./middlewares/error');

const app = express();


app.use(express.json());


// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running!');
    });
}

// error middleware
app.use(errorMiddleware);

module.exports = app;