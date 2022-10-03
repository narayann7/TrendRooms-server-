const passport = require("passport");
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
    res.send(req.user);
  },
};

module.exports = github_auth_controller;
