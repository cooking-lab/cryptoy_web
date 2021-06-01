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

java.classpath.push(path.resolve('./lib/ver0.1.4.jar'));
let DBClass = java.import('manager.GameManager');
let gm = new DBClass();

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

router.get('/owners/:userId', (req, res) => {
    Toy.find({ ownerId: req.params.userId}).populate('market').exec((err, toy) => {
        res.send(toy);
    })
})

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

router.post('/markets/transaction/:id', (req, res) => {
    const data = req.body;
    console.log(req.params.id);
    if(data.marketType === 'sale'){
        const ret = gm.sellCharacterSync(data.from, data.to, data.price, req.params.id);
        if(ret) {
            // 거래 완료
            Auction.deleteOne({regiNum : req.params.id}, (err, results) => {
                res.send('ok');
            })
        }
    }else if(data.marketType === 'rental'){
        gm.testFunctionSync(); // 테스트 코드
        const ret = gm.sellCharacterSync(data.from, data.to, data.price, req.params.id);
        if(ret) {
            // 거래 완료 + 타이머 설정
            console.log(req.params.id);
            const rentTimer = setTimeout(() => {
                gm.sendCharacterSync(data.to, data.from, req.params.id);
                console.log("원래 주인에게 캐릭터가 돌아갔습니다.");                
            }, 1000 * 60);
            res.send('ok');
            // Rental.deleteOne({regiNum : req.params.id}, (err, results) => {                
            // })
        }
    }
})

router.post("/breeding", (req, res) => {
    const babyId = gm.doBreedingSync(req.body.userId, req.body.mamaId, req.body.papaId);
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