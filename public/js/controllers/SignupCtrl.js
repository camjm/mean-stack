angular.module('meanApp').controller('SignupController',['$scope', '$rootScope', 'AuthService', 'AUTH_EVENTS', function($scope, $rootScope, AuthService, AUTH_EVENTS) {

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
  $scope.signup = function(credentials, form) {

    if (form.$invalid) return;

    AuthService.signup(credentials).then(function(user) {
      // signup successful
      $scope.resetForm(form);
      $scope.message = null;
      $scope.setCurrentUser(user);
      // notify the entire app with broadcast
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    }, function(message) {
      // signup failed
      //form.$setPristine();
      $scope.resetForm(form);
      $scope.message = message;
      // notify the entire app with broadcast
      $rootScope.$broadcast(AUTH_EVENTS.loginFailure);
    });

  };

}]);
