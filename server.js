const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).send();
})

app.put('/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(200).send();
})

app.delete('/:id', (req, res) => {
    console.log(req.params.id);
    res.status(204).send();
})