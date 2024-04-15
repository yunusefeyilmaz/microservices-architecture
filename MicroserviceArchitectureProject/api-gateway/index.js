const express = require('express');
const yaml = require('js-yaml');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy'); // Add missing import statement
const fs = require('fs');

// HTTP proxy oluştur
const proxy = httpProxy.createProxyServer();

// Swagger UI'yi Express'e entegre etmek için swagger-ui-express modülünü yükle
const swaggerUi = require('swagger-ui-express');

// Swagger belge JSON dosyasını yükle
const swaggerDocument = require('./swagger.json');

// Yapılandırma dosyasını yükle
const config = yaml.load(fs.readFileSync('./gateway.config.yml', 'utf8'));

// Express uygulamasını oluştur
const app = express();

// JSON verileri için body-parser'ı etkinleştir
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API uç noktalarını yapılandır
Object.keys(config.http.apiEndpoints).forEach(endpoint => {
  const { paths, serviceEndpoint } = config.http.apiEndpoints[endpoint];
  const { url } = config.http.serviceEndpoints[serviceEndpoint];
  console.log(`API uç noktası: ${endpoint}, Yönlendirme: ${url} , Yollar: ${paths}`);
  app.all(paths, (req, res) => {
    proxy.web(req, res, { target: url });
  });
});

// Swagger UI'yi sunacak bir rota tanımla
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Gateway'yi belirtilen portta başlat
const port = 8080;
app.listen(port, () => {
  console.log(`API Gateway listening at http://127.0.0.1:${port}`);
});

// Hata logları
app.use((err, req, res) => {
  console.error(err.stack);
  res.call('Internal server error', 500);
});

// Hata durumunda loglama
proxy.on('error', (error, req, res) => {
  console.error('Hata:', error.message);
  res.status(500).json({ error: 'Internal Server Error' });
});