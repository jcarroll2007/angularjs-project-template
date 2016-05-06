(function () {
    'use strict';

    function stateConfig($stateProvider) {
        $stateProvider
            .state('app.share', {
                url: 'share',
                abstract: true,
                template: '<div ui-view></div>'
            })
            .state('app.share.submission', {
                url: '',
                template: '<reason-submission-form></reason-submission-form>'
            })
            .state('app.share.submitted', {
                url: '',
                template: '<reason-submitted></reason-submitted>'
            });
    }

    angular.module('app.share', [
        'app.share.submission',
        'app.share.submitted',
        'ui.router'
    ])
        .config(stateConfig);
}());