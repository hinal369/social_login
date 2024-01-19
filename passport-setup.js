const passport = require('passport');   
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    }, 
    (request, accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        return done(null, profile);
    }
))

passport.serializeUser(function (user, done) {
    done(null, user);
});
  
  // Deserialize the user from the session
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});