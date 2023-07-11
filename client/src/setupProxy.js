const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/login', { target: 'http://localhost:4000', changeOrigin: true }),
    createProxyMiddleware('/register', { target: 'http://localhost:4000', changeOrigin: true }),
    createProxyMiddleware('/getEvents', { target: 'http://localhost:4000', changeOrigin: true }),
    createProxyMiddleware('/makeEvent', { target: 'http://localhost:4000', changeOrigin: true }),
    createProxyMiddleware('/getMessages', { target: 'http://localhost:4000', changeOrigin: true }),
    createProxyMiddleware('/sendMessage', { target: 'http://localhost:4000', changeOrigin: true }),


  );
};
