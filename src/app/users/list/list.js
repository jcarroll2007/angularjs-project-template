(function () {

	function UserListController(Users) {
		var self = this;
		self.toggleEditing = function (user) {
			console.log(user);
			if (user.editing === undefined) {
				user.editing = true;
			} else {
				user.editing = !user.editing;
			}
		};

		self.delete = function (user) {
			Users.delete(user);
		};
	}

	function userList() {
		return {
			bindToController: true,
			controller: UserListController,
			controllerAs: 'users',
			restrict: 'E',
			scope: {
				ngModel: '='
			},
			templateUrl: 'app/users/list/list.html'
		};
	}

	angular.module('app.users.list', [])
		.directive('userList', userList);
}());