const express = require("express");
const passport = require("passport");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth_routes");
const port = process.env.port || 5000;

require("dotenv").config();
require("./services/passport");

//----------------------------- configs ---------------------------------------
app.use(passport.initialize());
app.use(express.json());
app.use(
  cors({
    origin: process.env.clientBaseUrl,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

//----------------------------- routes ---------------------------------------
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});

//----------------------------- connections ------------------------------------
app.listen(port, () => {
  console.log(`Listening.... on port ${port}`);
});
