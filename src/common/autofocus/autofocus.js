(function () {
    'use strict';

    /*jslint unparam:true*/
    function autoFocus($timeout) {
        return {
            restrict: 'AC',
            link: function (_scope, _element) {
                $timeout(function () {
                    _element[0].focus();
                }, 0);
            }
        };
    }

    angular.module('common.autofocus', [])
        .directive('autoFocus', autoFocus);
}());