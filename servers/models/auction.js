const moment = require("moment");
const mongoose = require("mongoose");
const auctionSchema = new mongoose.Schema({
    regiNum : {
        type : String,
        required : true,
        unique : true
    },
    type : {
        type : String,
        required : true
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
    endedAt : {
        type : Date,
    },
    deadline : {
        type : Date,
        required : true
    },
    initPrice : {
        type : Number,
        required : true
    },
    currentPrice : {
        type : Number,
        required : true
    },
    goalPrice : {
        type : Number,
        required : true
    },
    isAvailable : {
        type : Boolean,
        required : true,
        default : true
    },
    currentUser : {
        type : String
    }
},  { versionKey : false } );

module.exports = mongoose.model('Market', auctionSchema);