const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/training');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, trainingController.getTraining);
router.post('/post', ensureAuth, trainingController.postTraining);

module.exports = router;
