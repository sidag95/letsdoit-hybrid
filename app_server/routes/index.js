var express = require('express');
var router = express.Router();
var ctrlServerMain = require('../controllers/controller.server.main')

/* GET home page. */
router.get('/', ctrlServerMain.index);

module.exports = router;
