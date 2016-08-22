var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/controller.server.users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Users pages. */
router.get('/signup', ctrlUsers.signup);
router.get('/login', ctrlUsers.login);

module.exports = router;
