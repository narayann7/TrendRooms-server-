const passport = require("passport");
const userController = require("../controllers/user_auth");
const google_auth_controller = {
  loginWithGoogle: passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),

  googleMiddleCallback: passport.authenticate("google", {
    failureRedirect: "/login/failed",
    session: false,
  }),

  googleCallback: userController.createUser,
};

module.exports = google_auth_controller;
