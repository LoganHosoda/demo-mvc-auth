require('dotenv').config({ path: './config/.env' });
const express = require('express');
const app = express();
const homeRoutes = require('./routes/home');
const connectDB = require('./config/database');

connectDB()

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ bodyParser: true }));
app.use(express.static('public'));

// Routes
app.use('/', homeRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
})
