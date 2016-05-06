(function () {
    'use strict';

    function ReasonSubmissionController(Submission, $state) {
        var ctrl = this;

        ctrl.submission = {};

        ctrl.isSubmitting = false;
        ctrl.submit = function () {
            ctrl.isSubmitting = true;
            Submission.save(ctrl.submission)
                .then(function () {
                    $state.go('app.share.submitted');
                });
        };
    }

    function reasonSubmissionForm() {
        return {
            controller: ReasonSubmissionController,
            controllerAs: 'submission',
            restrict: 'E',
            templateUrl: 'app/share/submission/submission.html'
        };
    }

    angular.module('app.share.submission', [
        'api'
    ])
        .directive('reasonSubmissionForm', reasonSubmissionForm);
}());