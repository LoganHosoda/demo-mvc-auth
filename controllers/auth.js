const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

// Get login page 
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/training');
  }
  res.render('login', {
    title: 'Login'
  });
}

// Get signup up
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/training");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

// Post login handler
exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      return res.redirect(req.session.returnTo || "/training");
    });
  })(req, res, next);
};

// Post signup handler
exports.postSignup = async (req, res, next) => {
  const validationErrors = [];

  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const { userName, email, password } = req.body;
  console.log(userName);
  console.log(email);
  console.log(password);

  try {
    const existingUser = await User.findOne({ email }); 
    if (existingUser) {
      req.flash('errors', { msg: 'Email is already registered.' });
      return res.redirect('/signup');
    }

    const newUser = new User({ userName, email, password });
    await newUser.save();

    // Log the user in after successful signup
    req.logIn(newUser, (err) => {
      if (err) { return next(err) }
      // Redirect to training page
      req.flash('success', { msg: 'Account created and logged in!' });
      return res.redirect('/training');
    })
  } catch (err) {
    next(err); 
  }
};

// Logout handler
exports.logout = (req, res) => {
  console.log("Before logout, session object: ", req.session);

  if (!req.session) {
    return res.status(400).send('No session to destroy');
  }

  // Manually destroy session, skipping passport's `req.logout()`
  req.session.destroy((err) => {
    if (err) {
      console.log("Error during session destroy:", err);
      return res.status(500).send('Failed to destroy session');
    }

    req.user = null;  // Clear the user info
    res.redirect("/");  // Redirect to homepage or login page
  });
};

