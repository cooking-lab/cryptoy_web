// '/' directory
//import express from "express"; // ES6 Syntax
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const index = require('./routes/index');
const player = require('./routes/player');
const toys = require('./routes/toys');

const port = process.env.PORT || 3001;

const playerSchema = require('./models/player');

let connectionGameDB = mongoose.createConnection("mongodb+srv://GeneLab:GeneLabPw@lab.q3vtm.mongodb.net/Game?retryWrites=true&w=majority");
const Players = connectionGameDB.model('Players', playerSchema);

//(Express v4.16.0 기준 express가 빌트인 body-parser를 넣었음 == bodyParser 사용 X)
app.use(express.json()); // JSON으로 받아들인 정보 분석 
app.use(express.urlencoded({extend:true}));  //
app.use(cors());

app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: 'asdfsdfadf',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: connectionGameDB}),
    })
);

const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser((user, done) => {
    console.log("로그인 성공 및 세션 저장 완료");
    console.log(user);
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    console.log(id);
    Players.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password'
    },
    (id, password, done) => {
        Players.findOne({
            id: id,
            password: password
        }).exec((err, player) => {
            // error
            if (err) return done(err);
            // fail 
            if (!player) return done(null, false, { message: "Incorrect userInfo" });
            // success
            return done(null, player);
        });
    }
));

app.post('/player/login', 
    passport.authenticate('local', {
        successRedirect: '/', 
        failureRedirect: '/login',
        failureFlash: true
    })
);

app.use('/api', index); // 아래와 동일
app.use('/player', player);
app.use('/toys', toys);

// app.get('/', (req,res) => {
//     if(auth()) res.status(200).send(true);
//     else res.status(200).send(false);
// });

app.listen(port, () => {
    console.log(`express is running on ${port}`);
});