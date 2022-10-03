const passport = require("passport");
const linkedin_auth_controller = {
  loginWithLinkedin: passport.authenticate("linkedin", {
    scope: ["r_emailaddress", "r_liteprofile"],
    session: false,
  }),

  linkedinCallback: passport.authenticate("linkedin", {
    successRedirect: process.env.clientBaseUrl,
    failureRedirect: "/login/failed",
    session: false,
  }),
};

module.exports = linkedin_auth_controller;
