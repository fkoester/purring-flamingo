/* global define */
define(['app', angular], function (app, ng) {
  'use strict';

  app.config(function (fileManagerConfigProvider) {
    var defaults = fileManagerConfigProvider.$get();

    fileManagerConfigProvider.set({
      appName: undefined,
      defaultLang: 'de',
      hidePermissions: true,
      useBinarySizePrefixes: true,
      allowedActions: ng.extend(defaults.allowedActions, {
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
      createFolderUrl: '/api/files/createFolder',
      renameUrl: '/api/files/rename',
      copyUrl: '/api/files/copy',
    });
  });
});
