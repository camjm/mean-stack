// Simulates validating username against backend API

angular.module('meanApp').directive('username', ['$q', '$timeout', function($q, $timeout) {

  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      var usernames = ['Cam', 'Jenny', 'Pixel'];
      ctrl.$asyncValidators.username = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          return $q.resolve();
        }
        var def = $q.defer();
        $timeout(function(){
          if (usernames.indexOf(modelValue) === -1) {
            def.resolve();
          } else {
            def.reject();
          }
        }, 2000);
        return def.promise;
      };
    }
  };

}]);
