angular.module('meanApp').controller('LoginController',['$scope', '$rootScope', 'AuthService', 'AUTH_EVENTS', function($scope, $rootScope, AuthService, AUTH_EVENTS) {

  $scope.formData = {};
  $scope.message = null;

  $scope.resetForm = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    $scope.formData = {};
  };

  // submit the form (all authentication logic in the service)
  $scope.login = function(credentials, form) {

    AuthService.login(credentials).then(function(user) {
      // login successful
      $scope.resetForm(form);
      $scope.message = null;
      $scope.setCurrentUser(user);
      // notify the entire app with broadcast
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    }, function(message) {
      // login failed
      $scope.resetForm(form);
      $scope.message = message;
      // notify the entire app with broadcast
      $rootScope.$broadcast(AUTH_EVENTS.loginFailure);
    });

  };

}]);
