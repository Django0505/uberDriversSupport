module.exports = function(){
    this.showQueries = function (req, res, next) {
      req.services(function(err, services){
    		var queriesDataServ = services.queriesDataServ;
        queriesDataServ.getAllQueries(req.session.user.id, function(err, rows){
          if(err)	throw err;
            res.render( 'queries', {
                queries : rows,
                user: req.session.user
            });
        });
    });
    };

    this.showAddQuery = function (req, res, next) {
        res.render('newQuery', {
            user: req.session.user
        });
    };
    this.showQuery = function (req, res, next) {
      req.services(function(err, services){
    		var queriesDataServ = services.queriesDataServ;
        var query_id = req.params.query_id;
        queriesDataServ.getAllQueries(query_id, function(err, rows){
          if(err)	throw err;
            res.render( 'query', {
                queries : rows,
                user: req.session.user
            });
        });
    });
    };
    this.addCat = function (req, res, next) {
      req.services(function(err, services){
    		var queriesDataServ = services.queriesDataServ;
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            cat_name : input.cat_name
        };

        if(data.cat_name.trim() === "" ){
            res.render( 'addqueries', {
                error : "queries cannot be blank"
            });
        }
        else{
          queriesDataServ.insertqueries(data, function(err, rows){
            if(err)	throw err;
            res.redirect('/queries');
          });
        }
    });
  };

    this.getUpdateCat = function (req, res, next) {
      req.services(function(err, services){
    		var queriesDataServ = services.queriesDataServ;
        var cat_id = req.params.cat_id;
        var data = [cat_id];
        queriesDataServ.getUpdatequeries(data, function(err, results) {
            if (err) return next(err);
            res.render( 'updateCat', {
                queries : results,
                user: req.session.user,
                admin:admin
            });
        });
    });
  };

    this.updateCat = function (req, res, next) {
      req.services(function(err, services){
    		var queriesDataServ = services.queriesDataServ;
        var cat_id = req.params.cat_id;
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            cat_name : input.cat_name
        };
        queriesDataServ.updatequeries([data, cat_id], function(err, results) {
              if (err) return next(err);
              res.redirect('/queries');
        });
    });
  };

    this.delCat = function (req, res, next) {
      req.services(function(err, services){
    		var queriesDataServ = services.queriesDataServ;
        var cat_id = req.params.cat_id;
        queriesDataServ.deletequeries([cat_id], function(err, results) {
              if (err) return next(err);
              res.redirect('/queries');
        });
    });
  };

    this.showCatPopularity = function (req, res, next) {
      req.services(function(err, services){
    		var queriesDataServ = services.queriesDataServ;
        queriesDataServ.popularqueries(function(err, results) {
            if (err) return next(err);
            res.render( 'catPopularity', {
                catPopularity : results,
                user: req.session.user,
                admin:admin
            });
        });
    });
  };

    this.showCatProfit = function (req, res, next) {
      req.services(function(err, services){
    		var queriesDataServ = services.queriesDataServ;
        queriesDataServ.profitsPerqueries(function(err, results) {
            if (err) return next(err);
            res.render( 'catProfit', {
                catProfit : results,
                user: req.session.user,
                admin:admin
            });
        });
    });
  };

    this.getSearchqueries = function(req, res, next){
      req.services(function(err, services){
    		var queriesDataServ = services.queriesDataServ;
        var searchValue = req.params.searchValue;
        searchValue = "%" + searchValue + "%";
        queriesDataServ.searchqueries([searchValue], function(err, results){
            if (err) return next(err);
            res.render('queries_list', {
                admin: admin,
                user: req.session.user,
                categories : results,
                layout : false
            });
        });
    });
  };
}
