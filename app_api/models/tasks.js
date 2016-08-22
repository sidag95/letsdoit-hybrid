var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	taskName : {type : String, required : true},
	taskBody : {type : String, required : true},
	done : { type : Boolean, "default" : false}
});

mongoose.model("Task", taskSchema);