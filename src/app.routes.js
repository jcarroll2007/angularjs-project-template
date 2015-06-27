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

            .state('app', {
                url: '/'
                templateUrl:
            })
    }

    angular.module('app.routes', [])
        .config(config);
}());