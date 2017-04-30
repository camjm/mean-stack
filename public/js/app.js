angular.module('meanApp', [
  'ngRoute',
  'appRoutes'
]);

// Event Codes
angular.module('meanApp').constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailure: 'auth-login-failure',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized' // TODO: show error message when triggered?
})

// User Roles
angular.module('meanApp').constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});

angular.module('meanApp').config(['$httpProvider', function($httpProvider) {
  // The official Angular docs recommed using interceptors for authentication in SPAs
  // Can use them to process responses before they are handed to the app code that initiated the request
  $httpProvider.interceptors.push('AuthInterceptor');
}]);

angular.module('meanApp').run(['$rootScope', 'AUTH_EVENTS', 'AuthService', function($rootScope, AUTH_EVENTS, AuthService) {

  // disallow access to page if not authorized
  $rooteScope.$on('$routeChangeStart', function (event, next, current) {
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
