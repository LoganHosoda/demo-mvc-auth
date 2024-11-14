const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
require('./config/passport');

// Imported routes
const homeRoutes = require('./routes/home');
const trainingRoutes = require('./routes/training');

// Use .env file for environmental variables
require('dotenv').config({ path: './config/.env' });

// Connect to the Mongo database
const connectDB = require('./config/database');
connectDB()

// Use EJS for views
app.set('view engine', 'ejs');

// Static folder
app.use(express.static('public'));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ bodyParser: true }));

// Logging
app.use(logger("dev"));

// Use forms for PUT/DELETE
app.use(methodOverride("_method"));

// Setup sessions - store in MongoDB
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.DB_URI })
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use flash messages for errors, etc
app.use(flash());

// Routes
app.use('/', homeRoutes);
app.use('/training/', trainingRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
})
