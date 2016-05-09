(function () {

	function users() {
		var self = this;
		self._users = [];

		self.save = function (model) {
			self._users.push(model);
		};

		self.getList = function () {
			return self._users;
		};

		self.delete = function (user) {
			_.remove(self._users, _.partial(_.isEqual, _, user));
		};

		/** Load Fixture Data */
		function addFixture(firstName, lastName, email, password) {
			self._users.push({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			});
		}
		addFixture('John', 'Doe', 'jdoe@email.com', 'asdf');
		addFixture('Jack', 'Smith', 'jsmith@email.com', 'asdf');
		addFixture('Alexander', 'Williams', 'awilliams@email.com', 'asdf');
	}

	angular.module('models.users', [])
		.service('Users', users);
}());