(function () {
    'use strict';

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('app', {
                url: '/',
                templateUrl: 'app/app.html',
                abstract: true
            });
    }

    angular.module('app', [
        'app.home',
        'app.about'
    ])
        .config(config);
}());