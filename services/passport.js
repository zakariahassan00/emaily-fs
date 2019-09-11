const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

// fetch the user model from mongoose
const User = mongoose.model("users");

// serialize user : convert the user id into cookie and attach it in the response
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// desrialize user : convert the id back into model instance.
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // the action after users permission

      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // if we found the record we do nothing
          // tell passport that we are done
          done(null, existingUser);
        } else {
          // if we didn`t found the record register it

          // note: when create new model instance this is ASYNC operation so me make sure it done
          // before we call done
          new User({
            googleId: profile.id
          })
            .save()
            .then(newUser => done(null, newUser));
        }
      });
    }
  )
);
