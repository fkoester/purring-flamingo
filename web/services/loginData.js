/* global define */
define(['./module', 'angular', 'pako'], function (services, ng, pako) {
  'use strict';

  services.factory('loginData', function($q, $http, $window) {
    var identity = getExistingIdentity($window);

    return {
      isAuthenticated: function() {
        return (typeof identity === 'object');
      },
      isInRole: function(role) {
        var authenticated = this.isAuthenticated();
        if (!authenticated || !identity.roles) return false;

        return identity.roles.indexOf(role) != -1;
      },
      identity: function() {

        return identity;
      },
      passwordLogin: function(backendUrl, mobile_phone_number, email, password) {
        var self = this;
        var loginData = {
          type: 'password',
          mobile_phone_number: mobile_phone_number,
          email: email,
          password: password
        };
        return self.login(backendUrl, loginData);
      },
      authenticate: function(backendUrl, token) {
        var profile = decodeJsonWebTokenPayload($window, token);
        $window.localStorage.token = token;
        $window.localStorage.backendUrl = backendUrl;

        identity = profile;
        identity.backendUrl = backendUrl;
      },
      login: function(backendUrl, loginData) {
        var self = this;
        var deferred = $q.defer();
        var loginRequest = {
          loginData: loginData
        };

        if (this.isAuthenticated()) {
          deferred.resolve(identity);

          return deferred.promise;
        }

        $http
        .post(backendUrl + '/auth/login', loginRequest)
        .success(function (data, status, headers, config) {
          console.log(data);
          self.authenticate(backendUrl, data.token);

          deferred.resolve(identity);
        })
        .error(function (data, status, headers, config) {

          // Erase the token if the user fails to log in
          removeLocalData($window);

          identity = undefined;
          deferred.reject(data);
        });

        return deferred.promise;
      },
      logout: function() {
        var deferred = $q.defer();

        if (!this.isAuthenticated()) {
          deferred.resolve();

          return deferred.promise;
        }

        $http
        .post(identity.backendUrl + '/logout')
        .success(function (data, status, headers, config) {

          identity = undefined;
          removeLocalData($window);
          deferred.resolve();
        })
        .error(function (data, status, headers, config) {

          identity = undefined;
          removeLocalData($window);
          deferred.resolve();
        });

        return deferred.promise;
      }
    };
  });

  function removeLocalData($window) {
    delete $window.localStorage.token;
  }

  function getExistingIdentity($window) {
    var identity;
    if($window.localStorage.token) {
      try {
        identity = decodeJsonWebTokenPayload($window, $window.localStorage.token);
      } catch(e) {
        delete $window.localStorage.token;
        return;
      }
      if($window.localStorage.backendUrl) {
        identity.backendUrl = $window.localStorage.backendUrl;
      }
    }

    return identity;
  }

  function decodeJsonWebTokenPayload($window, jwtString) {
    var payloadBase64 = jwtString.split('.')[1];
    var payloadString = $window.atob(payloadBase64);
    var payload = JSON.parse(payloadString);

    var compressedProfile = $window.atob(payload.profile);

    var profileString = pako.inflate(compressedProfile, { to: 'string' });
    var profile = JSON.parse(profileString);
    profile.iat = payload.iat;
    profile.exp = payload.exp;
    return profile;
  }
});
