module.exports = {

  createNewUser : function(data){
  var groupList = [];
  return User.findOrCreate({mobile:data.mobile})
            .then(function(user){
                if(!user)
                  throw "User creation failed";
                user.name = data.name;

                if(!user.credentials)
                  user.credentials = {};

                user.credentials.gcm = data.gcm;
                return user.save();
            })
            .then(function(user){
                if(!user)
                  throw "User updation failed";
                  data.user = user;
                return Membership.find({user:user.mobile}).populate("group");
            })
            .then(function(members){
              if(members.length){
                while(members.length){
    							groupList.push(members.pop().group);
    						}
              }
              return AmazonService.createEndPoint(data.user.credentials.gcm);
            })
            .then(function(snsdata){
                if(!snsdata)
                  throw "Amazon service returned error";
                user = data.user;

                if(!user.credentials)
                  user.credentials = {};

                user.credentials.endpoint = snsdata.EndpointArn;
                return user.save();
            })
            .then(function(user){
              if(!user)
                throw "There was some error saving user";

              if(groupList.length){
                  return Common.returnOk("Operation successful",{user:data.user,groups:groupList,hasGroup:true});
              }else{
                  return Common.returnOk("Operation successful",{user:data.user,hasGroup:false});
              }
            })
            .catch(function(err){
                console.log(err);
                return Common.returnError(err);
            });
  }

}
