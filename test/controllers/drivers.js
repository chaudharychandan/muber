const mongoose = require('mongoose');
const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers Controller', () => {
  it('Post request to /api/driver creates a new driver', done => {
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
});
