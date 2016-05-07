(function () {

	function config($stateProvider) {
		$stateProvider
			.state('app.createUser', {
				url: 'create',
				template: '<create-user></create-user>'
			})
			.state('app.users.manage', {

			});
	}

	angular.module('app.users', [
			'app.users.create'
		])
		.config(config);
}());