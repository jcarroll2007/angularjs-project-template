(function () {

	function CreateUserController(Users) {
		this.newUser = {};

		this.submitForm = function () {
			console.log(this.newUser);
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