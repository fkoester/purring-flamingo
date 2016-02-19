/*jslint node: true */
'use strict';

var express = require('express');
var path = require('path');
var qs = require('querystring');
var api = require('../api');

/**
 * Express configuration
 */
module.exports = function(app) {
	var env = app.get('env');

	app.use('/api', api);

	// Static resources
	//app.use(express.favicon(path.join(__dirname, '../web', 'favicon.ico')));
	app.use(express.static(path.join(__dirname, '../web')));
	app.use(express.static(path.join(__dirname, '../bower_components')));

	app.get('/*', function(req, res, next) {
		if (!req.path.match(/(\.js|\.html)$/)) {
			res.sendFile('index.html', { root: path.join(__dirname, '../web') });
		} else {
			next();
		}
	});

	// Error handler
	if (env === 'development') {
		app.use(require('errorhandler')());
	}
};
