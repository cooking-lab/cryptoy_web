const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

const playerSchema = new mongoose.Schema({
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