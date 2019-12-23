const mongoose = require('mongoose');

const {logger}=require('../Logger/logger_config');


require('dotenv').config();

/** Deprecation of mongoose */
const option = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}


/** Establishing the Mongoose connection */
mongoose.connect(process.env.mongooseURL, option);


/*** mongoose connected */
mongoose.connection.on('connected', () => {
  logger.addContext('name',"mohan");
  logger.info("Mongoose Connection Successful...");
});


/** Mongoose gets disconnected */
mongoose.connection.on('disconnected', () => {
  logger.warn("Mongoose disconnected.");
});


/** Error in mongoose connection */
mongoose.connection.on("error", () => {
  logger.error("Error in mongoose connection");
});


/** Unexpected shutdown of the mongoose */
process.on("SIGINT", function () {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
