// '/' directory
<<<<<<< HEAD

//import express from "express"; // ES6 Syntax
const express = require('express'); 
const cors = require('cors');
=======
//import express from "express"; // ES6 Syntax
const express = require("express");
const app = express();
>>>>>>> c669d32ce7d04121832b9d680540fb28513e3118

const index = require('./routes/index');
const player = require('./routes/player');
const toys = require('./routes/toys');

const port = process.env.PORT || 3001;

<<<<<<< HEAD

//(Express v4.16.0 기준 express가 빌트인 body-parser를 넣었음 == bodyParser 사용 X)
app.use(express.json()); // JSON으로 받아들인 정보 분석 
app.use(express.urlencoded({extend:true}));  //
app.use(cors());
app.use('/api', index); // 아래와 동일
=======
//(Express v4.16.0 기준 express가 빌트인 body-parser를 넣었음 == bodyParser 사용 X)
app.use(express.json());
app.use(express.urlencoded({extend:true}));  //

app.use('/api', route); 
>>>>>>> c669d32ce7d04121832b9d680540fb28513e3118
// app.use('/api', (req,res) => res.json({username:'bryan'}));

app.use('/player', player);

app.use('/toys', toys);

app.listen(port, () => {
    console.log(`express is running on ${port}`);
});