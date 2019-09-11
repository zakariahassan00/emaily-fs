const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

// define the users model in mongoose
require("./models/User");

// connect mongoose to remote MongoDb
mongoose.connect(keys.mongoURI);

// create or initiate the App
const app = express();

// setup of the cookie session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// passport google strategy
require("./services/passport");

// google OAuth flow
require("./routes/authRoutes")(app);

// this port is defined in the deployment stage by Heroku for example but in the local machine (development Env)
// it will not work so we use regual port number like 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
