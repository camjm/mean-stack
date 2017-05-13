// Contains all logic related to Access Control (authentication and authorization)

angular.module('meanApp').factory('AuthService', ['$http', '$q', 'Session', function($http, $q, Session) {

  return {

    login: function(credentials) {
      return $q(function(resolve, reject){
        $http
          .post('/auth/login', credentials)
          .then(function(res) {
            var data = res.data;
            var user = data.user;
            Session.create(
              data.id,
              user._id,
              user.role);
            resolve(user);
          }, function(res) {
            var message = res.data.loginMessage;
            reject(message);
          });
      });
    },

    signup: function(credentials) {
      return $q(function(resolve, reject){
        $http
          .post('/auth/signup', credentials)
          .then(function(res) {
            var data = res.data;
            var user = data.user;
            Session.create(
              data.id,
              user._id,
              user.role);
            resolve(user);
          }, function(res) {
            var message = res.data.signupMessage;
            reject(message);
          });
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
