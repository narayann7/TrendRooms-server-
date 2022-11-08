const cors = require("cors");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth_routes");
const userRoute = require("./routes/user_routes");
const errorHanddler = require("./middlewares/error_handler");
const app = express();
require("dotenv").config();
require("./services/passport");

//----------------------------- init ---------------------------------------

const port = process.env.PORT || 5000;
const db_url = process.env.MONGO_URI + "/trendRooms";
const appCors = cors({
  origin: [process.env.CLIENT_BASE_URL, "*"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
});

//----------------------------- configs ---------------------------------------

app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());
app.use(appCors);

//----------------------------- testing ---------------------------------------

var myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};
app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});
app.get("/test", myLogger, (req, res) => {
  res.send({
    message: "Hello World",
  });
});
//----------------------------- routes -----------------------------------------

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

//----------------------------- connections ------------------------------------

app.use(errorHanddler); //error handler

mongoose.connect(db_url, (err) => {
  if (err) throw err;
  console.log("MongoDB connected");
});

app.listen(port, () => {
  console.log(`Listening.... on port ${port}`);
});
