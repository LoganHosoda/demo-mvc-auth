module.exports = {
  getLogin: (req, res) => {
    res.render('login.ejs');
  },
  getSignup: (req, res) => {
    res.render('signup.ejs');
  }
}
