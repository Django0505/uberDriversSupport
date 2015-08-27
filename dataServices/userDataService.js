module.exports = function (connection) {

  var getData = function(query, cb){
      connection.query( query, cb);
  };

  var insertData = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.getUsername = function (cb) {
      getData('SELECT username FROM driver', cb );
  };

  this.insertUser = function (data, cb) {
      insertData('INSERT INTO driver SET ?', data, cb );
  };

  this.checkUser = function (data, cb) {
      insertData('SELECT user_id, password FROM driver WHERE username = ?', data, cb );
  };

  this.updateUser = function (data, cb) {
      insertData('UPDATE driver SET ? WHERE username = ?', data, cb );
  };

  this.showUsers = function (cb) {
      getData('SELECT username FROM driver', cb );
  };

  this.deleteUser = function (data, cb) {
      insertData('DELETE FROM driver WHERE username = ?', data, cb );
  };

};
