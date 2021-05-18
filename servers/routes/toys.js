const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const { auctionSchema, rentalSchema } = require('../models/auction');
const ToyModel = require("../models/toy");
require('dotenv').config();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

let connectionToyDB = mongoose.createConnection(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PW}@lab.q3vtm.mongodb.net/${process.env.TOY_DB_NAME}?retryWrites=true&w=majority`);

const Toy = connectionToyDB.model("Toy", ToyModel);
const Base = connectionToyDB.model('Auction', new mongoose.Schema({}));

const Auction = Base.discriminator("Sale", auctionSchema);
const Rental = Base.discriminator("Rental", rentalSchema);

const path = require("path");
const java = require("java");

java.classpath.push(path.resolve('./lib/ver0.1.jar'));
const DBClass = java.import('manager.GameManager');
const gm = new DBClass();

router.get('/', (req, res) => {
    Toy.find().populate('market').exec((err, toy) => {
        res.send(toy);
    })
});

router.get('/:id', (req, res) => {
    Toy.findOne({id : req.params.id}).populate('market').exec((err, toy) => {
        if(err) throw err;
        res.status(200).send(toy);
    })
});

// router.get('/owners/:userId', (req, res) => {
//     Toy.find({ ownerId: req.params.userId, market: false }, (err, toy) => {
//         res.send(toy);
//     })
// })

router.put('/markets/update/:toyId', (req, res) => {
    if(req.body.marketType === 'sale'){
         Auction.findOneAndUpdate(
            {
                 toyId : req.params.toyId,
                 deadline : { $gte : moment() }
            }, 
            {currentPrice : req.body.currentPrice, currentUser : req.body.currentUser}, {new:true}, (err, auction) => {
            if(err) throw err;
            if(auction){
                res.status(200).send("success update!");
            }else{
                res.status(406).send("failed");
            }
        })
    }else if(req.body.marketType === 'rental'){
        Rental.findOneAndUpdate(
            {
                toyId : req.params.toyId,
                deadline : { $gte : moment() }
            },
            {rentalUser : req.body.rentalUser, isAvailable : false}, {new:true}, (err, auction) => {
            if(err) throw err;
            if(auction){
                res.status(200).send("success update!");
            }else{
                res.status(406).send("failed");
            }
        })
    }
  
})

router.post('/markets/register', (req, res) => {
    Toy.findOne({ id: req.body.toyId })
        .then(toy => {
            let newMarket;
            if(req.body.type === 'sale'){
                newMarket = new Auction(req.body);
            }else if(req.body.type === 'rental') {
                newMarket = new Rental(req.body);
            }
            toy.market = newMarket;
            toy.save(err => {
                newMarket.save( err => {
                    if(err) throw err;
                    res.status(200).send(newMarket);
                })
               ;
            })
        })
})

/******************Breeding java에서 오류********************/
/******************Breeding java에서 오류********************/
/******************Breeding java에서 오류********************/
router.post("/breeding", (req, res) => {
    const babyId = gm.doBreedingSync("t1", req.body.mamaId, req.body.papaId);
    const response = JSON.parse(babyId);
    console.log(response);
    if(response.map.status != 200){
        res.send(response.map);
    }else{
        Toy.findOne({id : response.map.baby._id}).populate('market').exec((err, toy) => {
            res.send({status : 200, toy:toy});
        })
    }
})

// router.get('/markets', (req, res) => {
//     Auction.find((err, auction) => {
//         res.send(auction);
//     })
// })

// router.get('/market/:id', (req, res) => {
//     Auction.findOne({ toyId: req.params.id }, (err, auction) => {
//         res.send(auction);
//     })
// })


module.exports = router;