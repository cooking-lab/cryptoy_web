// '/player' directory

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const dbAddress = "mongodb+srv://GeneLab:GeneLabPw@lab.q3vtm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(dbAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
})
.then(() => console.log("DB CONNECT!"))
.catch(err => console.log(err));

router.post('/', (req,res) => {
    let result = {};
    let userId = req.params.userId;
    let userPassword = req.params.userPassword;
    let userNickname = req.params.userNickname;
    user.save((err, info) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true});
    });
});

router.get('/', (req, res) => {
    console.log("GOOD CONNECT");
    res.json({ID:'test response'});
});

module.exports = router;