/*jslint node: true */
'use strict';

// Setup default environment variables
process.env.PORT = process.env.PORT || 5000;

process.env.DATA_DIR = process.env.DATA_DIR || '/data';

process.env.DB_DIR = process.env.DB_DIR || '/var/lib/purring-flamingo/';

// Load and initialize express and socket.io
var app = require('express')();
var server = require('http').createServer(app);

// Express settings
require('./config/express')(app);

require('./config/auth').init(app);

// Routing
require('./config/routes')(app);

// Start server
server.listen(process.env.PORT, function() {
  console.info('Server started purring. Access it on port %d', process.env.PORT);
});

module.exports.app = app;
module.exports.server = server;
