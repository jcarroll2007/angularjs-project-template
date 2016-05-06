(function () {
    'use strict';

    function ReasonSubmittedController() {
        this.test = 'test';
    }

    function reasonSubmitted() {
        return {
            controller: ReasonSubmittedController,
            controllerAs: 'submitted',
            restrict: 'E',
            templateUrl: 'app/share/submitted/submitted.html'
        };
    }

    angular.module('app.share.submitted', [
        'api'
    ])
        .directive('reasonSubmitted', reasonSubmitted);
}());