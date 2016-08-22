$(document).ready(function(){
	$(".undo").hide();
	var id, taskId;
	$(".tick-btn").click(function(){
		$(this).parent().siblings(".task-text").children("p").toggleClass("strike-through");
		$(this).children(".tick").toggleClass("glyphicon-ok").toggleClass("glyphicon-remove");
	});	
	$(".delete-btn").click(function(){
		var parent = $(this).parents('.tasks');
		parent.hide(500);
		id = '#' + parent.attr('id');
		$(".undo").show(500);
		setTimeout(function(){
			$(".undo").hide(500);
		},6000);
		setTimeout(function(){
			if(id){
				console.log("hello");
				id = id.substring(1);
				var url = '/lists/' + id;
				$.ajax({
				    url: url,
				    type: 'DELETE'
				    }).done(function(result) {
				        console.log("Done");
				        $(".undo").hide(500);
				});
			}
		}, 8000);
	});
	$(".undo").click(function(){
		$(id).show(500);
		id=null;
		$(".undo").hide(500);
	});
	$(".pencil-btn").click(function(e){
		e.preventDefault();
		taskId = $(this).parents(".tasks").attr('id');
		console.log(window.location.pathname);
		window.location = window.location.pathname + "/edit/"+taskId;
	})
});
