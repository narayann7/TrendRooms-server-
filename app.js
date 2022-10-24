const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth_routes");
const port = process.env.port || 5000;
const db_url = process.env.MONGO_URI + "/trendRooms";

require("dotenv").config();
require("./services/passport");

//----------------------------- configs ---------------------------------------
app.use(passport.initialize());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

//----------------------------- testing ---------------------------------------

var myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

// app.use(myLogger);

//----------------------------- routes ---------------------------------------
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  // res.redirect("/api/auth/google");

  res.send({
    message: "Hello World",
  });
});
app.get("/test", myLogger, (req, res) => {
  // res.redirect("/api/auth/google");

  res.send({
    message: "Hello test",
  });
});

//----------------------------- connections ------------------------------------

mongoose.connect(db_url, (err) => {
  if (err) throw err;
  console.log("MongoDB connected");
});
app.listen(port, () => {
  console.log(`Listening.... on port ${port}`);
});
