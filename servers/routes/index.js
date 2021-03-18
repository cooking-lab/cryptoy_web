// '/api' directory

const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
   // res.json({username:'test'});
   res.send({username:"test"});
});

router.post('/', (req,res) => {
    // console.log(req.body.ID);
    res.json({username:'DK SHOWMAKER'});
});


module.exports = router;