const passport = require("passport");
const google_auth_controller = {
  loginWithGoogle: passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),

  googleMiddleCallback: passport.authenticate("google", {
    failureRedirect: "/login/failed",
    session: false,
  }),
  googleCallback: (req, res) => {
    res.send(req.user);
  },
};

module.exports = google_auth_controller;
