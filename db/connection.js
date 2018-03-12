const mongoose = require('mongoose');

module.exports = () => {
  if (process.env.NODE_ENV === 'develop') {
    mongoose.connect('mongodb://localhost/muber');
  }
};
