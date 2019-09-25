const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["email", "profile"]
    })
  );

  // we got the code we grap the data from google then get redirected back to the React app
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  // logging out of the application and redirect back to React App
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // testing the google OAuth application
  app.get("/api/cu", (req, res) => {
    res.send(req.user);
  });
};
