/* global define */
define(['app'], function (app) {
  'use strict';

  app.run(function($rootScope, config, $log){
		$rootScope.config = config;
	});
});
