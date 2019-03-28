var UserProfile = (function() {
  var name = "";
  var id = 0;
  var email="";

  var getName = function() {
    return this.name;    // Or pull this from cookie/localStorage
  };

  var setName = function(name) {
    this.name = name;     
    // Also set this in cookie/localStorage
  };

  var getID = function() {
    return this.id;    // Or pull this from cookie/localStorage
  };

  var setID = function(id) {
    this.id = id;     
    // Also set this in cookie/localStorage
  };

  var getEmail = function() {
    return this.email;    // Or pull this from cookie/localStorage
  };

  var setEmail = function(email) {
    this.email = email;     
    // Also set this in cookie/localStorage
  };

  return {
    getName:getName,
    setName:setName,
    getID:getID,
    setID:setID,
    getEmail:getEmail,
    setEmail:setEmail
  }

})();

export default UserProfile;