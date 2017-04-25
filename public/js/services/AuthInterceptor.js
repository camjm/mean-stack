// Interceptor to broadcast user session events

angular.module('AuthInterceptor', []).factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', function($rootScope, $q, AUTH_EVENTS) {

  return {

    responseError: function(response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated, // User not logged in
        403: AUTH_EVENTS.notAuthorized, // User logged in, but not allowed
        419: AUTH_EVENTS.sessionTimeout, // Timeout (non-standard)
        440: AUTH_EVENTS.sessionTimeout // Timeout (Microsoft only)
      });
      return $q.reject(response);
    }

  };

}]);
