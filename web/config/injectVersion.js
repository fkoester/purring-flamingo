/* global define */
define(['app'], function (app) {
  'use strict';

  app.run(function($rootScope, versionInformation, $log){
		$rootScope.versionInformation = versionInformation;
	});
});
