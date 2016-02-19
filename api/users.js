/*jslint node: true */

const express = require('express');
const users = express.Router();
const db = require('../config/db');

users.get('/', function(req, res, next) {

  res.status(200);
  res.send(db.getUsers());
});

users.post('/', function(req, res, next) {
  res.status(200);
});

module.exports = users;
