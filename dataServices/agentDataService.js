module.exports = function (connection) {

  var getData = function(query, cb){
      connection.query( query, cb);
  };

  var insertData = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.getUsername = function (cb) {
      getData('SELECT username FROM agent', cb );
  };

  this.insertUser = function (data, cb) {
      insertData('INSERT INTO agent SET ?', data, cb );
  };

  this.checkUser = function (data, cb) {
      insertData('SELECT agent_id, password FROM agent WHERE username = ?', data, cb );
  };

  this.updateUser = function (data, cb) {
      insertData('UPDATE agent SET ? WHERE username = ?', data, cb );
  };

  this.showUsers = function (cb) {
      getData('SELECT username FROM agent', cb );
  };

  this.deleteUser = function (data, cb) {
      insertData('DELETE FROM agent WHERE username = ?', data, cb );
  };

};
