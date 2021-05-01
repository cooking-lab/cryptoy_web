// '/player' directory
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const auth = require('../lib/auth');

const playerSchema = require('../models/player');

let connectionGameDB = mongoose.createConnection("mongodb+srv://GeneLab:GeneLabPw@lab.q3vtm.mongodb.net/Game?retryWrites=true&w=majority");
const Players = connectionGameDB.model('Players', playerSchema);

// router.use(express.json());
// router.use(express.urlencoded({extend:true}));
// router.use(cookieParser('keyboard cat'));
// router.use(session({
//     secret: 'asdfsdfadf',
//     resave: false,
//     saveUninitialized: true,
//     store: new MongoStore({mongooseConnection: connectionGameDB}),
//     })
// );

// const passport = require('passport'),
// LocalStrategy = require('passport-local').Strategy;

// router.use(passport.initialize());
// router.use(passport.session());
// router.use(flash());

// passport.use(Players.createStrategy());
// passport.serializeUser(Players.serializeUser());
// passport.deserializeUser(Players.deserializeUser());

// passport.serializeUser((user, done) => {
//     console.log("로그인 성공 및 세션 저장 완료");
//     console.log(user);
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     console.log("리로드");
//     Players.findById(id, (err, user) => {
//         done(err, user);
//     });
// });

// sign up
router.post('/signup', (req, res) => {
    const userId = req.body.id;
    const userPassword = req.body.password;
    const userNickname = req.body.nickname;
    const player = new Players({
        id: userId,
        password: userPassword,
        nickname: userNickname,
        introduction: ""
    });
    console.log("회원가입 : " + player);
    player.save((err, player) => {        
        if(err) return res.status(500).send("STATUS 500 : 회원가입 오류");
        return res.status(200).send(player.profileView());
    });
});

// checkid
router.post('/checkid', (req, res) => {
    console.log("check id");
    const data = Players.findOne({id:req.body.id}).exec((err, user) => {
        res.send(user);
    });
});

// login
// passport.use(new LocalStrategy({
//         usernameField: 'id',
//         passwordField: 'password'
//     },
//     (id, password, done) => {
//         Players.findOne({
//             id: id,
//             password: password
//         }).exec((err, player) => {
//             // error
//             if (err) return done(err);
//             // fail 
//             if(!player) return done(null, false, {message: "Incorrect userInfo"});
//             // success
//             return done(null, player);
//         });
//     }
// ));

router.get('/login', (req, res) => {
    alert()
})

// router.post('/login', 
//     passport.authenticate('local', {
//         successRedirect: '/', 
//         failureRedirect: '/login',
//         failureFlash: true
//     })
// );

router.get('/logout', (req, res) => {
    req.logout();
    req.session.save(err => {
        if(err) console.log(err);
        res.redirect('/');
    })
})

// router.post('/login', (req, res) => {
//     Players.findOne({
//         id:req.body.id,
//         password:req.body.password
//     }).exec((err, player) => {
//         if(err) res.status(500).send("로그인 오류");
//         res.status(200).send(player);
//     })
// });

router.get('/auth', (req, res) => {
    if(auth(req, res)) res.status(200).send(true);
    else res.status(200).send(false);
});

router.get('/', (req, res) => {
    console.log("현재 유저 : " + req.user);
    
});

module.exports = router;