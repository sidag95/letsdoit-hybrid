var express = require('express');
var router = express.Router();
var ctrlTasks = require('../controllers/controller.api.tasks');

router.get('/tasks', ctrlTasks.tasksList);
router.get('/tasks/:taskId', ctrlTasks.taskFindOne);
router.post('/tasks/new', ctrlTasks.taskCreate);
router.put('/tasks/:taskId', ctrlTasks.taskUpdateOne);
router.delete('/tasks/:taskId', ctrlTasks.taskDeleteOne);

module.exports = router;