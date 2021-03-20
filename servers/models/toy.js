const mongoose = require("mongoose");
const toySchema = new mongoose.Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    owner : {
        type : String
    },
    name : {
        type : String,
        required : true
    },
    gender : {
        type : Boolean,
        required : true
    },
    generation : {
        type : Number,
        required : true
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
        type : Boolean,
        required : true,
        default : false
    },
    adventure : {
        type : Boolean,
        required : true,
        default : false
    },
    cooltime : {
        type : Number,
        default : 0
    }
}, { versionKey : false } )

module.exports = mongoose.model('Toy', toySchema);