const cors = require("cors");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth_routes");
const errorHanddler = require("./middlewares/error_haddler");
const app = express();
require("dotenv").config();
require("./services/passport");

//----------------------------- init ---------------------------------------
const port = process.env.port || 5000;
const db_url = process.env.MONGO_URI + "/trendRooms";
const appCors = cors({
  origin: [process.env.CLIENT_BASE_URL, "narayann.me"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
});

//----------------------------- configs ---------------------------------------
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());
app.use(appCors);

//----------------------------- testing ---------------------------------------

const JwtService = require("./services/jwt_service");

var myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

// app.use(myLogger);
app.get("/", (req, res) => {
  // res.redirect("/api/auth/google");

  res.send({
    message: "Hello World",
  });
});
app.get("/test", myLogger, (req, res) => {
  // res.redirect("/api/auth/google");
  // res.cookie("user", "test", {
  //   domain: "narayann.me",
  //   maxAge: 1000 * 60 * 60 * 24 * 7,
  // });
  res.send({
    message: "Hello World",
  });
});
//----------------------------- routes ---------------------------------------
app.use("/api/auth", authRoute);
//----------------------------- connections ------------------------------------

mongoose.connect(db_url, (err) => {
  if (err) throw err;
  console.log("MongoDB connected");
});
app.use(errorHanddler);
app.listen(port, () => {
  console.log(`Listening.... on port ${port}`);
});
