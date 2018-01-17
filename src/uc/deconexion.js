/*==============================================================
Author : Alex Zarzitski
Date : 14/01/2018
Objet :  UcDeconexion
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);

var UcDeconexion = {

  //===================================================
  // Cette methode initialise le UcDeconexion
  //===================================================
  doIt: function(app) {
    app.get('/disconnection', UcDeconexion.closeSession);
  	app.post('/disconnection', UcDeconexion.closeSession);
  },

  //===================================================
  // Cette methode détruit la session et redirige vers la page d'acceuil
  //===================================================
  closeSession: function(req, res){
    req.session.destroy( console.log );
    res.redirect('/home');
  }

}

module.exports = UcDeconexion;
