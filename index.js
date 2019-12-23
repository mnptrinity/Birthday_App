const express=require('express');
const routes=require('./routes/index');

/** Importing the Handlebars View library */
const handlebars=require('express-handlebars');


/** Including mongoose connection */
require('./database/connection');

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/***  we allow the app to use the routes in the ./routes/index file ***/
app.use('/',routes);

app.engine('handlebars',handlebars());
app.set('view engine','handlebars');


/**
 * Here we are exporting it to the variable app.
 */
module.exports=app;