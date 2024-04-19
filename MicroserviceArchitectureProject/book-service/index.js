const express = require('express');
const bodyParser = require('body-parser');

// Express uygulamasını oluştur
const app = express();
const port = 3002;

// JSON verileri için body-parser'ı etkinleştir
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Örnek kitap veritabanı
let books = [];

// Tüm kitapları listeleme
app.get('/books', (req, res) => {
    try {
        console.log('Kitaplar listeleniyor');
        res.json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Yeni kitap ekleme
app.post('/books', (req, res) => {
    try {
        console.log('Kitap ekleme isteği alındı');
        const { title, author } = req.body;
        const newBook = { id: books.length + 1, title, author };
        books.push(newBook);
        res.status(201).json(newBook);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Kitap Servisi http://127.0.0.1:${port} adresinde çalışıyor`);
});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 
