/**
 * This is the controller for the hello.html view
 * It is associated with the hello.html file via the route-config.js file.
 * This format of the controller is es2015 based. Older formats did not look like a class.
 */
class HelloController {
    constructor($scope) { // $scope is a 'provider' that HelloController depends on. It provides functionality. See https://docs.angularjs.org/guide/providers
        
        // This is a property of the data model that HelloController maintains.
        // The view binds to it through angular interpolation (using {{}}).
        // See https://docs.angularjs.org/guide/interpolation;
        this.helloMessage = "Hello World!";
    }
}

// This is a mechanism for associating string literal names for dependencies. 
// It keeps them from getting mangled when the project is minified.
// We're not using $scope here, it's just for example.
HelloController.$inject = ['$scope']; 

// Here we are exposing this class as the default. That means someone can get to it by just saying "import from 'hello-controller'"
// If it wasn't the default then a user would have to specify the name of the class/function they were trying to get from this file.
export default HelloController;