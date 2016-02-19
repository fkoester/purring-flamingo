/*jslint node: true */

const low = require('lowdb');
const storage = require('lowdb/file-async');
const fs = require('fs.extra');
const path = require('path');
const dbFile = path.join(process.env.DB_DIR, 'db.json');
var db;

try {
  fs.mkdirpSync(process.env.DB_DIR);
  db = low(dbFile, { storage });
} catch(e) {
  throw e;
}

module.exports = {
  addUser: function(user) {
    return db('users').push(user);
  },
  getUsers: function() {
    return db('users');
  },
  findUserByUsername: function(username) {
    return db('users').find({username});
  }
};
