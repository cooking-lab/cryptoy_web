// '/player' directory

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const dbAddress = "mongodb+srv://GeneLab:GeneLabPw@lab.q3vtm.mongodb.net/Game?retryWrites=true&w=majority";

let connectionGameDB = mongoose.createConnection("mongodb+srv://GeneLab:GeneLabPw@lab.q3vtm.mongodb.net/Game?retryWrites=true&w=majority");

// mongoose.connect(dbAddress, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
// })
// .then(() => console.log("DB CONNECT!"))
// .catch(err => console.log(err));

const playerSchema = new mongoose.Schema({
    id: String,
    password : String,
    nickname : String
}, {versionKey: false});

playerSchema.methods.profileView = () => {
    const data = {
        id: this.Id,
        password: this.Password,
        nickname: this.Nickname,
    }
    return data;
}

const Players = mongoose.model('Players', playerSchema);

// sign up
router.post('/signup', (req, res) => {
    const userId = req.body.id;
    const userPassword = req.body.password;
    const userNickname = req.body.nickname;
    const player = new Players({
        id: userId,
        password: userPassword,
        nickname: userNickname
    });
    console.log(player);
    player.save((err, player) => {        
        if(err) return res.status(500).send("STATUS 500 : 회원가입 오류");
        return res.status(200).send(player.profileView());
    });
});

// checkid
router.post('/checkid', (req, res) => {
    Players.findOne({id:req.body.id}).exec((err, player) => {
        res.status(200).send(player);
    })
});

router.post('/login', (req, res) => {
    Players.findOne({
        id:req.body.id,
        password:req.body.password
    }).exec((err, player) => {
        if(err) res.status(500).send("로그인 오류");
        res.status(200).send(player);
    })
});

router.get('/', (req, res) => {
    console.log("GOOD CONNECT");
    res.json({ID:'test response'});
});


module.exports = router;