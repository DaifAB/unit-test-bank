const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
    money_provider_id : {
        type :mongoose.Types.ObjectId,
        ref:"moneyproviders"
    },
    gab_id : {
        type :mongoose.Types.ObjectId,
        ref:"gabs"
    },
    total_up:{
        type:Number
    }

})

module.exports = mongoose.model('Upload', uploadSchema)

