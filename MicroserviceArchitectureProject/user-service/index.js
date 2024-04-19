const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001;

const dotenv = require('dotenv');
dotenv.config();

let users = [];

// Tüm kullanıcıları listeleme
app.get('/users', (req, res) => {
    try {
        console.log('Kullanıcılar listeleniyor');
        res.json(users);
    } catch (error) {
        console.log(error);
    }
});

app.post('/users', (req, res) => {
    try{
        console.log('Kullanıcı ekleme isteği alındı');
        const { username, email } = req.body;
        const newUser = { id: users.length + 1, username, email };
        users.push(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
    }

});

app.listen(port, () => {
    console.log(`Kullanıcı Servisi http://127.0.0.1:${port} adresinde çalışıyor`);
});

process.on('uncaughtException', function (err) {
    console.log(err);
});
