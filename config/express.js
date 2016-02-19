/*jslint node: true */
'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var timeout = require('connect-timeout');
var cors = require('cors');

/**
 * Express configuration
 */
module.exports = function(app) {
	var env = app.get('env');

	// Logging
	app.use(require('morgan')('dev'));

	app.use(bodyParser.json());
	app.use(timeout('5s'));

	// Compression
	app.use(require('compression')());

	app.use(cors());

  // Routing
  // app.use('/api', require('../api/routes'));
};
