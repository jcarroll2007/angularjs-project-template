(function () {

	function stateConfig($stateProvider) {
		$stateProvider.state('app.about', {
            url: 'about',
            templateUrl: 'app/about/about.html'
		});
	};

	angular.module('app.about', [])
		.config(stateConfig);
}());