// '/api' directory

const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
   // res.json({username:'test'});
   res.send({username:"test"});
});

module.exports = router;


