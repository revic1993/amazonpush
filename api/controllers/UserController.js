/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new : function(req,res,next){

		var name = req.param('user'),
		 		mobile = req.param('mobile'),
				gcm = req.param('gcm');

		if(!name || !mobile || isNaN(parseInt(mobile)) || mobile.length !=10 || !gcm)
			return Common.genericReturn(res,Common.returnError("Enter proper credentials"));

		 var user = {};

		 UserService.createNewUser(req.allParams())
		 						.then(function(value){
		 						    return Common.genericReturn(res,value);
		 						});
	}
};
