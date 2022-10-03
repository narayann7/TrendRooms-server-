const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
var LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const passport = require("passport");
require("dotenv").config();
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.githubClientID,
      clientSecret: process.env.githubClientSecret,
      callbackURL: "/api/auth/github/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      profile.accessToken = accessToken;

      console.log(profile);

      return done(null, profile);
    }
  )
);
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.linkedinClientID,
      clientSecret: process.env.linkedinClientSecret,
      callbackURL: "/api/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
