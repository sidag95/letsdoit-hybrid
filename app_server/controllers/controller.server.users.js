module.exports.login = function(req, res){
	res.render('index', {title : 'Login'});
};
module.exports.signup = function(req, res){
	res.render('index', {title : 'Signup'});
};