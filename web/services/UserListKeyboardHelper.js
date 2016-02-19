/* global define */
define(['./module', 'angular'], function (services, ng) {
  'use strict';

  services.factory('UserListKeyboardHelper', function($timeout, hotkeys) {

    return {
      apply: function($scope) {

        $scope.toggleHelp = function() {
          console.log(hotkeys);
          hotkeys.toggleCheatSheet();
        };

        function processCancel() {
          if($scope.addingUser) {
            $scope.cancelAddingUser();
          }

          if($scope.editingUser) {
            $scope.cancelEditUser($scope.editedUser);
            ng.element('.popover').hide();
          }
        }

        function processSave() {
          if($scope.addingUser) {
            $scope.addUser();
          }

          if($scope.editingUser) {
            $scope.saveUser($scope.editedUser);
          }
        }

        function processRemove() {
          // Do nothing when in add mode
          if($scope.addingUser) {
            return;
          }

          if(!$scope.editingUser) {
            $scope.users.some(function(user) {
              if(user.selected) {
                $scope.editUser(user);
                return true;
              }
            });
          }

          $timeout(function() {
            ng.element('.userEditMode .delete-user-button').click();
          }, 50);
        }

        function processUp() {
          // Only change selection if not in add or edit mode
          if($scope.addingUser || $scope.editingUser) {
            return;
          }

          var user;
          var found = false;
          for(var i=0; i < $scope.users.length; i++) {
            user = $scope.users[i];
            if(user.selected) {
              found = true;
              user.selected = false;
              if(i > 0) {
                $scope.users[i-1].selected = true;
              }
            } else {
              user.selected = false;
            }
          }
          if(!found) {
            $scope.users[0].selected = true;
          }
        }

        function processDown() {
          // Only change selection if not in add or edit mode
          if($scope.addingUser || $scope.editingUser) {
            return;
          }

          var user;
          var found = false;
          for(var i=$scope.users.length-1; i >= 0; i--) {
            user = $scope.users[i];
            if(user.selected) {
              found = true;
              user.selected = false;
              if(i < $scope.users.length-1) {
                $scope.users[i+1].selected = true;
              }
            } else {
              user.selected = false;
            }
          }
          if(!found) {
            $scope.users[0].selected = true;
          }
        }

        function processAdd() {
          // Do nothing when in edit mode
          if($scope.editingUser) {
            return;
          }
          $scope.addingUser = true;
        }

        function processEdit() {
          // Do nothing when in add or edit mode
          if($scope.addingUser || $scope.editingUser) {
            return;
          }

          $scope.users.forEach(function(user) {
            if(user.selected) {
              $scope.editUser(user);
            }
          });
        }

        hotkeys.bindTo($scope).add({
          combo: 'esc',
          description: 'Cancel adding/editing',
          callback: processCancel
        }).add({
          combo: 'return',
          description: 'Save user',
          callback: processSave
        }).add({
          combo: 'shift+del',
          description: 'Remove user',
          callback: processRemove
        }).add({
          combo: 'up',
          description: 'Navigate up in user list',
          callback: processUp
        }).add({
          combo: 'down',
          description: 'Navigate down in user list',
          callback: processDown
        }).add({
          combo: 'ins',
          description: 'Enter add mode',
          callback: processAdd
        }).add({
          combo: 'shift+ins',
          description: 'Enter edit mode',
          callback: processEdit
        });

        // Needed for key event handling in input fields
        $scope.checkKeyboardEvents = function(event) {
          if(event.key === 'Enter' && !event.altKey && !event.ctrlKey && !event.shiftKey) {
            processSave();
          } else if(event.key === 'Escape' && !event.altKey && !event.ctrlKey && !event.shiftKey) {
            processCancel();
          } else if(event.key === 'Delete' && !event.altKey && !event.ctrlKey && event.shiftKey) {
            processRemove();
          }
        };
      }
    };
  });
});
