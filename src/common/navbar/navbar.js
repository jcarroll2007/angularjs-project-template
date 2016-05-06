(function () {
    'use strict';

    function NavbarController() {
        this.test = 'my navbar';
    }

    function navbar() {
        return {
            controller: NavbarController,
            controllerAs: 'ctrl',
            replace: true,
            restrict: 'E',
            scope: {},
            templateUrl: 'common/navbar/navbar.html'
        };
    }

    angular.module('common.navbar', [])
        .directive('navbar', navbar);

}());