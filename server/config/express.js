// Get dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');
const compress = require('compression');
const methodOverride = require('method-override');

module.exports = function () {
  // Create a new Express application instance
  const app = express();

  // Use the 'NODE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  var environment = process.env.NODE_ENV

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  } 

  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }));

  app.use(cors());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(methodOverride());
  
  // Point static path to dist
  app.use(express.static(path.join(__dirname, '../../dist')));

  // routes
  // app.use('/' + Constantes.ApiVersion.API_VERSION + '/cats', require('../controllers/cat.server.controller'));
 
  // Catch all other routes and return the index file
  app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });

  return app;
}