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
		if (req.session.views) {
			req.session.views++;
			res.setHeader('Content-Type', 'text/html');
			res.write('<p>views: ' + req.session.views + '</p>');
			res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
			res.end();
		} 
		else {
			req.session.views = 1;
			res.end('welcome to the session demo. refresh!');
		}
        //res.render('home');
    });

    app.post('/signup', function (req, res) {
        res.send(req.param('email'));
    });


  }
}
