/*jslint node: true */
var express = require('express');
var bcrypt = require('bcrypt-as-promised');
var auth = express.Router();
var db = require('../config/db');
var errors = require('../errors');
var authConfig = require('../config/auth');

auth.post('/login', function (req, res, next) {
  return login(req, res);
});

function login(req, res) {

  var promise;
  var username;
  var password;
  var user;

  if (!req.body) {
    return Promise.reject(new Error('Missing request body.'));
  }

  if (!req.body.loginData) {
    return Promise.reject(new Error('Missing login data.'));
  }

  username = req.body.loginData.username;
  password = req.body.loginData.password;

  if(!username) {
    return Promise.reject(new Error('No username given!'));
  }

  user = db.findUserByUsername(username);

  if (!user) {
    throw new errors.ResourceNotFoundError('User', username);
  }

  if(!user.password_hash) {
    throw new errors.UserHasNoPasswordError();
  }

  promise = bcrypt.compare(password, user.password_hash);

  promise = promise.tap(function() {
    console.log('User successfully verified');
  });

  promise = promise.then(function() {
    // We are sending the profile inside the token
    var profile = {
      username: user.username,
      global_roles: user.global_roles,
    };

    return authConfig.encodeAndSignProfile(profile);
  });

  promise = promise.then(function(token) {
    return res.status(200).json({ token });
  });

  promise = promise.catch(errors.ResourceNotFoundError, function(e) {

    console.log(e.message);
    if(req.body.loginData.type === 'digits') {
      res.status(404);
      res.send('User does not exist');
    } else {
      res.status(401);
      res.send('Invalid login');
    }
  });

  promise = promise.catch(errors.UserHasNoPasswordError, function(e) {

    console.log(e.message);
    res.status(401);
    res.send('User has no password');
  });

  promise = promise.catch(errors.InvalidLoginError, function(e) {

    console.warn('Invalid login');

    res.status(401);
    res.send('Invalid login');
  });

  promise = promise.catch(function(error) {

    console.error(typeof(error));
    console.error(error);
    res.status(500);
    res.send('Login failed: ' + error.message);
  });

  return promise;
}

module.exports = auth;
