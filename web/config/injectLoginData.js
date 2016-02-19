/* global define */
define(['app'], function (app) {
  'use strict';

  app.run(function($rootScope, loginData, $log){
		$rootScope.loginData = loginData;
	});
});
