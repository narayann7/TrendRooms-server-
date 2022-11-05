const jwt = require("jsonwebtoken");
const AppError = require("./../models/error_model");

class JWTservice {
  //GENERATE ACCESS TOKEN
  static generateAccessToken(user) {
    //expires in 10 minutes
    var token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });
    return token;
  }
  //GENERATE REFRESH TOKEN
  static generateRefreshToken(user) {
    var token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1y",
    });
    return token;
  }

  //VERIFY TOKEN
  static verifyToken(token, type) {
    //type = access or refresh
    return jwt.verify(
      token,
      type === "access"
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          return new AppError(err.message, 401);
        } else {
          return payload;
        }
      }
    );
  }
}

module.exports = JWTservice;
