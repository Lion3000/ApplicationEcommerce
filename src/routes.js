/*==============================================================
Author : Alex Zarzitski
Date : 08/01/2018
==============================================================*/
module.exports = {
  start: function(app) {

    app.get('/', function(req, res){
        res.redirect('/login');
    });

    app.get('/login', function(req, res){
        res.render('login');
    });
	
    app.get('/signup', function(req, res){
        res.render('signup');
    });
	
	app.get('/home', function(req, res){
        res.render('home');
    });

    app.post('/signup', function (req, res) {
        res.send(req.param('email'));
    });


  }
}
