angular.module('meanApp').controller('SignupController',['$scope', '$rootScope', 'AuthService', 'AUTH_EVENTS', function($scope, $rootScope, AuthService, AUTH_EVENTS) {

  $scope.formData = {};
  $scope.message = null;

  // submit the form (all authentication logic in the service)
  $scope.signup = function(credentials, form) {

    AuthService.signup(credentials).then(function(user) {
      // signup successful
      form.$setPristine();
      $scope.formData = {};
      $scope.message = null;
      $scope.setCurrentUser(user);
      // notify the entire app with broadcast
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    }, function(message) {
      // signup failed
      form.$setPristine();
      $scope.formData = {};
      $scope.message = message;
      // notify the entire app with broadcast
      $rootScope.$broadcast(AUTH_EVENTS.loginFailure);
    });

  };

}]);
