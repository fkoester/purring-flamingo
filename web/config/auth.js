/* global define */
define(['app'], function (app) {
  'use strict';

  app.factory('authInterceptor', function ($window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};

        // Add authentication token to http headers
        if ($window.localStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
        }
        return config;
      }
    };
  });

  app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
});
