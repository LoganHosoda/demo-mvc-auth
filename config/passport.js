const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function (passport) {
  // Serialize user to store in session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id); 
      done(null, user);
    } catch (err) {
      done(err, null); 
    }
  });

  // Local login strategy
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email }); 
        if (!user) return done(null, false, { message: 'No user with that email.' });

        const isMatch = await user.comparePassword(password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      } catch (err) {
        return done(err); 
      }
    })
  );
};

