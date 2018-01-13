/*==============================================================
Author : Alex Zarzitski
Date : 08/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
var UcInscription = require(appRoot + '/src/uc/inscription');
var co = require('co');

module.exports = {
  start: function(app) {

    app.get('/', function(req, res){
      res.redirect('/login');
    });

    app.get('/login', function(req, res){
      var errors = [];
      res.render('login', {errors : errors, userMenu: false});
    });

  	app.get('/home', function(req, res){
        res.render('home', {userMenu: false});
  	    console.log(req.session.userId);
    });

  	UcInscription.doIt(app);

  }
}
