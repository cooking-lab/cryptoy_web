const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Auction = require('../models/auction.js');
const Toy = require('../models/toy.js');
const dbAddress = "mongodb+srv://GeneLab:GeneLabPw@lab.q3vtm.mongodb.net/Toy?retryWrites=true&w=majority";

mongoose.connect(dbAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
})
.then(() => console.log("Toy DB!"))
.catch(err => console.log(err));


var path = require("path");
var java = require("java");

java.classpath.push(path.resolve('./lib/ver0.85.jar'));
var DBClass = java.import('manager.GameManager');
var gm = new DBClass();

router.get('/', (req, res) => {
    Toy.find((err, toy) => {
        res.send(toy);
    })
});

router.get('/owner/:userId', (req, res) => {
    Toy.find({ownerId : req.params.userId}, (err, toy) => {
        res.send(toy);
    })
})

router.post('/market/register', (req, res) => {
    /****************업데이트가 안됨********************/
    Toy.findOneAndUpdate({id : req.body.toyId}, {$set : {market : true}}) 
    .then(toy => {
        let newAuction = new Auction({...req.body});
        newAuction.save(err => {
        if(err) return res.send(err);
        res.status(200).send("SUCCESS REGISTER!");
    })
    })
})

router.get('/market/:id', (req, res) => {
    Auction.findOne({toyId : req.params.id}, (err, auction) => {
        res.send(auction);
    })
})


module.exports = router;