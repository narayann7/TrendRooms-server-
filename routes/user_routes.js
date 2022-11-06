const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_auth");
const authHandler = require("../middlewares/auth_handler");

router.get("/", authHandler, userController.getUser);
router.put("/", authHandler, userController.updateUser);

module.exports = router;
