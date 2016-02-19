/*jslint node: true */
'use strict';

const express = require('express');
const storageapi = require('angular-filemanager-nodejs-bridge');
const users = require('./users');
const routes = express.Router();

routes.use('/files', storageapi);

routes.use('/users', users);

module.exports = routes;
