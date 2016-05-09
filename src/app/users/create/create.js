(function () {

	function CreateUserController(Users, $state) {
		this.newUser = {};

		this.submitForm = function () {
			if (!this.newUser.firstName ||
				!this.newUser.lastName ||
				!this.newUser.email ||
				!this.newUser.password) {
				return;
			}

			Users.save(this.newUser);
			this.newUser = {};

			$state.go('app.users');
		};
	}

	function createUser() {
		return {
			controller: CreateUserController,
			controllerAs: 'createUser',
			restrict: 'E',
			templateUrl: 'app/users/create/create.html'
		};
	}

	angular.module('app.users.create', [])
		.directive('createUser', createUser);
}());