const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const DABook = require('./DABook');

// Get all books
app.get('/books', async (req, res) => {
    try {
        console.log('List books request received');
        const books = await DABook.getBooks();
        res.json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a new book
app.post('/books',async (req, res) => {
    try {
        console.log('Add book request received');
        const { title, author } = req.body;
        const newBook = { id: books.length + 1, title, author };
        await DABook.addBook(title, author);
        res.status(201).json(newBook);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Listen
app.listen(port, () => {
    console.log(`Book service listening at http://localhost:${port}`);
});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 
