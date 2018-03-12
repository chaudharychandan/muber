const mongoose = require('mongoose');
const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers Controller', () => {
  it('POST request to /api/driver creates a new driver', done => {
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@muber.com' })
        .end((err, res) => {
          Driver.count().then(newCount => {
            assert(newCount === count + 1);
            done();
          });
        });
    });
  });

  it('PATCH request to /api/driver/id updates an existing driver', done => {
    const driver = new Driver({
      email: 'driver1@muber.com',
      driving: false
    });

    driver.save().then(() => {
      request(app)
        .patch(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end((err, res) => {
          const { driving } = res.body;
          assert(driving === true);
          done();
        })
    });
  });
});
