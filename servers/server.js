// '/' directory

const express = require('express'); 
//import express from "express"; // ES6 Syntax

const route = require('./routes/index');
const player = require('./routes/player');

const app = express(); 
const port = process.env.PORT || 3001;


//(Express v4.16.0 기준 express가 빌트인 body-parser를 넣었음 == bodyParser 사용 X)
app.use(express.json()); // JSON으로 받아들인 정보 분석 
app.use(express.urlencoded({extend:true}));  //

app.use('/api', route); // 아래와 동일
// app.use('/api', (req,res) => res.json({username:'bryan'}));

app.use('/player', player);

app.listen(port, () => {
    console.log(`express is running on ${port}`);
});