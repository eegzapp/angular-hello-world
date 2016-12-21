
/**
 * At the top, we're importing classes and/or functions from other files.
 */
import angular from 'angular'; // This is importing the angular object from the source of 'angular'. 'angular' is a SystemJS shortcut name that was defined in the map section of config.js after a call to jspm install. You can change these shortcuts by editing config.js.
import HelloController from './hello-controller'; // This looks just like the previous import, but it is finding it's source using the file path. Starting with / or ./ helps to indicate that this isn't a shortcut in config.js.
import routeConfig from './route-config';

var helloModule = angular.module('helloModule', ['ui.router']);
helloModule.config(routeConfig);
helloModule.controller('HelloController', HelloController);

export default helloModule;