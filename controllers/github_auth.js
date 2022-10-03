const passport = require("passport");
const github_auth_controller = {
  loginWithGithub: passport.authenticate("github", {
    scope: ["profile", "email"],
    session: false,
    successRedirect: "/",
  }),

  githubCallback: passport.authenticate("github", {
    successRedirect: process.env.clientBaseUrl,
    failureRedirect: "/login/failed",
    session: false,
  }),
};

module.exports = github_auth_controller;
