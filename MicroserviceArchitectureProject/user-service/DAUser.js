const { Pool } = require('pg');

//dotenv
const dotenv = require('dotenv');
dotenv.config();

//Connection Pool
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

const getUsers = async () => {
    try {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        console.log(error);
    }
};

const addUser = async (username, email) => {
    try {
        const result = await pool.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getUsers, addUser };