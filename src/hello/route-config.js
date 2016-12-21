function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/hello'); // Tell ui-router to go to /hello if the state is not set (redirects user at '/' to '/hello')

    $stateProvider.state('hello', {
        url: '/hello',
        templateUrl: '/hello/hello.html',
        controller: 'HelloController',
        controllerAs: 'helloVm'
    });
}

routeConfig.inject = ['$stateProvider', '$urlRouterProvider'];

export default routeConfig;