const mongoose = require('mongoose')

const accountSchma = new mongoose.Schema({
  owner_id: {
    type:mongoose.Types.ObjectId,
    ref:"owners"
  },
  agency_id: {
    type:mongoose.Types.ObjectId,
    ref:"agencies"
  },
  solde:{
      type:Number

  }

});

module.exports = mongoose.model('Account', accountSchma)
