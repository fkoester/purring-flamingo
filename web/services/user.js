/* global define */
define(['./module', 'angular'], function (services, ng) {
  'use strict';

  // From http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
  services.factory('restfulResource', function($resource, loginData) {
    return function(url, params, methods) {
      var defaults = {
        create: { method: 'post' },
        update: { method: 'put' }
      };

      var backendUrl = loginData.identity().backendUrl;

      methods = ng.extend(defaults, methods);

      var resource = $resource(backendUrl + url, params, methods);
      resource.prototype.$save = function(successCallback, errorCallback) {
        if (!this._id) {
          return this.$create(successCallback, errorCallback);
        } else {
          return this.$update(successCallback, errorCallback);
        }
      };
      return resource;
    };
  });

  /**
  * Provides a User REST API.
  */
  services.service('User', function(restfulResource, loginData) {
    return restfulResource('/users/:id', {
      id: '@_id'
    }, {
      setPassword: { method: 'PUT', url : loginData.identity().backendUrl + '/users/:id/setPassword', params: { password: '@password' }},
      updateProfilePhoto: { method: 'POST', url : loginData.identity().backendUrl + '/users/:id/updateProfilePhoto' }
    });
  });

});
