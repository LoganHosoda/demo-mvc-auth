const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/training');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, trainingController.getTraining);

module.exports = router;
