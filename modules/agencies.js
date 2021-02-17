const mongoose = require('mongoose')

const agencySchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  city: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model('Agency', agencySchema)