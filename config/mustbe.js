/*jslint node: true */
const mustBe = require("mustbe");

function isAdmin(user) {
  if(!user) {
    return false;
  }

  if(!Array.isArray(user.global_roles)) {
    return false;
  }

  return user.global_roles.indexOf('admin') >= 0;
}

module.exports = function(config){

  config.routeHelpers(function(rh){
    // get the current user from the request object
    rh.getUser(function(req, cb){
      // return cb(err); if there is an error
      cb(null, req.user);
    });

    // what do we do when the user is not authorized?
    rh.notAuthorized(function(req, res, next){
      res.status(401);
      res.send("You are not authorized");
    });
  });

  config.activities(function(activities){

    // provide a global "allow" override for admin users.
    activities.allow(function(identity, activity, cb){
      var user = identity.user;
      var allow = false;
      if (isAdmin(user)){
        allow = true;
      }
      cb(null, allow);
    });

    // configure an activity with an authorization check
    activities.can("access all users", function(identity, params, cb){

      // Nobody can do that (except admin users)
      cb(null, false);
    });
  });
};
