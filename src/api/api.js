(function () {
    'use strict';

    var API_BASE_URL = '/api';

    function URL() {
        /**
         * @returns a properly formatted url.
         *     Example Usage: URL('my', 'url', '4') === '/{API_BASE_URL}/my/url/4/'
         */
        return function () {
            var url_array = [API_BASE_URL];
            Array.prototype.push.apply(url_array, arguments);
            return url_array.join('/') + '/';
        };
    }

    angular.module('api', [])
        .service('URL', URL);
}());