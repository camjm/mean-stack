// When the session expires, user needs to reenter credentials. Instead of redirecting,
// show a popup dialog, that listens to the appropriate events and opens itself.

angular.module('LoginDialog', []).directive('loginDialog', ['AUTH_EVENTS', function(AUTH_EVENTS) {

  return {
    restrict: 'A',
    // re-use existing login form and controller
    template: '<div ng-if="visible" ng-include="\'login-form.html\'">',
    link: function(scope) {
      var showDialog = function() {
        scope.visible = true;
      };
      scope.visible = false;
      scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
      scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
    }
  };

}]);
