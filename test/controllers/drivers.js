const mongoose = require('mongoose');
const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers Controller', () => {
  it('POST request to /api/drivers creates a new driver', done => {
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

  it('PATCH request to /api/drivers/id updates an existing driver', done => {
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

  it('DELETE request to /api/drivers/id deletes an existing driver', done => {
    const driver = new Driver({
      email: 'driver2@muber.com'
    });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end((err, res) => {
          Driver.findOne({ email: driver.email })
            .then((driver) => {
              assert(driver === null);
              done();
            });
        })
    });
  });

  it('GET request to /api/drivers finds drivers in a location', done => {
    const seattleDriver = new Driver({
      email: 'seattle@muber.com',
      geometry: {
        type: 'Point',
        coordinates: [-122.4759902, 47.6147628]
      }
    });

    const miamiDriver = new Driver({
      email: 'miami@muber.com',
      geometry: {
        type: 'Point',
        coordinates: [-80.253, 25.791]
      }
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, res) => {
            const drivers = res.body;
            assert(drivers.length === 1);
            assert(drivers[0].email === miamiDriver.email);
            done();
          });
      })
  });
});
