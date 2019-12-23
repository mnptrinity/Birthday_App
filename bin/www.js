
/**
 * ? Exporting the app from the index.js from the root.
 * ! In here we are using that app for listening and to run it on the port 3000
 */
const app = require('../index');

require('dotenv').config();



app.listen(process.env.PORT || 3000);