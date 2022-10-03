const express = require("express");
const passport = require("passport");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth_routes");
require("dotenv").config();
require("./services/passport");
const port = process.env.port || 5000;
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Happy coding!");
});

app.listen(port, () => {
  console.log(`Listening.... on port ${port}`);
});
