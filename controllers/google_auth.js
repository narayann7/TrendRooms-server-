const passport = require("passport");
const google_auth_controller = {
  loginWithGoogle: passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),

  googleCallback: passport.authenticate("google", {
    successRedirect: process.env.clientBaseUrl,
    failureRedirect: "/login/failed",
    session: false,
  }),
};

module.exports = google_auth_controller;
