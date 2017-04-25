angular.module('LoginCtrl', []).controller('LoginController', function($scope, $rootScope, AuthService, AUTH_EVENTS) {

  $scope.formData = {};

  // submit the form (all authentication logic in the service)
  $scope.login = function(credentials) {
    AuthService.login(credentials).then(function(user) {
      // notify the entire app with broadcast
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function() {
      // notify the entire app with broadcast
      $rootScope.$broadcast(AUTH_EVENTS.loginFailure);
    });
  };

});
