(function () {
    'use strict';

    angular.module('app', [
        'app.routes',
        'app.common'
    ]);

}());
(function () {
    'use strict';
    angular.module('app.routes', []);
}());
(function () {
    'use strict';

    // This module should depend on all of the common components
    // A common component is a component that will be used
    // in multiple places across your app.

    angular.module('app.common', []);
}());