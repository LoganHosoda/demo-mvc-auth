const express = require('express');
const app = express();
const homeRoutes = require('./routes/home');
const connectDB = require('./config/database');

// Use .env file for environmental variables
require('dotenv').config({ path: './config/.env' });

// Connect to the Mongo database
connectDB()

// Use EJS for views
app.set('view engine', 'ejs');

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ bodyParser: true }));

// Static folder
app.use(express.static('public'));

// Routes
app.use('/', homeRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
})
