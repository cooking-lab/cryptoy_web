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
            expires : 120,
            partialFilterExpression: { deadline: { $lt : moment()} },
        }
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
        required : true
    },
    deadline : {
        type : Date,
        required : true,
        index : {
            expires : '1440m'
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
    rentalUser : {
        type : String
    }
});

module.exports = {
    auctionSchema,
    rentalSchema
};
// module.exports = mongoose.model('Market', auctionSchema);