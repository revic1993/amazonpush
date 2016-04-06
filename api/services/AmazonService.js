var creds = sails.config.constants,
    Amazon = require("aws-sdk");

Amazon.config.setPromisesDependency(require('sails/node_modules/waterline/node_modules/bluebird'));
var AmazonSns = new Amazon.SNS(sails.config.constants.amazon);

var self = module.exports = {
  createEndPoint : function(token){
    var params = {
      PlatformApplicationArn : creds.PlatformArn,
      Token : token,
    }
    return AmazonSns.createPlatformEndpoint(params).promise();
  },

  createTopic : function(name){
    return AmazonSns.createTopic({Name:name}).promise();

  },

  createSubscription : function(topicArn,endpoint){
    return AmazonSns.subscribe({Protocol: 'application',TopicArn: topicArn,Endpoint: endpoint}).promise();
  }
};
