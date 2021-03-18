// '/' directory

const express = require('express'); 
//import express from "express"; // ES6 Syntax

const route = require('./routes/index');
const player = require('./routes/player');

const app = express(); 
const port = process.env.PORT || 3001;


//(Express v4.16.0 ���� express�� ��Ʈ�� body-parser�� �־��� == bodyParser ��� X)
app.use(express.json()); // JSON���� �޾Ƶ��� ���� �м� 
app.use(express.urlencoded({extend:true}));  //

app.use('/api', route); // �Ʒ��� ����
// app.use('/api', (req,res) => res.json({username:'bryan'}));

app.use('/player', player);

app.listen(port, () => {
    console.log(`express is running on ${port}`);
});