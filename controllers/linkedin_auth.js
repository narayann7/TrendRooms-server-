const passport = require("passport");
const userController = require("../controllers/user_auth");
const linkedin_auth_controller = {
  loginWithLinkedin: passport.authenticate("linkedin", {
    scope: ["r_emailaddress", "r_liteprofile"],
    session: false,
  }),

  linkedinMiddleCallback: passport.authenticate("linkedin", {
    failureRedirect: "/login/failed",
    session: false,
  }),

  linkedinCallback: userController.createUser,
};

module.exports = linkedin_auth_controller;
