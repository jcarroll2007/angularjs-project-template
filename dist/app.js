(function () {
    'use strict';

    angular.module('app', [
        'app.routes',
        'app.common'
    ]);

}());
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
    config.$inject = ["$stateProvider", "$urlRouterProvider"];

    angular.module('app.routes', [])
        .config(config);
}());
(function () {
    'use strict';

    // This module should depend on all of the common components
    // A common component is a component that will be used
    // in multiple places across your app.

    angular.module('app.common', []);
}());