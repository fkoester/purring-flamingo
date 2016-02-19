/* global define */
define(['app'], function (app) {
  'use strict';

  return app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // enable html5Mode for pushstate ('#'-less URLs)
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false,
      rewriteLinks: true
    });

    $stateProvider.state('dashboard', {
      url: "/",
      templateUrl: 'views/Dashboard.html',
      controller: 'DashboardController',
      resolve: { authenticate: authenticate },
      data: {
        css: '/assets/css/dashboard.css'
      }
    });

    $stateProvider.state('error', {
      url: "/404",
      templateUrl: 'views/404.html',
      data: {
        css: '/assets/css/errorpage.css'
      }
    });

    $stateProvider.state('login', {
      url: "/login",
      templateUrl: '/views/Login.html',
      controller: 'LoginController',
      data: {
        css: '/assets/css/login.css'
      }
    });

    $stateProvider.state('logout', {
      url: "/logout",
      templateUrl: '/views/Logout.html',
      controller: 'LogoutController'
    });

    // Users
    $stateProvider.state('usersList', {
      url: '/users',
      templateUrl:  '/views/UserList.html',
      controller: 'UserListController',
      data: {
        css: '/assets/css/userlist.css'
      },
      resolve: { authenticate: authenticate }
    });

    // For any unmatched url, redirect to error page
    $urlRouterProvider.otherwise("/404");
  });

  function authenticate($q, loginData, $state, $timeout) {
    if (loginData.isAuthenticated()) {
      // Resolve the promise successfully
      return $q.when();
    } else {
      // The next bit of code is asynchronously tricky.

      $timeout(function() {
        // This code runs after the authentication promise has been rejected.
        // Go to the log-in page
        $state.go('login');
      });

      // Reject the authentication promise to prevent the state from loading
      return $q.reject();
    }
  }
});
