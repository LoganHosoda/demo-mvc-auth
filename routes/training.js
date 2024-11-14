const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/training');

router.get('/', trainingController.getTraining);

module.exports = router;
