const passport = require("passport");
const userController = require("../controllers/user_auth");
const github_auth_controller = {
  loginWithGithub: passport.authenticate("github", {
    scope: ["profile", "email"],
    session: false,
  }),

  githubMiddleCallback: passport.authenticate("github", {
    failureRedirect: "/login/failed",
    session: false,
  }),

  githubCallback: (req, res, next) => {
    console.log("github callback");
    res.json(req.user);
  },
  // githubCallback: userController.createUser,
};

module.exports = github_auth_controller;
