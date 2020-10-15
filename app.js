const express = require("express");
const authRoutes = require("./Routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const app = express();

app.set("view-engine", "ejs");

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log("Some problem with the connection " + err);
  } else {
    console.log("The Mongoose connection is ready");
  }
});

app.use(express.static(__dirname + "/public"));

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(3000, () => {
  console.log("App now listening for requests on port 3000");
});
