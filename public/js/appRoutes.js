angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

    // home page
    .when('/', {
      templateUrl: 'partials/home',
      controller: 'MainController'
    })

    // nerds page that will use the NerdController
    .when('/nerds', {
      templateUrl: 'partials/nerd',
      controller: 'NerdController'
    });

  $locationProvider.html5Mode(true);

}]);
