const User = require("../models/user_schema");
const AppError = require("./../models/error_model");
const JwtService = require("./../services/jwt_service");

const authHandler = async (req, res, next) => {
  try {
    var accessToken = req.headers.session;

    if (!accessToken) {
      return next(
        new AppError("Access token not found", {
          errorFrom: "authHandler",
          statusCode: 401,
        })
      );
    } else {
      //split token from bearer
      accessToken = accessToken.split(" ")[1];

      //verify access token
      var result = JwtService.verifyToken(accessToken, "access");

      //if access token is not valid then check refresh token
      var _refreshToken = req.headers.authorization;
      _refreshToken = _refreshToken.split(" ")[1];

      if (result instanceof AppError) {
        if (result.message === "jwt expired") {
          //if access token is expired then check refresh token in header
          if (!_refreshToken) {
            //if refresh token not found in header then send error
            return next(
              new AppError("Refresh token not found", {
                errorFrom: "authHandler",
                statusCode: 401,
              })
            );
          } else {
            //if refresh token found in header then verify refresh token
            var result = JwtService.verifyToken(_refreshToken, "refresh");
            if (result instanceof AppError) {
              //if refresh token is not valid then send error
              return next(
                new AppError("Invalid refresh token", {
                  errorFrom: "authHandler",
                  statusCode: 401,
                })
              );
            } else {
              //if refresh token is valid then find user in db
              var user = await User.findOne({ email: result.email });

              if (!user) {
                //if user not found in db then send error
                console.log("user not found");
                return next(
                  new AppError("User not found", {
                    errorFrom: "authHandler",
                    statusCode: 401,
                  })
                );
              } else {
                //check if refresh token in db is same as refresh token in header
                var { refreshToken, email, authId, authType } = user;
                if (refreshToken === _refreshToken) {
                  console.log("refresh token matched");
                  //if refresh token in db is same as refresh token
                  //in header then generate new access token and send it in
                  var tokenData = {
                    email,
                    authId,
                    authType,
                  };
                  var newAccessToken =
                    JwtService.generateAccessToken(tokenData);

                  res.user = tokenData;
                  res.accessToken = newAccessToken;

                  console.log("\nnewAccessToken------------\n", newAccessToken);
                }
              }
            }
          }
        } else {
          return next(result);
        }
      } else {
        console.log("\naccessToken-------------\n", accessToken);
        res.user = result;
      }
    }
  } catch (error) {
    return next(
      new AppError(error.message, {
        errorFrom: "authHandler",
        statusCode: 500,
      })
    );
  }

  return next();
};
module.exports = authHandler;
