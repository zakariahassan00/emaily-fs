const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["email", "profile"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  // logging out of the application
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // testing the google OAuth application
  app.get("/api/cu", (req, res) => {
    res.send(req.user);
  });
};
