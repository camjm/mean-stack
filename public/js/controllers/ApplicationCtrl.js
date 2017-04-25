/* Application Controller
 * Contains the global application logic.
 * Attached to the root node of the application so it controls the scope that is
 * accessible to the entire application (i.e. at the root of the scope tree).
 * Use this instead of $rootScope, which is only used for global eventing.
 */

angular.module('ApplicationCtrl', []).controller('ApplicationController', function($scope, USER_ROLES, AuthService) {

  // don't use these properties in controllers that inherit from this scope - reduces testability
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;

  $scope.currentUser = null;

  // setter function to circumvent creating a shadow property
  $scope.setCurrentUser = function(user) {
    $scope.currentUser = user;
  };

});
