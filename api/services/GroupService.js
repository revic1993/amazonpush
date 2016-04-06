var _this = this;

exports.newGroup = function(data){
  return Group.find({name:data.groupName})
              .then(function(group){
                  if(!group)
                  else
                    return _this.createGroup(data);
                    return group;
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
                console.log("this is from find");
                console.log(err);
                return Common.returnError(err);
              });
};

exports.createGroup = function(data){
  var holder = {};

  return Group.create({name:data.groupName,created_by:data.name})
              .then(function(group){
                    holder = group;
                    console.log(group);
                    return AmazonService.createTopic(group.name);
              })
              .then(function(snsresponse){
                  holder.topicArn = snsresponse.TopicArn;
                  return holder.save();
              })
              .catch(function(err){
                  console.log("this is from create");
                  console.log(err);
                  return err;
              });
};


//
// module.exports = {
//     newGroup : newGroup,
// };
