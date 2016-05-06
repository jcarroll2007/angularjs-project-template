(function () {
    'use strict';

    // This module should depend on all of the common components
    // A common component is a component that will be used
    // in multiple places across your app.

    angular.module('common', [
        'common.autofocus',
        'common.navbar'
    ]);
}());