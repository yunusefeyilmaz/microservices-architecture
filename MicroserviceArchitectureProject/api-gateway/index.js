const express = require('express');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy'); // Add missing import statement
const fs = require('fs');
const YAML = require('yaml')

// Create a new instance of httpProxy
const proxy = httpProxy.createProxyServer();

// Swagger UI
const swaggerUi = require('swagger-ui-express');

// Load the swagger document
const swaggerDocument = YAML.parse(fs.readFileSync('./swagger.yaml', 'utf8'))

// Load the configuration file
const config = YAML.parse(fs.readFileSync('./gateway.config.yml', 'utf8'));

// Create a new express application
const app = express();

// Configure the express application
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

// Configure the API Gateway
Object.keys(config.http.apiEndpoints).forEach(endpoint => {
  const { paths, serviceEndpoint } = config.http.apiEndpoints[endpoint];
  const { url } = config.http.serviceEndpoints[serviceEndpoint];
  console.log(`API uç noktası: ${endpoint}, Yönlendirme: ${url} , Yollar: ${paths}`);
  app.all(paths, (req, res) => {
    console.log(`Yönlendirme: ${req.method} ${req.url} isteği ${url}${req.url}`);
    proxy.web(req, res, {
      target: url,
      changeOrigin: true,
      secure: false,
      timeout: 5000,
      proxyTimeout: 5000
    });
    
  });
  
});

// Swagger UI path
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the API Gateway
const port = 8080;
app.listen(port, () => {
  console.log(`API Gateway listening at http://127.0.0.1:${port}`);
});

// Error handling
app.use((err, req, res) => {
  console.error(err.stack);
  res.call('Internal server error', 500);
});

// Proxy error handling
proxy.on('error', (error, req, res) => {
  console.error('Hata:', error.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Proxy request handling
proxy.on('proxyReq', (proxyReq, req) => {
  if (req.body) {
      const bodyData = JSON.stringify(req.body);
      // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
      proxyReq.setHeader('Content-Type','application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      // stream the content
      proxyReq.write(bodyData);
  }
});