/* global define */
define([
   'angular',
   'angular-bootstrap',
   //'angular-loading-bar',
   ///'moment-locale-de',
   'angular-filemanager',
   //'angular-file-upload',0
   'angular-hotkeys',
   //'angular-moment',
   //'angular-socket-io',
   'angular-ui-notification',
   'angular-ui-router',
   'angular-ui-router-styles',
   'angular-resource',
   //'angular-ui-select',
   //'angular-ui-sortable',
   //'angular-checklist-model',
   'angular-material',
   //'ng-focus-if',
   './controllers/index',
   //'./directives/index',
   //'./filters/index',
   './services/index',
   './config/build',
   './config/env'
], function (ng) {
   'use strict';

   return ng.module('app', [
       'app.services',
       'app.controllers',
       // currently no filters defined
       //'app.filters'
       //'app.directives',

       // Angular material
       'ngAnimate',
       'ngMaterial',

       // Angular RESTful resource support
       'ngResource',

       // Angular UI Bootstrap integration
       'ui.bootstrap',

       // Angular UI extensions
       'ui-notification',
       'ui.router',
       //'ui.select',
       //'ui.sortable',

       // Angular UI Router route-specific CSS stylesheets
       'uiRouterStyles',

       // Angular Loading Bar
       //'angular-loading-bar',

       // Angular Moment
       //'angularMoment',

       // Angular Socket.IO API
       //'btford.socket-io',

       // Angular Keyboard controllers
       'cfp.hotkeys',

       // Autofocus elements under specified conditions
       //'focus-if',

       // File upload support
       //'ngFileUpload',

       // File manager
       'FileManagerApp'
   ]);
});
