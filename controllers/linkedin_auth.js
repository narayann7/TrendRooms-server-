const passport = require("passport");
const linkedin_auth_controller = {
  loginWithLinkedin: passport.authenticate("linkedin", {
    scope: ["r_emailaddress", "r_liteprofile"],
    session: false,
  }),

  linkedinMiddleCallback: passport.authenticate("linkedin", {
    failureRedirect: "/login/failed",
    session: false,
  }),
  linkedinCallback: (req, res) => {
    res.send(req.user);
  },
};

module.exports = linkedin_auth_controller;
