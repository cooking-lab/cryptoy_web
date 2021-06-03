const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

let connectionGameDB = mongoose.createConnection(`mongodb+srv://GeneLab:GeneLabPw@lab.q3vtm.mongodb.net/Game?retryWrites=true&w=majority`);
const Rank = connectionGameDB.model('Rank', new mongoose.Schema({
    score : Number, count : Number
}));

router.get('/', (req, res) => {
    Rank.findOne({score : req.query.score}, (err, rank) => {
        if(err) throw err;
        if(rank) {
            rank.count = rank.count + 1;
            rank.save();
        }else {
            let newRank = new Rank({
                score : req.query.score,
                count : 1
            })
            newRank.save();
        }
    })
    Rank.find({}, (err, rank) => {
        let ranking;
        if(rank) {
            let temp = rank.filter(r => r.score > req.query.score);
            console.log(temp);
            ranking = temp.length / rank.length;
        }else {
            ranking = 0;
        }
        res.status(200).send({ranking});
    })
})


module.exports = router;