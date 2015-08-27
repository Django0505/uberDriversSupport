module.exports = function(){
    var bcrypt = require('bcrypt');
    var count = 0;
    var user = {};

    exist = false;

    //log user in or redirect
    this.login = function (req, res){
        if(req.session.user ){
            user.username = req.session.user;
            req.services(function(err, services){
          		var queriesDataServ = services.queriesDataServ;
              queriesDataServ.getQueries(function(err, rows){
                if(err)	throw err;
                  res.render( 'agentQueries', {
                      queries : rows,
                      user: req.session.user
                  });
              });
          });

        }
        else{
            res.render('agentLogin');
        }
    };

    //render error msg if info entered incorrectly
    this.loggedIn = function (req, res) {
        if(req.session.user ){
            user.username = req.session.user;
            req.services(function(err, services){
          		var queriesDataServ = services.queriesDataServ;
              queriesDataServ.getQueries(req.session.user.id, function(err, rows){
                if(err)	throw err;
                  res.render( 'agentQueries', {
                      queries : rows,
                      user: req.session.user
                  });
              });
          });

        }
        else if(lock == true){
           msg = "Your account has been locked";
            res.render('agentLogin', {
              msg:msg
            });
        }
        else{
          msg = "Incorrect username/password combination";
            res.render('agentLogin', {
              msg:msg
            });

        }

    };

    //signup function
    this.signUp = function (req, res){
      res.render('agentSignUp');
    };

    //logout function
    this.logout = function (req, res){
        var msg = "You have logged out";
        delete req.session.user;
        res.render('agentLogin',{
                    msg : msg
        });
    };

    //proceed to the next middleware component
    this.middleCheck = function(req, res, next){
      if(req.session.user){
          next();
      }
      else{
          res.redirect("/agent/login");
      }

    };

    this.adminCheck = function(req, res, next){
      if(req.session.user.role === "admin"){
          next();
      }
      else{
          res.redirect("/");
      }

    };

    //add user function
    this.addUser = function (req, res, next) {
      req.services(function(err, services){
        var agentDataService = services.agentDataService;
            agentDataService.getUsername(function(err, exists) {
                if (err) return next(err);

                var input = JSON.parse(JSON.stringify(req.body));

                var data = {
                    username : input.user,
                    password: input.pass
                };

                var password2 = input.pass2;

                if(data.username.trim() === "" || data.password.trim() === ""){
                    res.render( 'agentSignUp', {
                        msg : "Fields cannot be blank"
                    });
                    return;
                }
                else if( data.password != password2){
                    res.render( 'agentSignUp', {
                        msg : "Passwords do not match"
                    });
                    return;
                }
                else{
                    for (var x = 0; x < exists.length; x++){
                            if(data.username === exists[x].username){
                                 exist = true;
                            }
                            else{
                                exist = false;
                            }
                    }
                    if(exist === false){
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(input.pass, salt, function(err, hash) {
                                // Store hash in your password DB.
                                data.password = hash;
                                agentDataService.insertUser(data, function(err, results) {
                                    if (err)
                                        console.log("Error inserting : %s ",err );

                                    res.render('agentLogin', {msg:"Successfully signed up"});
                                });
                            });
                        });
                    }
                    else{
                        res.render( 'agentSignUp', {
                            msg: "Username already exists"
                        });
                        exist = false;
                    }
                }

            });
          });
    }

    //check if user exists in database
    this.checkUser = function (req, res, next) {
      req.services(function(err, services){
        var agentDataService = services.agentDataService;
                var input = JSON.parse(JSON.stringify(req.body));
                var data = {
                    username : input.user,
                    password: input.pass
                };
                agentDataService.checkUser([data.username], function(err, results) {
                    if (err) return next(err);
                 if(data.username.trim() === "" || data.password.trim() === ""){
                        msg = "Fields cannot be blank";
                         res.render('agentLogin', {
                                  msg:msg
                                });
                 }
                 else if (results.length === 0){
                   msg = "Username does not exist";
                    res.render('agentLogin', {
                             msg:msg
                           });
                 }
                //hash password to check against hashed password in database

                else if(results.length ==1){
                var user = results[0];


                    bcrypt.compare(data.password, user.password, function(err, pass){
                        if(pass == true){
                            count = 0;

                            req.session.user = {username: data.username,
                                                id : results[0].user_id};
                            req.services(function(err, services){
                          		var queriesDataServ = services.queriesDataServ;
                              queriesDataServ.getQueries(req.session.user.id, function(err, rows){
                                if(err)	throw err;
                                  res.render( 'agentQueries', {
                                      queries : rows,
                                      user: req.session.user
                                  });
                              });
                          });
                        }
                        else{
                          msg = "Incorrect Password";
                          res.render('agentLogin', {msg:msg});
                        }
                    });
                }
            });

    });
  }

    //shows list of users
    this.showUsers = function (req, res, next) {
      req.services(function(err, services){
        var agentDataService = services.agentDataService;
            agentDataService.showUsers(function(err, results) {
                if (err) return next(err);
                res.render( 'users', {
                    users : results,
                    user: req.session.user
                });
            });
    });
  };

    //update user roles  from admin page
    this.updateUserRole = function (req, res, next) {
      req.services(function(err, services){
        var agentDataService = services.agentDataService;
        var role = req.params.role;
        var username = req.params.username;

        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            role : input.role
        };
        agentDataService.updateUser([data, username], function(err, results) {
            if (err) return next(err);

            res.redirect('/users');
        });
    });
  };

    this.deleteUser = function (req, res, next) {
      req.services(function(err, services){
        var agentDataService = services.agentDataService;
        var username = req.params.username;
            var input = JSON.parse(JSON.stringify(req.body));
            agentDataService.deleteUser([username], function(err, results) {
                if (err) return next(err);
                res.redirect('/users');
            });
    });
  };
}
