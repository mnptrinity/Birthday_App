

const {User} = require('../schema/index');
/**
 * importing the logger congif  file
 */

 const {logger}=require('../Logger/logger_config');


 const failed="User Doesn't have birthday today!";
 const success="User have Birthday today";

/**
 * this function is used to create the new user.
 * @name CreateUser
 * @function
 * @param {object} req - This will contains the values that are passed from the form.
 * @param {object} res - This is the argument it is used to return the result from this method.
 * @returns {object} - The res will return the webpage with the result for rendering.
 */


module.exports.CreateUser = (req, res) => {
  const user = new User(req.body);
  user.save((err, data) => {
    if (err)
    {
      logger.error("Error In Insertion : ",err);
      return res
        .status(406)
        .render('form', { message: err.message })
    }
    else{
      logger.info("User created : ",data);
    return res
      .status(201)
      .render('saved', { message: data });
    }
  });
}



/**
 * this function is used to check whether the user has birthday at that date or not.
 * @name findByEmail
 * @function
 * @param {date}  - The date is passed as an argument to this function
 * @param {object} - This will return and render the webpage with the result.
 * @returns {object} - The object will contain's the status and the render.
 */



module.exports.findByEmail = (req, res) => {
  let value = failed;
  User.findOne({ email: req.body.email })
    .then(response => {
      const today = new Date();
      const user_dob = new Date(response.dob);
      if (today.getMonth() == user_dob.getMonth()) {
        if (today.getDate() === user_dob.getDate())
          value = success;
        else
          value = failed;
      }
      logger.info("Finding single user birthday : ", response, {Result : value});
      return res
        .status(200)
        // .json({result:value})
        .render('home', { home_active: "active", result: value });
    })
    .catch(err => {
      logger.warn("Error in finding user : ", err,{Result:"User Not Found"} );
      return res
        .status(200)
        // .json({result:"User Not found!"})
        .render('home', { noresults: "User Not found!", home_active: "active" });
    });
}



/**
 * This function is to list the user's having birthday at the date the end user have choosen.
 * @name findbirthday
 * @function
 * @param {object} req - the choosen date by the end user.
 * @param {object} res - this is the object that is used for returning the results.
 * @inner
 * @function findBirthday
 * @description this function will take the entire users in the collections and it will return the list od users those who are having the birthday at the choosen date.
 * @param {date} req.body.dob
 * @param {function} (err,data) - this is the result from the function findBirthday && err if not user found and in data the list of user having birthday.
 * @returns {object} - this will render the result to the view.
 */

module.exports.findbirthday = (req, res) => {
  logger.info('User checking for the data : ', req.body);
  User.findBirthday(req.body.dob, (err, data) => {
    if (err) {
      logger.addContext('error',err);
      logger.error('Error in finding list of user : ');
      return res
        .render('findbirthday', { find_birthday: "active", noresults: "No User's have Birthday Today " });
    }
    logger.addContext('Data',data);
    logger.info('Users having birthday at ' + req.body.dob + " are : ", data);
    return res
      .status(200)
      .render('findbirthday', { result: data, find_birthday: "active" });
  });
}
