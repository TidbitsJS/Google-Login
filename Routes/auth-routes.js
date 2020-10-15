const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login.ejs", { user: req.user });
});

router.get("/logout", (req, res) => {
  res.send("Logging Out");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("You reached the redirect URI");
});

module.exports = router;
