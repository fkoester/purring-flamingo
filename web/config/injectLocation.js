/* global define */
define(['app'], function (app) {
  'use strict';

  app.run(function($rootScope, $location) {
		$rootScope.location = $location;
	});
});
