/* global define */
define(['./module', 'angular', 'pako'], function (services, ng, pako) {
  'use strict';

  services.factory('loginData', function($q, $http, $window, base64) {

    function decodeJsonWebTokenPayload(jwtString) {
      var payloadBase64 = jwtString.split('.')[1];

      // We need to add the base64 padding here, otherwise the base64 lib fails
      if(payloadBase64.length % 4 === 2) {
        payloadBase64 += '==';
      } else if(payloadBase64.length % 4 === 3) {
        payloadBase64 += '=';
      } else if(payloadBase64.length % 4 === 1) {
        throw new Error('Base64 input is malformed');
      }

      var payloadString = base64.decode(payloadBase64);
      var payload = JSON.parse(payloadString);

      //var compressedProfile = $window.atob(payload.profile);

      //var profileString = pako.inflate(compressedProfile, { to: 'string' });
      //var profile = JSON.parse(profileString);
      //profile.iat = payload.iat;
      //profile.exp = payload.exp;
      //return profile;
      return payload;
    }

    function removeLocalData() {
      delete $window.localStorage.token;
    }

    function getExistingIdentity() {
      var identity;
      if($window.localStorage.token) {
        try {
          identity = decodeJsonWebTokenPayload($window.localStorage.token);
        } catch(e) {
          delete $window.localStorage.token;
          return;
        }
      }

      return identity;
    }

    var identity = getExistingIdentity();

    return {
      isAuthenticated: function() {
        return (typeof identity === 'object');
      },
      isInRole: function(role) {
        var authenticated = this.isAuthenticated();
        if (!authenticated || !identity.global_roles) return false;

        return identity.global_roles.indexOf(role) != -1;
      },
      isAdmin: function() {
        return this.isInRole('admin');
      },
      identity: function() {

        return identity;
      },
      passwordLogin: function(username, password) {
        var self = this;
        var loginData = {
          type: 'password',
          username: username,
          password: password
        };
        return self.login(loginData);
      },
      authenticate: function(token) {
        var profile = decodeJsonWebTokenPayload(token);
        $window.localStorage.token = token;

        identity = profile;
      },
      login: function(loginData) {
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
        .post('/api/auth/login', loginRequest)
        .success(function (data, status, headers, config) {
          self.authenticate(data.token);

          deferred.resolve(identity);
        })
        .error(function (data, status, headers, config) {

          // Erase the token if the user fails to log in
          removeLocalData();

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
        .post('/logout')
        .success(function (data, status, headers, config) {

          identity = undefined;
          removeLocalData();
          deferred.resolve();
        })
        .error(function (data, status, headers, config) {

          identity = undefined;
          removeLocalData();
          deferred.resolve();
        });

        return deferred.promise;
      }
    };
  });
});
