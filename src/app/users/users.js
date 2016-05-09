(function () {

	function config($stateProvider) {
		$stateProvider
			.state('app.create', {
				url: 'create',
				template: '<div class="container"><create-user></create-user></div>'
			})
			.state('app.users', {
				controller: function ($scope, users) {
					this.list = users;
				},
				controllerAs: 'users',
				resolve: {
					users: function (Users) {
						return Users.getList();
					}
				},
				template: '<div class="container"><user-list ng-model="users.list"></user-list></div>',
				url: 'users'
			});
	}

	angular.module('app.users', [
			'app.users.create',
			'app.users.list',
			'models'
		])
		.config(config);
}());