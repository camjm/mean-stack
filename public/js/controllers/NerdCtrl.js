angular.module('NerdCtrl', []).controller('NerdController', function($scope, Nerd) {

    $scope.tagline = 'Nothing beats a pocket protector!';

    $scope.formData = {};

    // when landing on the page get and show all the nerds
    Nerd.get()
      .success(function(data) {
        $scope.nerds = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data)
      });

    // submit the form to the API, then repopulate the list
    $scope.createNerd = function() {
      Nerd.create($scope.formData)
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
      Nerd.delete(id)
        .success(function(data){
          $scope.nerds = data;
          console.log(data);
        })
        .error(function(data){
          console.log('Error: ' + data)
        })
    };

});
