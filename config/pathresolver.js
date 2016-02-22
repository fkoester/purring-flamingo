/*jslint node: true */
const pathresolver = require('angular-filemanager-nodejs-bridge').pathresolver;
const path = require('path');

pathresolver.baseDir = function(req) {

  if(!req.user || !req.user.username || !Array.isArray(req.user.global_roles)) {
    throw new Error("No valid user!");
  }

  // Admin users can see all the directories
  if(req.user.global_roles.indexOf('admin') >= 0) {
    return process.env.DATA_DIR;
  }

  // Other users can only see their own directory
  return path.join(process.env.DATA_DIR, req.user.username);
};
