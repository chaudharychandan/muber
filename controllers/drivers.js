const Driver = require('../models/driver');

module.exports = {
  create(req, res, next) {
    const driver = req.body;

    Driver.create(driver)
      .then(driver => res.send(driver))
      .catch(next)
      ;
  },
  edit(req, res, next) {
    const { id } = req.params;
    const driver = req.body;

    Driver.findByIdAndUpdate({ _id: id }, { $set: driver }, { new: true })
      .then(driver => res.send(driver))
      .catch(next)
      ;
  },
  delete(req, res, next) {
    const { id } = req.params;

    Driver.findByIdAndRemove(id)
      .then(driver => res.status(204).send(driver))
      .catch(next)
      ;
  }
};
