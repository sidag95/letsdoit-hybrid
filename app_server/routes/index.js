var express = require('express');
var router = express.Router();
var ctrlTasks = require('../controllers/controller.server.tasks');
var ctrlOthers = require('../controllers/controller.server.others');
var ctrlUsers = require('../controllers/controller.server.users');

/* Others pages. */
router.get('/', ctrlOthers.home);
router.get('/about', ctrlOthers.about);

/* Users pages. */
router.get('/signup', ctrlUsers.signup);
router.get('/login', ctrlUsers.login);

/* Tasks pages. */
router.get('/lists', ctrlTasks.lists);
router.get('/lists/new', ctrlTasks.listsNew);
router.post('/lists/new', ctrlTasks.listsAddNew);
router.get('/lists/:listId', ctrlTasks.lists);
router.get('/lists/edit/:listId', ctrlTasks.editList);
router.post('/lists/edit/:listId', ctrlTasks.editUpdateList);
router.delete('/lists/:listId', ctrlTasks.deleteTask);

module.exports = router;