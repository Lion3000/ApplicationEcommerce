/*==============================================================
Author : Alex Zarzitski
Date : 11/01/2018
Objet : UcInscription
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
var co = require('co');
var User = require(appRoot + "/src/entities/user.js");

var UcInscription = {

  doIt: function(app) {

    app.get('/signup', function(req, res){
      res.render('signup');
    });

    app.post('/signup', function (req, res) {
      var errors = [];
      var user = { nom : "", prenom : "", email : "", mdp : "", dateNaissance : "", adresse : "", complementAdresse : "", codePostal : "", isAdmin : false};
      UcInscription.getUserFromForm(req, user, errors);
      console.log("ICI<----------------->" + user );
      if(errors.length < 1)
        co(UcInscription.addNewUser(res, user, errors));
      else
        res.render('signup', {user : user, errors : errors});
    });

  },

  getUserFromForm: function(req, user, errors) {
    if(req.param('name') != "")
      user.nom = req.param('name');
    else
      errors.push("nom");

    if(req.param('surname') != "")
      user.prenom = req.param('surname');
    else
      errors.push("prenom");

    if(req.param('password') != "")
      user.mdp = req.param('password');
    else
      errors.push("mdp");

    if(req.param('birthday') != "")
      user.dateNaissance = req.param('birthday');
    else
      errors.push("dateNaissance");

    if(req.param('address') != "")
      user.adresse = req.param('address');
    else
      errors.push("adresse");

    if(req.param('address_supplement') != "")
      user.complementAdresse = req.param('address_supplement');
    else
      errors.push("complementAdresse");

    if(req.param('postal_code') != "")
      user.codePostal = req.param('postal_code');
    else
      errors.push("codePostal");
  },

  addNewUser: function * (res, user, errors) {
    var User = require(appRoot + "/src/entities/user.js");
    var userC = yield User.create(user);
    /*user.nom = "truc";
    user.save();
    var user2 = yield User.findById(user.id);
    console.log("ICI<----------------->" + user2.id );
    user2.destroy();*/

    if(errors.length < 1){
      req.session.idUser = userC.id;
      res.redirect('/home');
    }
    else
      res.render('signup', {user : user, errors : errors});

  }

}

module.exports = UcInscription;
