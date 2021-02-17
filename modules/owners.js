const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    cin : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('Owner', ownerSchema)

