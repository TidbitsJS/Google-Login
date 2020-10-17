const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./Routes/auth-routes");
const profileRoutes = require("./Routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const app = express();

app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log("Some problem with the connection " + err);
  } else {
    console.log("The Mongoose connection is ready");
  }
});

app.use(express.static(__dirname + "/public"));

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  res.render("home.ejs", { user: req.user });
});

app.listen(3000, () => {
  console.log("App now listening for requests on port 3000");
});
