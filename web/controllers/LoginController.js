/* global define */
define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('LoginController', function ($scope, $http, $location, $window, loginData, Notification) {
    $scope.user = { username: '', password: ''};
    $scope.message = '';

    $scope.submit = function () {

      loginData.passwordLogin($scope.user.username, $scope.user.password).then(function() {

        if(loginData.isAuthenticated()) {
          $location.path("/");
        } else {
          Notification.error({message:  'Anmeldung fehlgeschlagen'});
        }
      }, function(error) {
        Notification.error({message:  'Anmeldung fehlgeschlagen'});
      });
    };
  });
});
