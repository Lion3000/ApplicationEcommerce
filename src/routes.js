/*==============================================================
Author : Alex Zarzitski
Date : 08/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
var UcInscription = require(appRoot + '/src/uc/inscription');
var UcIdentification = require(appRoot + '/src/uc/identification');
var UcGererCategorie = require(appRoot + '/src/uc/gererCategories');
var co = require('co');

module.exports = {
  start: function(app) {

    app.get('/', function(req, res){
      res.redirect('/home');
    });

  	app.get('/home', function(req, res){
      var user = { isAdmin : false};
      if (typeof req.session.userId != 'undefined' && req.session.userId > 0){
        res.render('home', {user: user, userMenu: true});
      }
      else
        res.render('home', {user: user, userMenu: false});
    });

  	UcInscription.doIt(app);
  	UcIdentification.doIt(app);
  	UcGererCategorie.doIt(app);
  }
}
