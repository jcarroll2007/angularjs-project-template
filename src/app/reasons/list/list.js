(function () {
    'use strict';

    function ReasonsController() {
        var ctrl = this;
        ctrl.reasons = [];

        ctrl.add = function () {
            ctrl.ngModel.unshift({
                name: 'Jordan Carroll',
                email: 'jcarroll2007@gmail.com',
                age: '23',
                reason: 'I love our LORD because He came to us to save us when we didn\'t deserve it. He made a way from Heaven, not to Heaven',
                image: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xta1/v/t1.0-9/12342504_10208675592032047_2237316667569290936_n.jpg?oh=66cfdbe0967533875b661dbf8281e94b&oe=574BE051'
            });
        };
    }

    function reasonsList() {
        return {
            controller: ReasonsController,
            controllerAs: 'ctrl',
            bindToController: true,
            restrict: 'E',
            scope: {
                ngModel: '='
            },
            templateUrl: 'app/reasons/list/list.html'
        };
    }

    angular.module('app.reasons.list', ['akoenig.deckgrid'])
        .directive('reasonsList', reasonsList);

}());