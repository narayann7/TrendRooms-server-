const passport = require("passport");
const User = require("../models/user_schema");
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
    const appUser = {};
    appUser.name = req.user.displayName;
    appUser.email = req.user.emails[0].value;
    appUser.authType = "linkedin";
    appUser.authId = req.user.id;
    if (req.user.photos.length > 0) {
      appUser.displayPicture = req.user.photos[0].value;
    } else {
      appUser.displayPicture = "";
    }

    res.json(appUser);
  },
};

module.exports = linkedin_auth_controller;
