angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

    $scope.tagline = 'Nothing beats a pocket protector!';

    $scope.formData = {};

    // when landing on the page get and show all the nerds
    $http.get('/api/nerds')
      .success(function(data) {
        $scope.nerds = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data)
      });

      // submit the form to the API, then repopulate the list
      $scope.createNerd = function() {
        $http.post('/api/nerds', $scope.formData)
          .success(function(data) {
            // clear the form
            $scope.formData = {};
            $scope.nerds = data;
            console.log(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };

      // delete the nerd, then repopulate the list
      $scope.deleteNerd = function(id) {
        $http.delete('/api/nerds/' + id)
          .success(function(data){
            $scope.nerds = data;
            console.log(data);
          })
          .error(function(data){
            console.log('Error: ' + data)
          })
      };

});
