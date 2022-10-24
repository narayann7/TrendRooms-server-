const passport = require("passport");
const User = require("../models/user_schema");
const github_auth_controller = {
  loginWithGithub: passport.authenticate("github", {
    scope: ["profile", "email"],
    session: false,
  }),

  githubMiddleCallback: passport.authenticate("github", {
    failureRedirect: "/login/failed",
    session: false,
  }),

  githubCallback: (req, res) => {
    const appUser = {};
    appUser.name = req.user.displayName;
    appUser.email = req.user.emails[0].value;
    appUser.authType = "github";
    appUser.authId = req.user.id;
    if (req.user.photos.length > 0) {
      appUser.displayPicture = req.user.photos[0].value;
    } else {
      appUser.displayPicture = "";
    }
    res.json(appUser);
  },
};

module.exports = github_auth_controller;
