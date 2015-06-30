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
            // Home
            ///////////////////////////
            .state('app', {
                url: '/',
                templateUrl: 'app/app.html'
            })

            ///////////////////////////
            // About
            ///////////////////////////
            .state('app.about', {
                url: 'about',
                templateUrl: 'app/about/about.html'
            });
    }

    angular.module('app.routes', [])
        .config(config);
}());