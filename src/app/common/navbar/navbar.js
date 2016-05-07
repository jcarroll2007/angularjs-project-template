(function () {

	function NavbarController() {
		this.test = 'test';
	}

	function navbar() {
		return {
			controller: NavbarController,
			controllerAs: 'navbar',
			restrict: 'E',
			templateUrl: 'app/common/navbar/navbar.html'
		}
	}

	angular.module('app.common.navbar', [])
		.directive('navbar', navbar);
}());