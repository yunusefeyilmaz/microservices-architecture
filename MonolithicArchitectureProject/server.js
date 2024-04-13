// server.js

const dotnev = require('dotenv');
const express = require('express');
const { Pool } = require('pg');
const http = require('http');
const httpProxy = require('http-proxy');
dotnev.config();
const app = express();
const port = 3000;

// PostgreSQL veritabanı yapılandırması
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

// Middleware kullanarak JSON isteklerini işleyin
app.use(express.json());

// GET isteği için örnek bir endpoint
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Hata:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST isteği için örnek bir endpoint
app.post('/users', async (req, res) => {
  const { username, email } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Hata:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get isteği için örnek bir endpoint
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Hata:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get isteği için örnek bir endpoint
app.get('/books', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM books');
      res.json(result.rows);
    } catch (error) {
      console.error('Hata:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Post isteği için örnek bir endpoint
app.post('/books', async (req, res) => {
    const { title, author } = req.body;
    try {
      const result = await pool.query('INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *', [title, author]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Hata:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get isteği için örnek bir endpoint
app.get('/authors', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM authors');
      res.json(result.rows);
    } catch (error) {
      console.error('Hata:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Post isteği için örnek bir endpoint
app.post('/authors', async (req, res) => {
    const { name, country } = req.body;
    try {
      const result = await pool.query('INSERT INTO authors (name, country) VALUES ($1, $2) RETURNING *', [name, country]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Hata:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Sunucuyu dinlemeye başla
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
app.listen(port+1, () => {
    console.log(`Sunucu ${port+1} portunda çalışıyor...`);
});

// Load balancer
const proxy = httpProxy.createProxyServer();

// Hedef sunucuları tanımlayın
const servers = [
  { host: 'localhost', port: 3000 },
  { host: 'localhost', port: 3001 },
  // İstediğiniz kadar sunucu ekleyebilirsiniz
];

// Load balancer'ı başlat
const loadBalancer = http.createServer((req, res) => {
  // Rastgele bir hedef seçin
  const target = servers[Math.floor(Math.random() * servers.length)];
  // İstek yönlendirme
  console.log(`İstek yönlendirildi: ${target.host}:${target.port}`);
  // Seçilen hedefe yönlendirin
  proxy.web(req, res, {
    target: `http://${target.host}:${target.port}`
  });
});

// Load balancer'ı dinlemeye başla
loadBalancer.listen(8080, () => {
  console.log('Load balancer http://localhost:8080 portunda çalışıyor...');
});

// Hata durumunda loglama
proxy.on('error', (error, req, res) => {
  console.error('Hata:', error.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

