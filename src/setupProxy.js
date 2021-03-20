const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://localhost:3001/',
          changeOrigin: true
      }),
      createProxyMiddleware('/player', {
          target: 'http://localhost:3001/',
          changeOrigin: true
      }),
      createProxyMiddleware('/toys', {
          target: 'http://localhost:3001/',
          changeOrigin: true
      })
  )
};