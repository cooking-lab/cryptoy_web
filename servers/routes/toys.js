const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AuctionModel = require('../models/auction');
const ToyModel = require("../models/toy");

let connectionToyDB = mongoose.createConnection("mongodb+srv://GeneLab:GeneLabPw@lab.q3vtm.mongodb.net/Toy?retryWrites=true&w=majority");
const Toy = connectionToyDB.model("Toy", ToyModel);
const Auction = connectionToyDB.model("Market", AuctionModel);

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
    Toy.find({ownerId : req.params.userId, market : false}, (err, toy) => {
        res.send(toy);
    })
})

router.post('/market/register', (req, res) => {
    console.log(req.body);
    Toy.findOneAndUpdate({id : req.body.toyId},{market : true}, {new : true}) 
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