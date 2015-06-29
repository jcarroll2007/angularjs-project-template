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
            });
    }

    angular.module('app.routes', [])
        .config(config);
}());