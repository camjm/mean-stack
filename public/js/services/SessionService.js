// Singleton service to encapsulate the user's session information

angular.module('meanApp').service('Session', function() {

  this.create = function(sessionId, userId, userRole) {
    //TODO: change signature/properties to match backend data
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };

  this.destroy = function() {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  }

});
