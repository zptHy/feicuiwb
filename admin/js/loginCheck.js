;(function(){
	// 登录判断
	$.ajax({
		type:"get",
		url:"login",
		async:false,
		success: function(res){
			
		},
		error: function(err){
			alert('login error');
		}
	});
});
