/*jslint node: true */

function ResourceNotFoundError(resource, id) {
	this.statusCode = 404;
	this.name = 'ResourceNotFoundError';
	this.message = resource + ' (' + id + ')' + ' not found!';
	Error.captureStackTrace(this, ResourceNotFoundError);
}

ResourceNotFoundError.prototype = Object.create(Error.prototype);
ResourceNotFoundError.prototype.constructor = ResourceNotFoundError;

exports.ResourceNotFoundError = ResourceNotFoundError;

function UserHasNoPasswordError() {
	this.statusCode = 401;
	this.name = 'UserHasNoPasswordError';
	this.message = 'User has not set any password';
	Error.captureStackTrace(this, UserHasNoPasswordError);
}

UserHasNoPasswordError.prototype = Object.create(Error.prototype);
UserHasNoPasswordError.prototype.constructor = UserHasNoPasswordError;

exports.UserHasNoPasswordError = UserHasNoPasswordError;

function InvalidLoginError() {
	this.statusCode = 401;
	this.name = 'InvalidLoginError';
	this.message = 'Invalid login';
	Error.captureStackTrace(this, InvalidLoginError);
}

InvalidLoginError.prototype = Object.create(Error.prototype);
InvalidLoginError.prototype.constructor = InvalidLoginError;

exports.InvalidLoginError = InvalidLoginError;
