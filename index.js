const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// GET method route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// POST method route
app.post('/data', (req, res) => {
    const data = req.body;
    res.send(`Data received: ${JSON.stringify(data)}`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
