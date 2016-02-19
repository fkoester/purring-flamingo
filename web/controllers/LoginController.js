/* global define */
define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('LoginController', function ($scope, $http, $location, $window, loginData, config, Notification) {
    $scope.user = { username: '', password: ''};
    $scope.message = '';

    if (!config.BASE_URL) {
      $scope.availableBackends = [{
        name: 'localhost:5000',
        url: "http://localhost:5000/api"
      }];

      $scope.selectedBackend = $scope.availableBackends[0];
    }

    $scope.submit = function () {
      var email;
      var mobile_phone_number;

      if($scope.user.username.indexOf('@') >= 0) {
        email = $scope.user.username;
      } else {
        mobile_phone_number = $scope.user.username;
      }

      loginData.passwordLogin($scope.selectedBackend.url, mobile_phone_number, email, $scope.user.password).then(function() {

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
