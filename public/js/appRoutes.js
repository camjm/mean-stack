angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'partials/home',
      controller: 'MainController'
    })

    .when('/nerds', {
      templateUrl: 'partials/nerd',
      controller: 'NerdController'
    })

    .when('/login', {
      templateUrl: 'partials/login',
      controller: 'LoginController'
    })

    .when('/auth/google', {
      templateUrl: '/auth/google',
      controller: 'LoginController'
    })

    .when('/signup', {
      templateUrl: 'partials/signup',
      controller: 'SignupController'
    })

    .when('/profile', {
      templateUrl: 'partials/profile',
      controller: 'SignupController'
    });

  $locationProvider.html5Mode(true);

}]);
