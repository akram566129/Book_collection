const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let books = [];

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const book = {
        id: Math.floor(Math.random() * 1000),
        title: req.body.title,
        author: req.body.author,
        publishedDate: req.body.publishedDate || null
    };

    books.push(book);
    res.json(book);
    
});

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'Book not found.' });
    } else {
        books.splice(index, 1);
        res.json({ message: 'Book deleted.' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
