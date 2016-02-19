/*jslint node: true */
'use strict';

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var zlib = require('zlib');

/**
*
* The following secret is only used for non production mode.
*
* In production mode we use asymetric cryptography (RSASSA using SHA-256 hash algorithm)
* with a public/private key pair which must be defined using the environment variables JWT_PUBLIC_KEY_FILE and JWT_PRIVATE_KEY_FILE.
*
*/
var secret = "no real secret";

var no_authentication_required_for_paths = ['/', '/version', /^\/auth\/.*/i];

var privateKey, publicKey;

if(process.env.NODE_ENV !== 'production') {
  console.warn('Not running in production mode. Cryptography is not safe.');
} else {
  if(process.env.KEYS_BASE64_ENCODED) {
    console.log('KEYS_BASE64_ENCODED is enabled. Decoding base64 encoded keys.');
    privateKey = new Buffer(process.env.JWT_PRIVATE_KEY, 'base64');
    publicKey = new Buffer(process.env.JWT_PUBLIC_KEY, 'base64');
  } else {
    privateKey = process.env.JWT_PRIVATE_KEY;
    publicKey = process.env.JWT_PUBLIC_KEY;
  }
}

module.exports.init = function(app) {
  if(publicKey) {
    app.use('/api', expressJwt({ secret: publicKey }).unless({path: no_authentication_required_for_paths }));
  } else {
    app.use('/api', expressJwt({ secret: process.env.JWT_SECRET || secret}).unless({path: no_authentication_required_for_paths }));
  }
};

function sign(payload) {
  if(process.env.NODE_ENV !== 'production') {
    return jwt.sign(payload, process.env.JWT_SECRET || secret, {});
  } else {
    return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
  }
}

module.exports.encodeAndSignProfile = function(profile) {
  var payload = {
    profile: zlib.deflateSync(JSON.stringify(profile)).toString('base64')
  };

  return sign(payload);
};

module.exports.decodeProfile = function(profile) {

  return JSON.parse(zlib.inflateSync(new Buffer(profile, 'base64')));
};
