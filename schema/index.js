const mongoose=require('mongoose');

const Unique_validator=require('mongoose-unique-validator');


const Schema=mongoose.Schema;


const userSchema=new Schema({
  email:{
    type:String,
    unique:true,
    required:true,
    index:true
  },
  dob:{
    type:Date,
    required:true
  },
  created_At:{
    type:Date,
    default:Date.now
  }
});

/**
 * ? Applying the unique validator for the UserSchema
 */
userSchema.plugin(Unique_validator);

module.exports.userSchema=userSchema;

require('../methods/index');


const User=mongoose.model('user',userSchema);


module.exports.User=User;



/**
 * ! index:true
 * ? what this will do is it will index the email of all the users --> it is an user-defined indexing
 */
