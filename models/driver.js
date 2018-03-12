const mongoose = require('mongoose');
const PointSchema = require('./point');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  geometry: PointSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
