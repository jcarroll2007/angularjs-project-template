(function () {

	function config($stateProvider) {
		$stateProvider.state('app.home', {
            url: '',
            templateUrl: 'app/home/home.html'
		});
	}

	angular.module('app.home', [])
		.config(config);
}());