const express = require('express');
const router = express.Router();

var path = require("path");
var java = require("java");

router.post('/test', (req, res) => {
    res.send("test2");
})

module.exports = router;