/*==============================================================
Author : Alex Zarzitski
Date : 11/01/2018
Objet : UcInscription
==============================================================*/
module.exports = {
	
  doIt: function * (app) {

    app.get('/signup', function(req, res){
		var User = require("./src/entities/user.js");
		var user = yield User.create({ nom : "test", prenom:"test"});
		user.nom = "truc";
		user.save();
		
		user2 = yield User.findById(user.id);
		console.log("ICI<-------------------------------------------->" + user.id + " " + user2.id);
		
		user2.destroy();
        res.render('signup');
    });

    app.post('/signup', function (req, res) {
        res.send(req.param('email'));
    });


  }
  
  
}
