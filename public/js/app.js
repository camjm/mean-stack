angular.module('meanApp', [
  'ngRoute',
  'appRoutes',
  // controllers
  'MainCtrl',
  'NerdCtrl',
  'LoginCtrl',
  'SignupCtrl',
  'ProfileCtrl',
  'ApplicationCtrl',
  // services
  'NerdService',
  'AuthService',
  'SessionService',
  // other
  'AuthInterceptor',
  'LoginDialog'
]);

angular.module('meanApp').run(['$rootScope', 'AUTH_EVENTS', 'AuthService', function($rootScope, AUTH_EVENTS, AuthService) {

  // disallow access to page if not authorized
  $rooteScope.$on('$routeChangeStart', function (event, current, previous) {
    var authorizedRoles = next.data.authorizedRoles;
    if (!AuthService.isAuthorized(authorizedRoles)) {
      // prevent transitiion to next page
      event.preventDefault();
      // broadcast event for other modules
      var authEvent = !AuthService.isAuthenticated()
        ? AUTH_EVENTS.notAuthenticated // user is not logged in
        : AUTH_EVENTS.notAuthorized; // user is not allowed
      $rootScope.$broadcast(authEvent);
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
    console.log('route change success!');
  });

  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
    console.log('route change error!');
  });

}]);

// EVENT CODES
// Authentication effects the state of the whole application, so use events to broadcast changes in the user session
angular.module('meanApp').constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailure: 'auth-login-failure',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated', // TODO: open loginDialog directive when triggered? (inject scope into directive then '$on' it)
  notAuthorized: 'auth-not-authorized' // TODO: show error message when triggered?
}).constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});


// https://docs.angularjs.org/api/ng/service/$http#interceptors
// The official Angular docs recommed using interceptors for authentication for SPAs
// Can use interceptors to process requests before being send to the server, or responses
// before they are handed to the app code that initiated the request
angular.module('meanApp').config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}]);
