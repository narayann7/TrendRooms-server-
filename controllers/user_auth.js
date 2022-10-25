const AppError = require("../models/error_model");

const createUserController = {
  createUser: async (req, res) => {
    var appUser = abstactUserDetails(req);
    res.json(appUser);
    // find user in db
    // User.findOne({ email: appUser.email }, (err, user) => {});
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
    var appError = new AppErrorError(error.message, 500);
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
