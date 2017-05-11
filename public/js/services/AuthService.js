// Contains all logic related to Access Control (authentication and authorization)

angular.module('meanApp').factory('AuthService', ['$http', 'Session', function($http, Session) {

  return {

    login: function(credentials) {
      return $http
        .post('/auth/login', credentials)
        .then(function(res) {
          Session.create(
            res.data.id,
            res.data.user.id,
            res.data.user.role);
          return res.data.user;
        });
    },

    isAuthenticated: function() {
      return !!Session.userId;
    },

    isAuthorized: function(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return
        this.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1;
    }

  };

}]);
