(function () {
    'use strict';

    function config($stateProvider, $urlRouterProvider) {

        ///////////////////////////
        // Redirects and Otherwise
        ///////////////////////////
        $urlRouterProvider
            .otherwise('/');

        ///////////////////////////
        // State Configurations
        ///////////////////////////

        $stateProvider


            ///////////////////////////
            // App
            ///////////////////////////
            .state('app', {
                url: '/',
                templateUrl: 'app/app.html',
                abstract: true
            })

            ///////////////////////////
            // Home
            ///////////////////////////
            .state('app.home', {
                url: '',
                templateUrl: 'app/home/home.html'
            });
    }

    function init($rootScope) {
        $rootScope.debug = true;
    }

    angular.module('app', [
        'app.share',
        'app.reasons',
        'ui.router',
        'ngAnimate'
    ])
        .config(config)
        .run(init);
}());