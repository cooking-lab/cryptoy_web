// '/' directory
<<<<<<< HEAD

//import express from "express"; // ES6 Syntax
const express = require('express'); 
const cors = require('cors');
const app = express();
=======
//import express from "express"; // ES6 Syntax
const express = require("express");
const app = express();
const cors = require("cors");
>>>>>>> 6e65e2a55882d5417a0d780f1a051af6c01cd6c8

const index = require('./routes/index');
const player = require('./routes/player');
const toys = require('./routes/toys');

const port = process.env.PORT || 3001;

<<<<<<< HEAD

=======
>>>>>>> 6e65e2a55882d5417a0d780f1a051af6c01cd6c8
//(Express v4.16.0 기준 express가 빌트인 body-parser를 넣었음 == bodyParser 사용 X)
app.use(express.json()); // JSON으로 받아들인 정보 분석 
app.use(express.urlencoded({extend:true}));  //
app.use(cors());
app.use('/api', index); // 아래와 동일
// app.use('/api', (req,res) => res.json({username:'bryan'}));

app.use('/player', player);

app.use('/toys', toys);

app.listen(port, () => {
    console.log(`express is running on ${port}`);
});