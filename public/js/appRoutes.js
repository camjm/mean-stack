angular.module('meanApp').config(['$routeProvider', '$locationProvider', 'USER_ROLES', function($routeProvider, $locationProvider, USER_ROLES) {

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

    // .when('/auth/google', {
    //   templateUrl: '/auth/google',
    //   controller: 'LoginController'
    // })

    .when('/signup', {
      templateUrl: 'partials/signup',
      controller: 'SignupController'
    })

    .when('/profile', {
      templateUrl: 'partials/profile',
      controller: 'ProfileController',
      // for access control
      roles: [USER_ROLES.admin, USER_ROLES.editor]
    });

  $locationProvider.html5Mode(true);

}]);
