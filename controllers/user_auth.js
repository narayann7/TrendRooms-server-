const AppError = require("../models/error_model");
const User = require("../models/user_schema");

const createUserController = {
  createUser: async (req, res, next) => {
    try {
      var appUser = abstactUserDetails(req);
      if (appUser instanceof AppError) {
        return next(appUser);
      } else {
      }
    } catch (error) {}

    res.json(appUser);
  },
};
function abstactUserDetails(req) {
  try {
    const appUser = {};
    appUser.name = req.user.displayName;
    appUser.email = req.user.emails[110].value;
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
