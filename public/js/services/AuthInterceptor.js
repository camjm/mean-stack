// Interceptor to broadcast user session events

angular.module('AuthInterceptor', []).factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', function($rootScope, $q, AUTH_EVENTS) {

  return {

    // called with the response object to modify; returns a response object directly or a promise containing the reponse
    response: function(response) {
      //TODO: something
      return response;
    },

    // called if a previous interceptor thew an error or resolved with a rejection
    responseError: function(response) {
      // TODO: change app location?
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated, // User not logged in
        403: AUTH_EVENTS.notAuthorized, // User logged in, but not allowed
        419: AUTH_EVENTS.sessionTimeout, // Timeout (non-standard)
        440: AUTH_EVENTS.sessionTimeout // Timeout (Microsoft only)
      }[response.status], response);
      return $q.reject(response);
    }

  };

}]);
