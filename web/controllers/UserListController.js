/* global define */
define(['./module', 'angular'], function (controllers, ng) {
  'use strict';

  controllers.controller('UserListController', function ($scope, $log, User, loginData, UserListKeyboardHelper) {

    UserListKeyboardHelper.apply($scope);

    $scope.users = User.query();

    $scope.initialUser = {
      name: '',
      mobile_phone_number: '',
      team_roles: []
    };

    $scope.newUser = ng.copy($scope.initialUser);

    // TYPE FILTER
    $scope.userRoles = [
      { key: 'admin', label: 'Admin' }
    ];

    $scope.userRoleFilter = function(user) {
      return $scope._userRoleFilter.length === 0 || user.team_roles.some(function(role) {
        return $scope._userRoleFilter.indexOf(role) >= 0;
      });
    };

    $scope._userRoleFilter = [];

    $scope.setUserRoleFilter = function(filter) {
      if (filter === 'all') {
        $scope._userRoleFilter = [];
      } else if ($scope._userRoleFilter.indexOf(filter) === -1) {
        $scope._userRoleFilter.push(filter);
      } else {
        $scope._userRoleFilter.splice($scope._userRoleFilter.indexOf(filter), 1);
      }
    };

    $scope.isUserRoleFilter = function(filter) {
      if (filter === 'all') {
        return $scope._userRoleFilter.length === 0;
      } else {
        return $scope._userRoleFilter.indexOf(filter) !== -1;
      }
    };

    // ORDER
    $scope.orderBy = 'order';
    $scope.reverseOrder = false;

    $scope.isOrder = function(orderBy, reverseOrder) {
      return $scope.orderBy === orderBy && $scope.reverseOrder === reverseOrder;
    };
    $scope.order = function(orderBy) {
      if ($scope.orderBy == orderBy) {
        $scope.reverseOrder = !$scope.reverseOrder;
        return;
      }

      // Here we could assign multiple orders later...
      $scope.orderBy = orderBy;
      $scope.reverseOrder = false;
    };

    $scope.toggleRole = function(user, role) {
      var idx = user.team_roles.indexOf(role);
      if (idx >= 0) {
        user.team_roles.splice(idx, 1);
      } else {
        user.team_roles.push(role);
      }
    };

    $scope.editUser = function(user) {

      $scope.editedUserOrig = ng.copy(user);
      $scope.editedUser = user;
      user.selected = true;
      user.editMode = true;
      $scope.editingUser = true;
    };

    $scope.saveUser = function(user) {

      user.selected = true;

      user.$save(function(savedUser) {
        $scope.editedUserOrig = undefined;
        $scope.editedUser = undefined;
        user.editMode = false;
        $scope.editingUser = false;
      });
    };

    $scope.cancelEditUser = function(user) {

      user.display_name = $scope.editedUserOrig.display_name;
      user.mobile_phone_number = $scope.editedUserOrig.mobile_phone_number;
      user.roles = $scope.editedUserOrig.roles;
      $scope.editedUserOrig = undefined;
      $scope.editedUser = undefined;

      user.selected = true;
      user.editMode = false;
      $scope.editingUser = false;
    };

    $scope.cancelAddingUser = function() {
      $scope.addingUser = false;
      $scope.newUser = ng.copy($scope.initialUser);
    };

    $scope.addUser = function() {

      var user = new User();

      user.full_name = $scope.newUser.name;
      user.display_name = $scope.newUser.name;

      user.mobile_phone_number = $scope.newUser.mobile_phone_number;

      user.roles = $scope.newUser.roles;

      user.$save().then(function(createdUser) {
        $scope.cancelAddingUser();
        $scope.users.push(createdUser);
      });
    };

    $scope.removeUser = function(userToRemove) {
      // TODO
    };

    $scope.roleName = function(role) {
      return {
        'admin': 'Admin'
      }[role];
    };
  });
});
