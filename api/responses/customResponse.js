
module.exports = function(type,data){
  var res = this.res;
  var res_type = sails.config.constants.RESPONSE_TYPE;

  switch (type) {
    case res_type.BAD_REQUEST: res.status(400);
                               break;
    case res_type.FORBIDDEN: res.status(403);
                             break;
    case res_type.OK : res.status(200);
                       break;
    default:res.status(400);
  }

  return res.jsonx(data);
}
