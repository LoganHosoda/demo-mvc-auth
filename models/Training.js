const mongoose = require('mongoose');

const TrainingSchema = new mongoose.Schema({ 
  sop: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  revision: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = ('Training', TrainingSchema);
