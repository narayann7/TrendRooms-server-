const passport = require("passport");
const User = require("../models/user_schema");
const google_auth_controller = {
  loginWithGoogle: passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),

  googleMiddleCallback: passport.authenticate("google", {
    failureRedirect: "/login/failed",
    session: false,
  }),
  googleCallback: (req, res) => {
    const appUser = {};
    appUser.name = req.user.displayName;
    appUser.email = req.user.emails[0].value;
    appUser.authType = "google";
    appUser.authId = req.user.id;
    let url = req.user.photos[0].value;
    url = url.substring(0, url.length - 6);
    appUser.displayPicture = url;
    createUser(appUser);
    res.json(appUser);
  },
};

function createUser(appUser) {
  //find user in db
  User.findOne({ email: appUser.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        console.log("user already exists");
      } else {
        //create user
        const newUser = new User({
          name: appUser.name,
          email: appUser.email,
          authType: appUser.authType,
          authId: appUser.authId,
          displayPicture: appUser.displayPicture,
          refreshToken: "",
          bio: "",
        });
        newUser.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("user created");
          }
        });
      }
    }
  });
}

module.exports = google_auth_controller;
