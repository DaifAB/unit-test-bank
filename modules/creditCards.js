const mongoose = require('mongoose')

const creditCardSchema = new mongoose.Schema({
  account_id: {
    type:mongoose.Types.ObjectId,
    ref:"accounts"
  },
  pin:{
      type:Number
  },
  type:{
      type:String
  }

});

module.exports = mongoose.model('CreditCard', creditCardSchema)
