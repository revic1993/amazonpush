module.exports = {
	schema:true,
	attributes:{
		user:{
			model:'User'
		},
		group:{
			model:'Group'
		},
		toJSON:function(){
		  var obj = this.toObject();
		  delete obj.createdAt;
		  delete obj.updatedAt;
		  return obj;
		}
	}
}