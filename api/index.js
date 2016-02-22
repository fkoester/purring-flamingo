/*jslint node: true */

const express = require('express');
const filesRouter = require('angular-filemanager-nodejs-bridge').router;
const users = require('./users');
const auth = require('./auth');
const routes = express.Router();

routes.use('/files', filesRouter);

routes.use('/users', users);

routes.use('/auth', auth);

module.exports = routes;
