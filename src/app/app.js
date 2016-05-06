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
            })
            .state('app.home', {
                url: '',
                templateUrl: 'app/home/home.html'
            });
    }

    angular.module('app', [
        'ui.router'
    ])
        .config(config);
}());