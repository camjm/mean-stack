angular.module('meanApp').controller('LoginController',['$scope', '$rootScope', 'AuthService', 'AUTH_EVENTS', function($scope, $rootScope, AuthService, AUTH_EVENTS) {

  $scope.formData = {};
  $scope.message = null;

  // submit the form (all authentication logic in the service)
  $scope.login = function(credentials, form) {

    AuthService.login(credentials).then(function(user) {
      // login successful
      form.$setPristine();
      $scope.formData = {};
      $scope.message = null;
      $scope.setCurrentUser(user);
      // notify the entire app with broadcast
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    }, function(message) {
      // login failed
      form.$setPristine();
      $scope.formData = {};
      $scope.message = message;
      // notify the entire app with broadcast
      $rootScope.$broadcast(AUTH_EVENTS.loginFailure);
    });

  };

}]);
