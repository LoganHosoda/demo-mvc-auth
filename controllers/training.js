const Training = require('../models/Training');

module.exports = {
  getTraining: async (req, res) => {
    try {
      const training = await Training.find().lean();
      res.render('training.ejs', { training: training });
    } catch (err) {
      console.log(err); 
    }
  },
  postTraining: async (req, res) => {
    try {
      await Training.create({
        sop: req.body.sop,
        title: req.body.title,
        revision: req.body.revision
      })
      console.log('SOP has been added!')
      res.redirect('/training');
    } catch (err) {
      console.log(err) 
    }
  },
  deleteTraining: async (req, res) => {
    try {
      console.log(req.params.id)
      await Training.findByIdAndDelete({ _id: req.params.id })
      console.log("Successfully deleted SOP")
      res.redirect('/training');
    } catch (err) {
      console.log(err); 
    }
  }
}
