(function () {
    'use strict';

    function ReasonController() {
        this.test = 'test';
    }

    function reason() {
        return {
            controller: ReasonController,
            controllerAs: 'ctrl',
            bindToController: {
                ngModel: '=?'
            },
            restrict: 'E',
            scope: {},
            templateUrl: 'app/reasons/reason/reason.html'
        };
    }

    angular.module('app.reasons.reason', [])
        .directive('reason', reason);
}());