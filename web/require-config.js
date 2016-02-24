/* global require */
require.config({

  // alias libraries paths
  paths: {
    'domReady': './domReady/domReady',
    'angular': './angular/angular',
    'angular-bootstrap': '/angular-bootstrap/ui-bootstrap-tpls',
    'angular-checklist-model': '/checklist-model/checklist-model',
    'angular-loading-bar': '/angular-loading-bar/build/loading-bar',
    'angular-aria': '/angular-aria/angular-aria',
    'angular-animate': '/angular-animate/angular-animate',
    'angular-cookies': '/angular-cookies/angular-cookies',
    'angular-filemanager': '/angular-filemanager/dist/angular-filemanager.min',
    'angular-file-upload': '/ng-file-upload/ng-file-upload',
    'angular-file-saver': '/angular-file-saver/dist/angular-file-saver',
    'angular-hotkeys': '/angular-hotkeys/build/hotkeys',
    'angular-material': '/angular-material/angular-material',
    'angular-moment': '/angular-moment/angular-moment',
    'angular-resource': '/angular-resource/angular-resource',
    'angular-sanitize': '/angular-sanitize/angular-sanitize',
    'angular-translate': '/angular-translate/angular-translate',
    'angular-ui-notification': '/angular-ui-notification/dist/angular-ui-notification',
    'angular-ui-router': '/angular-ui-router/release/angular-ui-router',
    'angular-ui-router-styles': '/angular-ui-router-styles/ui-router-styles',
    'angular-ui-select': '/ui-select/dist/select',
    'angular-ui-sortable': '/angular-ui-sortable/sortable',
    'angular-utf8-base64': '/angular-utf8-base64/angular-utf8-base64',
    'bootstrap-js': '/bootstrap/dist/js/bootstrap',
    'socket.io-client': '/socket.io-client/socket.io',
    'angular-socket-io': '/angular-socket-io/socket',
    'jquery': '/jquery/dist/jquery',
    'moment': '/moment/moment',
    'moment-locale-de': '/moment/locale/de',
    'ng-focus-if': '/ng-focus-if/focusIf',
    'pako': '/pako/dist/pako',
    'file-saver-js': '/file-saver.js/FileSaver',
    'blob-polyfill': '/blob-polyfill/Blob'
  },

  // angular does not support AMD out of the box, put it in a shim
  shim: {
    'angular': {
      deps: ['jquery'],
      exports: 'angular'
    },
    'angular-bootstrap':{
      deps: ['angular']
    },
    'angular-ui-notification': {
      deps: ['angular']
    },
    'angular-aria': {
      deps: ['angular']
    },
    'angular-animate': {
      deps: ['angular']
    },
    'angular-cookies': {
      deps: ['angular']
    },
    'angular-filemanager': {
      deps: ['angular', 'angular-translate', 'angular-cookies', 'bootstrap-js', 'angular-file-saver']
    },
    'angular-file-upload': {
      deps: ['angular']
    },
    'angular-file-saver': {
      deps: ['angular', 'file-saver-js', 'blob-polyfill']
    },
    'angular-material': {
      deps: ['angular-aria', 'angular-animate']
    },
    'angular-ui-router':{
      deps: ['angular']
    },
    'angular-ui-router-styles':{
      deps: ['angular-ui-router']
    },
    'angular-bootstrap-confirm':{
      deps: ['angular', 'angular-sanitize']
    },
    'angular-hotkeys': {
      deps: ['angular']
    },
    'angular-resource':{
      deps: ['angular']
    },
    'angular-sanitize':{
      deps: ['angular']
    },
    'angular-translate': {
      deps: ['angular']
    },
    'angular-loading-bar': {
      deps: ['angular']
    },
    'socket.io-client': {
      exports: 'io'
    },
    'angular-socket-io': {
      deps: ['angular', 'socket.io-client']
    },
    'angular-checklist-model': {
      deps: ['angular']
    },
    'angular-ui-select': {
      deps: ['angular']
    },
    'angular-ui-sortable': {
      deps: ['angular']
    },
    'angular-utf8-base64': {
      deps: ['angular']
    },
    'bootstrap-js': {
      deps: ['jquery']
    },
    'moment': {
      exports: ['moment']
    },
    'ng-focus-if': {
      deps: ['angular']
    },
    'angular-moment': {
      deps: ['angular', 'moment']
    }
  },

  // kick start application
  deps: ['./bootstrap']
});
