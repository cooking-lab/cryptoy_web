const mongoose = require("mongoose");
const toySchema = new mongoose.Schema({
    id : {
        type : String,
        required : true,
    },
    owner : {
        type : String
    },
    name : {
        type : String,
    },
    gender : {
        type : String,
    },
    generation : {
        type : Number,
    },
    dna : {
        type : String,
        required : true
    },
    mamaId : {
        type : String,
    },
    papaId : {
        type : String
    },
    market : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Auction'
    },
    adventure : {
        type : Boolean,
        default : false
    },
    cooltime : {
        type : Number,
        default : 0
    }
}, { versionKey : false } )


module.exports = toySchema;

//module.exports = mongoose.model('Toy', toySchema);