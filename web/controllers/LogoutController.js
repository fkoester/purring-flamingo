
/* global define */
define(['./module'], function (controllers) {
	'use strict';

	controllers.controller('LogoutController', function ($location, loginData) {

		loginData.logout().then(function() {
			$location.path("/login");
		});
	});
});
