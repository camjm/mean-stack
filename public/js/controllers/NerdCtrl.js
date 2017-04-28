angular.module('NerdCtrl', []).controller('NerdController', function($scope, Nerd) {

    $scope.tagline = 'Nothing beats a pocket protector!';

    $scope.formData = {};

    // when landing on the page get and show all the nerds
    Nerd.get()
      .then(function(response) {
        // on success
        $scope.nerds = response.data;
        console.log(response);
      }, function(response) {
        // handle errors produced by $http
        console.log('Error: ' + response)
      })
      .catch(function(response) {
        // handle errors occuring in the functions passed into .then()
        console.log('Error: ' + response)
      });

    // submit the form to the API, then repopulate the list
    $scope.createNerd = function() {
      Nerd.create($scope.formData)
        .then(function(response) {
          // on success
          $scope.formData = {}; // clear the form
          $scope.nerds = response.data;
          console.log(response);
        }, function(response) {
          // handle errors produced by $http
          console.log('Error: ' + response);
        })
        .catch(function(response) {
          // handle errors occuring in the functions passed into .then()
          console.log('Error: ' + response);
        });
    };

    // delete the nerd, then repopulate the list
    $scope.deleteNerd = function(id) {
      Nerd.delete(id)
        .then(function(response){
          // on success
          $scope.nerds = response.data;
          console.log(response);
        }, function(response) {
          // handle errors produced by $http
          console.log('Error: ' + response)
        })
        .catch(function(response){
          // handle errors occuring in the functions passed into .then()
          console.log('Error: ' + response)
        })
    };

});
