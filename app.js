var express = require('express'),
    exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    session = require('express-session'),
    myConnection = require('express-myconnection'),

    ConnectionProvider = require('./routes/connectionProvider'),
    UserDataService = require('./dataServices/userDataService'),
    UserMethods = require('./routes/userMethods'),
    queriesMethods = require('./routes/queriesMethods'),
    queriesDataService = require('./dataServices/queriesDataService')

var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'tarcode',
      password: 'coder123',
      port: 3306,
      database: 'uberDriverSupport'
};

var serviceSetupCallback = function(connection){
	return {
		    queriesDataServ : new queriesDataService(connection),
    		userDataService : new UserDataService(connection)
	}
};

var myConnectionProvider = new ConnectionProvider(dbOptions, serviceSetupCallback);
app.use(myConnectionProvider.setupProvider);

app.use(myConnection(mysql, dbOptions, 'pool'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: "shithead", cookie: {maxAge: 1000000}, resave:true, saveUninitialized: false}));

var userMethods = new UserMethods();
app.get('/', userMethods.login);
app.get('/', userMethods.loggedIn);
app.get('/signUp', userMethods.signUp);
app.post('/signUp', userMethods.addUser);
app.post('/login', userMethods.checkUser);
app.get('/logout', userMethods.logout);

//middleware user check
app.use(userMethods.middleCheck);

app.get('/users',userMethods.adminCheck, userMethods.showUsers);
app.post('/updateUserRole/:username',userMethods.adminCheck, userMethods.updateUserRole);
app.post('/users/deleteUser/:username',userMethods.adminCheck, userMethods.deleteUser);

var queriesMethods = new queriesMethods();
app.get('/queries',userMethods.middleCheck, queriesMethods.showQueries);
app.get('/queries/new',userMethods.middleCheck, queriesMethods.showAddQuery);
app.get('/queries/view/:query_id',userMethods.middleCheck, queriesMethods.showQuery);

app.get('/queries/search/:searchValue',userMethods.middleCheck, queriesMethods.getSearchqueries);
app.get('/queries/profit',userMethods.middleCheck, queriesMethods.showCatProfit);
app.get('/queries/add',userMethods.adminCheck, queriesMethods.showAddQuery);
app.post('/queries/add',userMethods.adminCheck, queriesMethods.addCat);
app.get('/queries/delCat/:cat_id',userMethods.adminCheck, queriesMethods.delCat);
app.post('/queries/updateCat/:cat_id',userMethods.adminCheck, queriesMethods.updateCat);

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Nelisa app listening at http://%s:%s', host, port);

});
