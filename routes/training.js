const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/training');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, trainingController.getTraining);
router.post('/post', trainingController.postTraining);
router.delete('/deleteTraining/:id', trainingController.deleteTraining);

module.exports = router;
