angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'partials/home',
      controller: 'MainController'
    })

    .when('/nerds', {
      templateUrl: 'partials/nerd',
      controller: 'NerdController'
    });

  $locationProvider.html5Mode(true);

}]);
