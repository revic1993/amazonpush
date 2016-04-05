var _ = require("underscore"),
		resType = sails.config.constants.RESPONSE_TYPE;
module.exports = {
	returnError: function(errorMsg){
    if(!_.isString(errorMsg))
      return {"error":true,"message":"There was error on server","errObj":errorMsg};

    return {"error":true,"message":errorMsg};
  },
  returnOk: function(message,data){
    if(!data)
      return {"error":false,"message":message};

    return {"error":false,"message":message,"data":data};
  },
  genericReturn : function(res,value){
    if(value.error)
      return res.customResponse(resType.BAD_REQUEST,value);

    return res.customResponse(resType.OK,value);
  }
}
