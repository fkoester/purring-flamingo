/*jslint node: true */

const express = require('express');
const users = express.Router();
const crypto = require('crypto');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const mustbe = require("mustbe").routeHelpers();

Promise.promisifyAll(crypto);
Promise.promisifyAll(bcrypt);

users.get('/', mustbe.authorized("access all users"), function(req, res, next) {

  res.status(200);
  res.send(db.getUsers());
});

users.post('/', function(req, res, next) {

  var promise = crypto.randomBytesAsync(48);
  var user = req.body;

  promise = promise.then(function(buffer) {
    var generatedPassword = buffer.toString('hex');

    return bcrypt.genSaltAsync(10).then(function(salt) {
      return [generatedPassword, bcrypt.hashAsync(generatedPassword, salt)];
    });
  });

  promise = promise.spread(function(generatedPassword, passwordHash) {

    user.password_hash = passwordHash;

    return [generatedPassword, db.addUser(user)];
  });

  promise = promise.spread(function(generatedPassword, addedUsers) {

      var addedUser = addedUsers[0];
      addedUser.password = generatedPassword;
      res.status(200);
      res.send(addedUser);
  });
});

module.exports = users;
