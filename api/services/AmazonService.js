var creds = sails.config.constants,
    Amazon = require("aws-sdk"),
    AmazonSns = new Amazon.SNS(sails.config.constants.amazon);

module.exports = {
  createEndPoint : function(token){
    var params = {
      PlatformApplicationArn : creds.PlatformArn,
      Token : token,
    }
    return AmazonSns.createPlatformEndpoint().promise();
  }
};
