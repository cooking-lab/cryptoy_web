const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AuctionModel = require('../models/auction');
const ToyModel = require("../models/toy");
require('dotenv').config();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

let connectionToyDB = mongoose.createConnection(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PW}@lab.q3vtm.mongodb.net/${process.env.TOY_DB_NAME}?retryWrites=true&w=majority`);

const Toy = connectionToyDB.model("Toy", ToyModel);
const Auction = connectionToyDB.model("Market", AuctionModel);

var path = require("path");
var java = require("java");

java.classpath.push(path.resolve('./lib/ver0.85.jar'));
var DBClass = java.import('manager.GameManager');
var gm = new DBClass();

router.get('/', (req, res) => {
    console.log(req.query);
    const {auctionType, species, maxPrice} = req.query;
    Toy.find({
        $or : [
            {'species' : {$in : species}},
            {}
        ]}, (err, toy) => {
        res.send(toy);
    })
});

router.get('/owners/:userId', (req, res) => {
    Toy.find({ ownerId: req.params.userId, market: false }, (err, toy) => {
        res.send(toy);
    })
})

router.post('/markets/register', (req, res) => {
    Toy.findOne({ id: req.body.toyId })
        .then(toy => {
            let newAuction = new Auction({ ...req.body });
            newAuction.save(err => {
                if(err) throw err;
                toy.market = true;
                toy.save(err => {
                    if(err) throw err;
                    res.status(200).send(newAuction);
                })
            })
        })
})

router.get('/markets', (req, res) => {
    Auction.find((err, auction) => {
        res.send(auction);
    })
})

// router.get('/market/:id', (req, res) => {
//     Auction.findOne({ toyId: req.params.id }, (err, auction) => {
//         res.send(auction);
//     })
// })


module.exports = router;