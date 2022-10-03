const router = require("express").Router();
require("../services/passport");
const google_auth_controller = require("../controllers/google_auth");
const github_auth_controller = require("../controllers/github_auth");
const linkedin_auth_controller = require("../controllers/linkedin_auth");

// Google OAuth
router.get("/google", google_auth_controller.loginWithGoogle);
router.get("/google/callback", google_auth_controller.googleCallback);

//Github OAuth
router.get("/github", github_auth_controller.loginWithGithub);
router.get("/github/callback", github_auth_controller.githubCallback);

//LinkedIn OAuth
router.get("/linkedin", linkedin_auth_controller.loginWithLinkedin);
router.get("/linkedin/callback", linkedin_auth_controller.linkedinCallback);

module.exports = router;
