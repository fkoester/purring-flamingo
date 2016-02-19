/* global define */
define(['./module', 'angular'], function (controllers, ng) {
  'use strict';

  controllers.controller('UserListController', function ($scope, $log, User, loginData, UserListKeyboardHelper) {

    UserListKeyboardHelper.apply($scope);

    $scope.users = User.query(function(users) {
      console.log(users);
    });

    $scope.initialUser = {
      name: '',
      username: '',
      global_roles: []
    };

    $scope.newUser = ng.copy($scope.initialUser);

    // TYPE FILTER
    $scope.userRoles = [
      { key: 'admin', label: 'Admin' }
    ];

    $scope.userRoleFilter = function(user) {
      return $scope._userRoleFilter.length === 0 || user.global_roles.some(function(role) {
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
      var idx = user.global_roles.indexOf(role);
      if (idx >= 0) {
        user.global_roles.splice(idx, 1);
      } else {
        user.global_roles.push(role);
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

      user.name = $scope.editedUserOrig.name;
      user.username = $scope.editedUserOrig.username;
      user.global_roles = $scope.editedUserOrig.global_roles;
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

      user.name = $scope.newUser.name;

      user.global_roles = $scope.newUser.global_roles;

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
