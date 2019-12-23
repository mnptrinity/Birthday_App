


const {userSchema} = require('../schema/index');
const {logger} = require('../Logger/logger_config');
const failed="User Doesn't have birthday today!";
const success="User have Birthday today";




/**
 * @function findUser
 * @description this function is not been called from the controller.
 */

userSchema.methods.findUser = function(){
  const today=new Date();
  const user_dob=this.dob;
  if(today.getMonth()===user_dob.getMonth())
    return failed;
    if(today.getDate()===user_dob.getMonth())
     return success;
    else
    return failed;

    };




  /**
   * @function findBirthday
   * @param {date} dob -this is the date that is been passed by the user.
   * @param {function} callback - this is the function that is been passed from the controller.
   * @inner 
   * @function demo
   * @param {object} person - this is the instane of single user that has been passed to @function demo for checking user's birthday.
   * @returns {function} - callback function is returned with arguments true/false and {user's having birthday}.
   * */  



userSchema.statics.findBirthday = function (dob, callback) {
  let values = [];
  const date_birth=new Date(dob);
    function demo(person) {
          if(person.dob.getMonth()=== date_birth.getMonth())
          if(person.dob.getDate()===date_birth.getDate())
            values.push(person); 
}
  this.find({}, function (err, user) {
    if (err) {
      logger.addContext('Error',err);
      logger.error('Error : Error in Findind the Users with Birthday!');
      callback(true, null);
      }
      user.forEach(demo);
      if(values.length === 0)
        return callback(true, null);
        return  callback(false,values);
  });
};




  








