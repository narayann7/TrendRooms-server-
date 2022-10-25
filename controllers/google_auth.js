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

  // (req, res) => {
  //   // createUser(appUser);

  //   // res.cookie("user", base64User, {
  //   //   maxAge: 1000 * 60 * 60 * 24 * 7,
  //   //   httpOnly: true,
  //   //   sameSite: "none",
  //   // });
  //   var result = abstactUserDetails(req);

  //   // if (result instanceof AppError) {
  //   //   res.json({
  //   //     error: result.message,
  //   //   });
  //   // } else {
  //   //   res.json(req.user);
  //   // } // res.redirect(`${process.env.CLIENT_BASE_URL}/auth?token=hello`);
  // },
};

function createUser(req, res) {}

module.exports = google_auth_controller;
