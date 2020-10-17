const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const UserData = require("../models/userModel");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserData.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log(profile);
      console.log(profile._json.picture);
      UserData.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("User is:", currentUser);
          done(null, currentUser);
        } else {
          new UserData({
            googleId: profile.id,
            username: profile.displayName,
            thumbnail: profile._json.picture,
          })
            .save()
            .then((newUser) => {
              console.log("Created new User:", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
