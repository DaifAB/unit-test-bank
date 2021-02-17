const mongoose = require('mongoose')

const gabSchema = new mongoose.Schema({
    creditCard_id : {
        type :mongoose.Types.ObjectId,
        ref:"creditcards"
    },
    money_requested : {
        type : Number,
        required : true
    }

})

module.exports = mongoose.model('Gab', gabSchema)

