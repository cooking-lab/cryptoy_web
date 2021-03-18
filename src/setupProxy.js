<<<<<<< HEAD
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:3001/',
            changeOrigin: true
        })
    );
=======
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://localhost:3001/',
          changeOrigin: true
      }),
      createProxyMiddleware('/toys', {
        target: 'http://localhost:3001/',
        changeOrigin: true
    })
  )
>>>>>>> c669d32ce7d04121832b9d680540fb28513e3118
};