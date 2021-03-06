const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

// ====> MODELS
require("./models/User");
require("./models/Survey");

// connect mongoose to remote MongoDb
mongoose.connect(keys.mongoURI);

// create or initiate the App
const app = express();

// on any post/put requests to any express server the data is not json
// so we have to parse it using body-parser middlware
app.use(bodyParser.json());

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

// ====> ROUTES
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

// ====> DEPLOYMENT SETTINGS
// deployment with react app settings
if (process.env.NODE_ENV === "production") {
  // express will serve up production assets like our main.js file, or main.css file!.
  app.use(express.static("client/build"));

  // express will serve index.html if it doesn`t recogize te route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// this port is defined in the deployment stage by Heroku for example but in the local machine (development Env)
// it will not work so we use regual port number like 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
