module.exports.about = function(req, res){
	res.render('index', {title : 'About'});
};
module.exports.home = function(req, res){
	res.render('index', {title : 'Homepage'});
};