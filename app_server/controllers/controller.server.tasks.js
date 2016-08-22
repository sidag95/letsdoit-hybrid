var request = require('request');

var apiOptions = {
	server : "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production'){
	apiOptions.server = "http://";
}

//Show Error
var _showError = function(req, res, status){
	var title, content;
	if(status === 404){
		title = "404, page not found";
		content = "Oh dear. Looks like we can't find this page.";
	}
	else{
		title = status + ", something's gone wrong.";
		content = "Something, somewhere, has gone a little bit wrong";
	}
	res.status(status);
	res.render('error', {
		title : title,
		content : content
	});
};

//Get Task
var getTaskInfo = function(req, res, callback){
	var requestOptions = {} , path;
	path = '/api/tasks';
	if(req.params.listId){
		path = path + '/' + req.params.listId;
		requestOptions.qs = {
			taskId : req.params.listId
		};
	}
	else{
		requestOptions.qs = {};
	}
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};
	request(requestOptions, function(err, response, body){
		callback(req, res, body);
	});
}
// delete a task
var deleteOneTask = function(req, res){
	
};

//render tasks
var renderTasks = function(req, res){
	res.render('lists', {
		title : 'Tasks'
});
};

//render form
var renderEditTaskForm = function(req, res, responseBody){
	res.render('edit-task', {
		title : 'Edit Task',
		task : responseBody,
		url : req.originalUrl
	});
};

//render Add form
var renderAddNewForm = function(req, res){
	res.render('add-task',
		{
			title : "Add new Task",
			error : req.query.err,
			url : req.originalUrl
		});
};


module.exports.lists = function(req, res){
	// getTaskInfo(req, res, function(req, res, responseBody){
	renderTasks(req, res);	
	// });
};


module.exports.listsNew = function(req, res){
	renderAddNewForm(req, res);
};


module.exports.listsAddNew = function(req, res){
	var requestOptions, path, postData;
	path = '/api/tasks/new';
	postData = {
		taskName : req.body.taskName,
		taskBody : req.body.taskBody
	};
	requestOptions = {
		url : apiOptions.server + path,
		method : "POST",
		json : postData
	};
	if (!postData.taskName || !postData.taskBody) {
		res.redirect("/lists/new?err=var");
	} else {
		request(requestOptions, function(err, response, responseBody){
			if(response.statusCode === 201 ){
				res.redirect('/lists');
			}
			else if(response.statusCode === 400 && responseBody.taskName && responseBody.taskName === "ValidationError"){
				res.redirect("/lists/new?err=var");
			}
			else{
				_showError(req, res, response.statusCode);
			}
		});
	}
};


module.exports.editList = function(req, res) {
	getTaskInfo(req, res, function(req, res, responseBody){
		renderEditTaskForm(req, res, responseBody);	
	});
};


module.exports.editUpdateList = function(req, res){
	var requestOptions = {} , path;
	path = '/api/tasks';
	putData = {
		taskName : req.body.taskName,
		taskBody : req.body.taskBody
	};
	if(req.params.listId){
		path = path + '/' + req.params.listId;
		console.log(path);
		requestOptions.qs = {
			taskId : req.params.listId
		};
	}
	else{
		console.log("No TaskId Provided");
	}
	requestOptions = {
		url : apiOptions.server + path,
		method : "PUT",
		json : putData
	};
	request(requestOptions, function(err, response, body){
		console.log(err);
		console.log(body);
		if(response.statusCode === 404)
			res.render("error", {
				title : "Not FOund",
				content : "Error"
			});
		else{
			res.redirect("/lists");
		}
	});

};

module.exports.deleteTask = function(req, res){
	var requestOptions = {} , path;
	path = '/api/tasks';
	if(req.params.listId){
		path = path + '/' + req.params.listId;
		requestOptions.qs = {
			taskId : req.params.listId
		};
	}
	else{
		console.log("No TaskId Provided");
	}
	requestOptions = {
		url : apiOptions.server + path,
		method : "DELETE",
		json : {}
	};
	request(requestOptions, function(err, response, body){
		res.send("Done");
	});
};