const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String,
});

const UserData = mongoose.model("userdata", userSchema);

module.exports = UserData;
