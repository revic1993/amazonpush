var _ = require("underscore");
module.exports = {

  new:function(req,res,next){
         var params = req.allParams();

         if(!params.groupName || !params.name || params.mobile.length !=10)
           return Common.genericReturn(res,Common.returnError("Enter proper credentials"));


          User.findOne({mobile:params.mobile})
              .then(function(user){
                  if(!user)
                    throw "No such user exist";
                  
                  params.user = user;
                  return GroupService.newGroup(params);
              })
              .then(function(value){
                  if(value.error){
                    if(value.errorObj)
                      throw value.errorObj;
                    else
                      throw value.message;
                  }

                  return Common.genericReturn(res,value);
              })
              .catch(function(err){
                return Common.genericReturn(res,Common.returnError(err));
              });

    }
};
