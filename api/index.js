/*jslint node: true */
'use strict';

const express = require('express');
const storageapi = require('angular-filemanager-nodejs-bridge');
const users = require('./users');
const auth = require('./auth');
const routes = express.Router();

routes.use('/files', storageapi);

routes.use('/users', users);

routes.use('/auth', auth);

module.exports = routes;
