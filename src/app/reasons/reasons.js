(function () {
    'use strict';

    function stateConfig($stateProvider) {
        $stateProvider
            .state('app.reasons', {
                controller: function (submissions) {
                    this.submissions = submissions;
                },
                controllerAs: 'reasonsState',
                resolve: {
                    submissions: function (Submission) {
                        return Submission.getList();
                    }
                },
                template: '<reasons-list ng-model="reasonsState.submissions"></reasons-list>',
                url: 'reasons'
            });
    }

    angular.module('app.reasons', ['app.reasons.list', 'app.reasons.reason'])
        .config(stateConfig);
}());