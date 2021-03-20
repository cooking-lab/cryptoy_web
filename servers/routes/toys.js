const express = require('express');
const router = express.Router();

var path = require("path");
var java = require("java");

// java.classpath.push(path.resolve('./lib/ver0.85.jar'));
// var DBClass = java.import('manager.GameManager');
// var gm = new DBClass();

// router.get('/', (req, res) => {
//     res.send(gm.getCharacterSync("00000cf0b1e487ad9b6e8386fd1d34f3f0b6e018dd7c0835c6e9e2d404269510"));
// });

module.exports = router;