
/* global define */
define(['./module'], function (controllers) {
	'use strict';

	controllers.controller('LogoutController', function ($location, userData) {

		userData.logout().then(function() {
			$location.path("/login");
		});
	});
});
