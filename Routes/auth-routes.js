const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.get("/logout", (req, res) => {
  res.send("Logging Out");
});

module.exports = router;
