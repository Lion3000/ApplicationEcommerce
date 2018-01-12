/*==============================================================
Author : Alex Zarzitski
Date : 11/01/2018
Objet : UcInscription
==============================================================*/
var User = require("./../entities/user.js");
module.exports = {

  doIt: function * (app) {
	/*var user = yield User.create({ nom : "test", prenom:"test"});
	user.nom = "truc";
	user.save();
	user2 = yield User.findById(user.id);*/
	console.log("ICI<-------------------------------------------->" + __dirname );

	/*user2.destroy();*/

    app.get('/signup', function(req, res){
			res.render('signup');
    });

    app.post('/signup', function (req, res) {
        res.send(req.param('email'));
    });


  }


}
