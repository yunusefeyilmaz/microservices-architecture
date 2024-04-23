const mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

const getBooks = () => {
    return new Promise((resolve, reject ) => {
        pool.query('SELECT * FROM books', (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
}

const addBook = (title, author) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve({ title, author });
        });
    });
}

module.exports = { getBooks, addBook };
