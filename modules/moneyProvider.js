const mongoose = require('mongoose')

const moneyProSchema = new mongoose.Schema({
   
    matricule : {
        type : String
    }

})

module.exports = mongoose.model('MoneyProvider', moneyProSchema)

