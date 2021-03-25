// '/api' directory

const express = require('express');

let mongoose = require('mongoose');

let connection1 = mongoose.createConnection("mongodb+srv://GeneLab:GeneLabPw@lab.q3vtm.mongodb.net/YOLO?retryWrites=true&w=majority");
let connection2 = mongoose.createConnection("mongodb+srv://GeneLab:GeneLabPw@lab.q3vtm.mongodb.net/FUNDB?retryWrites=true&w=majority");

const schemaOne = new mongoose.Schema({
    one:String
}, {versionKey : false});

const schemaTwo = new mongoose.Schema({
    two:String
}, {versionKey : false});

const dbOne = connection1.model('testOne',schemaOne);
const dbTwo = connection2.model('testTwo',schemaTwo);

const router = express.Router();

router.get('/', (req,res) => {
    const firstConnect = new dbOne({one:"yeah"});
    const secondConnect = new dbTwo({two:"ok"});
    
    firstConnect.save((err, one) => {
        if(err) console.log(err);
        else console.log(one);
    });
    secondConnect.save((err, two) => {
        if(err) console.log(err);
        else console.log(two);
    });

    res.send({username:"test2"});
});

router.post('/', (req,res) => {
    // console.log(req.body.ID);
    res.json({username:'DK SHOWMAKER'});
});


module.exports = router;