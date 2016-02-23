/**
 * bootstraps angular onto the window.document node
 */
 /* global define */
define([
    'require',
    'angular',
    'app',
    './config/routes',
    './config/auth',
    './config/injectVersion',
    './config/injectConfig',
    //'./config/moment',
    './config/injectLoginData',
    './config/injectLocation',
    './config/filemanager'
], function (require, ng) {
    'use strict';

    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['app']);
    });
});
