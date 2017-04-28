// Contains calls to the Node API backend (using $http or $resource)

angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

  return {
    
    // call to GET all nerds
    get: function() {
      return $http.get('/api/nerds');
    },

    // call to POST and create a new nerd
    create: function(nerdData) {
      return $http.post('/api/nerds', nerdData);
    },

    // call to DELETE a nerd
    delete: function(id) {
      return $http.delete('/api/nerds/' + id);
    }
  }

}]);
