exports.newGroup = function(data){
  var groupExist = false,holder={};
  return Group.findOrCreate({name:data.groupName,created_by:data.name})
              .then(function(group){
                  holder = group;
                  if(group.topicArn){
                    return {TopicArn:group.topicArn};
                  }else{
                    return AmazonService.createTopic(group.name);
                  }
              })
              .then(function(snsresponse){
                  if(holder.topicArn){
                      return holder;
                  }else{
                    holder.topicArn = snsresponse.TopicArn;
                    return holder.save();
                  }
              })
              .then(function(group){
                  data.group = group;
                  return AmazonService.createSubscription(group.topicArn,data.user.credentials.endpoint);
              })
              .then(function(snsresponse){
                  return Membership.create({user:data.user.id,group:data.group.id,subscriptionArn:snsresponse.SubscriptionArn});
              })
              .then(function(members){
                return Common.returnOk("Operation successfully completed",{group:data.group});
              })
              .catch(function(err){
                console.log(err);
                return Common.returnError(err);
              });
};
