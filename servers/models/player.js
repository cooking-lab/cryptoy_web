const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
require('@mongoosejs/double');
const Int32 = require("mongoose-int32").loadType(mongoose);
const playerSchema = new mongoose.Schema({
    Players: {
        id: {
            type: String, 
            required: true
        },
        password : {
            type: String,
            required: true
        },
        nickname : {
            type: String,
            required: true
        },
        introduction : {
            type: String
        },
        publicKey : {
            type: String
        },
        privateKey : {
            type: String
        },
        wallet : {
            type: Object
        },
        coin : {
            type: mongoose.Schema.Types.Double
        },
        stone : {
            type: mongoose.Schema.Types.Double
        },
        hasCharacterNum : {
            type: Int32
        },
        characterList : {
            type: Array
        },
        isAdmin : {
            type: Boolean
        }
    },
    PlayerFilter : {
        type: String
    }
}, {versionKey: false});

playerSchema.methods.profileView = () => {
    const data = {
        id: this.Id,
        password: this.Password,
        nickname: this.Nickname,
        introduction: this.introduction,
    }
    return data;
}

// playerSchema.plugin(passportLocalMongoose, {usernameField:'id'});
// playerSchema.plugin(passportLocalMongoose, {passwordField:'password'});

module.exports = playerSchema;