import angular from 'angular';
import 'angular-ui-router';

import helloModule from 'hello/hello-module';


/**
 * This is a good place to inser polyfills
 */

/**
 * Main application module
 * Named 'app'
 * The items in the square brackets are things that app depends on.
 */
var appModule = angular.module('app', [
    "helloModule"
]);

// Actually start the application
angular.bootstrap(document, [appModule.name]);