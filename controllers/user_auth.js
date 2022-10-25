const e = require("express");
const AppError = require("../models/error_model");
const User = require("../models/user_schema");
const JwtService = require("../services/jwt_service");

const createUserController = {
  createUser: async (req, res, next) => {
    try {
      var appUser = abstactUserDetails(req);
      if (appUser instanceof AppError) {
        return next(appUser);
      } else {
        //create user refresh token and access token
        var tokenData = {
          email: appUser.email,
          authId: appUser.authId,
          authType: appUser.authType,
        };
        var refreshToken = JwtService.generateRefreshToken(tokenData);
        var accessToken = JwtService.generateAccessToken(tokenData);
        var isLogin = true;

        // find user in db and update refresh token
        var user = await User.findOneAndUpdate(
          { email: appUser.email },
          { refreshToken }
        );
        if (!user) {
          //if user not found in db then create new user
          isLogin = false;
          var newUser = new User({
            name: appUser.name,
            email: appUser.email,
            authType: appUser.authType,
            authId: appUser.authId,
            displayPicture: appUser.displayPicture,
            refreshToken: refreshToken,
            bio: "",
          });
          var result = await newUser.save();
          if (!result) {
            return next(new AppError("User not created", 500));
          }
        }

        res.cookie("refreshToken", refreshToken, {
          maxAge: 1000 * 60 * 10,
          httpOnly: true,
          sameSite: "none",
        });

        var redirectUrl = `${
          process.env.CLIENT_BASE_URL
        }/auth?token=${accessToken}&authType=${isLogin ? "login" : "signup"}`;

        res.redirect(redirectUrl);
      }
    } catch (error) {
      return next(new AppError(error.message, 500));
    }
  },
};
function abstactUserDetails(req) {
  try {
    const appUser = {};
    appUser.name = req.user.displayName;
    appUser.email = req.user.emails[0].value;
    appUser.authType = req.user.provider;
    appUser.authId = req.user.id;
    appUser.displayPicture = getUrl(req);
    return appUser;
  } catch (error) {
    var appError = new AppError(error.message, 500);
    return appError;
  }
}
function getUrl(req) {
  if (req.user.photos.length > 0) {
    let url = "";
    if (req.user.provider === "google") {
      url = req.user.photos[0].value;
      url = url.substring(0, url.length - 6);
    } else if (req.user.provider === "github") {
      url = req.user.photos[0].value;
    } else if (req.user.provider === "linkedin") {
      url = req.user.photos[3].value;
    }
    return url;
  } else {
    return "";
  }
}
module.exports = createUserController;
