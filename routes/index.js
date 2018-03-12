const DriversController = require('../controllers/drivers');

module.exports = (app) => {
  app
    .post('/api/drivers', DriversController.create)
    .patch('/api/drivers/:id', DriversController.edit)
    .delete('/api/drivers/:id', DriversController.delete)
    .get('/api/drivers', DriversController.index);
    ;
};
