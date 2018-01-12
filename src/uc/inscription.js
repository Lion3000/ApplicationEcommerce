/*==============================================================
Author : Alex Zarzitski
Date : 11/01/2018
Objet : UcInscription
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
var co = require('co');
var User = require(appRoot + "/src/entities/user.js");
module.exports = {

  doIt: function(app) {

    app.get('/signup', function(req, res){
      co(function * () {
        var User = require(appRoot + "/src/entities/user.js");
        res.render('signup');
        var user = yield User.create({ nom : "test", prenom:"test"});
        user.nom = "truc";
        user.save();
        var user2 = yield User.findById(user.id);
        console.log("ICI<----------------->" + user2.id );
        user2.destroy();
      });
    });

    app.post('/signup', function (req, res) {
        res.send(req.param('email'));
    });

  },

  test: function * () {
    var User = require(appRoot + "/src/entities/user.js");
    res.render('signup');
    var user = yield User.create({ nom : "test", prenom:"test"});
    user.nom = "truc";
    user.save();
    var user2 = yield User.findById(user.id);
    console.log("ICI<----------------->" + user2.id );
    /*user2.destroy();*/
  }

}
