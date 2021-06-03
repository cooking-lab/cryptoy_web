const moment = require("moment");
const mongoose = require("mongoose");
const auctionSchema = new mongoose.Schema({
    regiNum : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        required : true
    },
    toyId : {
        type : String,
        required : true,
    },
    startedAt : {
        type : Date,
        required : true,
        default : moment().format("YYYY-MM-DDTHH:mm")
    },
    endedAt : {
        type : Date,
    },
    deadline : {
        type : Date,
        required : true,
        index : {       
            expires : 0,     
            partialFilterExpression: { deadline: { $lt : moment()} },
        }
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
    expireAt: {
        type: Date, 
        required : true
    }
});

const rentalSchema = new mongoose.Schema({
    regiNum : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        required : true,
        default : "rental"
    },
    toyId : {
        type : String,
        required : true,
    },
    startedAt : {
        type : Date,
        required : true,
        default : moment().format("YYYY-MM-DDTHH:mm")
    },
    rentalDuration : {
        type : Number,
        default : 1,
        required : true,
    },
    deadline : {
        type : Date,
        required : true,
        expires : 0
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
    },
    expireAt: {
        type: Date, 
        required : true
    }
});

auctionSchema.index({expireAt:1}, {expireAfterSeconds:0});
rentalSchema.index({expireAt:1}, {expireAfterSeconds:0});

module.exports = {
    auctionSchema,
    rentalSchema
};
// module.exports = mongoose.model('Market', auctionSchema);