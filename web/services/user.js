/* global define */
define(['./module', 'angular'], function (services, ng) {
  'use strict';

  // From http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
  services.factory('restfulResource', function($resource) {
    return function(url, params, methods) {
      var defaults = {
        create: { method: 'post' },
        update: { method: 'put' }
      };

      methods = ng.extend(defaults, methods);

      var resource = $resource(url, params, methods);
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
  services.service('User', function(restfulResource) {
    return restfulResource('/api/users/:id', {
      id: '@_id'
    }, {
      setPassword: { method: 'PUT', url : '/api/users/:id/setPassword', params: { password: '@password' }}
    });
  });

});
