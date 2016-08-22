var mongoose = require('mongoose');
var Task = mongoose.model("Task");



var sendJsonResponse = function(res, status, content) {
res.status(status);
res.json(content);
};


module.exports.tasksList = function(req, res){
	Task.find().exec(function(err, tasks){
		if(!tasks){
			sendJsonResponse(res, 404, { 
				message : "No tasks found"
			});
			return;
		}
		else if(err){
			sendJsonResponse(res, 400, err);
			return;
		}
		sendJsonResponse(res, 200, tasks);
	});
};

module.exports.taskCreate = function(req, res){
	Task.create({
		taskName : req.body.taskName,
		taskBody : req.body.taskBody,
		done : false
	},
	function(err, task){
			if(err){
				sendJsonResponse(res, 400, err)
			}
			else{
				sendJsonResponse(res, 201, task)
			}
	});
};

module.exports.taskUpdateOne = function(req, res){
	if(!req.params.taskId){
		sendJsonResponse(res, 405, {"message" :"Task Id is required."});
		return;
	}
	Task.findById(req.params.taskId).exec(function(err, task){
		if(!task){
			sendJsonResponse(res, 404, {"message" : "No task found."});
			return;
		}
		else if(err){
			sendJsonResponse(res, 400, err);
			return;
		}
		task.taskName = req.body.taskName;
		task.taskBody = req.body.taskBody;
		task.save(function(err, task){
			if(err){
				sendJsonResponse(res, 404, err);
			}
			else{
				sendJsonResponse(res, 200, task);
			}
		});
	});

};

module.exports.taskDeleteOne = function(req, res){
	var taskId = req.params.taskId;
	if(taskId){
		Task.findById(taskId).exec(function(err, task){
			// do something
				task.remove(function(err, task){
				if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 204, null);
			});
		});
	}
	else{
		sendJsonResponse(res, 404, {"message" : "No task id."});
	}
};	

module.exports.taskFindOne = function(req, res){
	var taskId = req.params.taskId;
	if(taskId){
		Task.findById(taskId).exec(function(err, task){
			if(!task){
				sendJsonResponse(res, 404, { 
					message : "No tasks found"
				});
				return;
			}
			else if(err){
				sendJsonResponse(res, 400, err);
				return;
			}
			sendJsonResponse(res, 200, task);
		});
	}
};