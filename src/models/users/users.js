(function () {

	function users() {
		this._users = [];

		this.save = function (model) {
			this._users.push(model);
		};

		this.getList = function () {
			return this._users;
		};
	}

	angular.module('models.users', [])
		.service('Users', users);
}());