const moment = require("moment");
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    regiNum : {
        type : String,
        required : true,
        unique : true
    },
    type : {
        type : String,
        required : true,
        default : "rental"
    },
    toyId : {
        type : String,
        required : true,
        unique : true
    },
    startedAt : {
        type : Date,
        required : true,
        default : moment().format("YYYY-MM-DD")
    },
    rentalDuration : {
        type : Number,
        required : true
    },
    deadline : {
        type : Date,
    },
    initPrice : {
        type : Number,
        required : true
    },
    isAvailable : {
        type : Boolean,
        required : true,
        default : true
    },
    rentalUser : {
        type : String
    }
},  { versionKey : false } );

module.exports = mongoose.model('Market', rentalSchema);