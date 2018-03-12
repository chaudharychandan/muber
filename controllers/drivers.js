const Driver = require('../models/driver');

module.exports = {
  index(req, res, next){
    const { lng, lat } = req.query;

    Driver
      .aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            spherical: true,
            distanceField: 'dist',
            maxDistance: 200000
          }
        }
      ])
        .then((drivers) => res.send(drivers))
        .catch(next)
        ;
  },
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
