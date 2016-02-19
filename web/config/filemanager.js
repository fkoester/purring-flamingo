/* global define */
define(['app'], function (app) {
  'use strict';

  app.config(function (fileManagerConfigProvider) {
    var defaults = fileManagerConfigProvider.$get();

    fileManagerConfigProvider.set({
      appName: undefined,
      defaultLang: 'de',
      hidePermissions: true,
      useBinarySizePrefixes: true,
      allowedActions: angular.extend(defaults.allowedActions, {
        upload: true,
        remove: true,
        edit: false,
        changePermissions: false,
        compress: false,
        compressChooseName: false,
        extract: false,
        preview: false
      }),
      listUrl: '/api/files/list',
      downloadFileUrl: '/api/files/download',
      uploadUrl: '/api/files/upload',
      removeUrl: '/api/files/remove',
      createFolderUrl: '/api/files/createFolder'
    });
  });
});
