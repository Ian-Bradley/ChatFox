var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

// "node-sass": "^4.5.0",
// "sockjs-client": "^1.1.2",

new WebpackDevServer( webpack(config) )
  .listen( 3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });
