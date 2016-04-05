module.exports = function(req,res,next){
	var token = "Oz32z2iXO82k7YNos9Fb",
	checkToken = req.allParams();
	console.log(checkToken);

	if(checkToken.token !== token)
		return res.forbidden({"error":true,"message":"You are not allowed to access this URL"});

	return next();
}
