/**
* Group.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema:true,
  attributes: {
  		name: {
  			type:"string",
  			required:true,
        unique:true,
  		},
  		created_by:{
  			type:"string",
  			required:true
  		},
  		chats:{
  			type:"array"
  		},
  		users:{
  			collection:"Membership",
  			via:"group",           
  		},
      toJSON:function(){
        var obj = this.toObject();
        delete obj.createdAt;
        delete obj.updatedAt;
        return obj;
      }
  }
};

