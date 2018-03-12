const DriversController = require('../controllers/drivers');

module.exports = (app) => {
  app
    .post('/api/drivers', DriversController.create)
    .patch('/api/drivers/:id', DriversController.edit)
    ;
};
