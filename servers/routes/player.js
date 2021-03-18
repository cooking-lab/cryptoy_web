// '/player' directory

const express = require('express');
const mongoods = require('mongoose');
const router = express.Router();

const dbAddress = "";

router.post('/', (req,res) => {
    let result = {};
    let userId = req.params.userId;
    let userPassword = req.params.userPassword;
    let userNickname = req.params.userNickname;
})

router.get('/', (req, res) => {console.log("GOOD CONNECT")});
router.post('/signup', (req, res) => {
    console.log("GOOD CONNECT")
});

module.exports = router;