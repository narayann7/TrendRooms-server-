const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    authType: {
      type: String,
      required: true,
      enum: ["google", "github", "linkedin"],
    },
    authId: {
      type: String,
      required: true,
    },
    displayPicture: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      unique: true,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;
