$(function(){
	function login(){
		var username = $("#username").val().trim();
		var psw = $("#psw").val().trim();
		var verification = $("#verification").val().trim();
		if(username==""){
			$("#myAlert").show();
			$("#alertinfo").text("用户名不能为空");
			$("#username").focus();
			return;
		}
		if(psw==""){
			$("#myAlert").show();
			$("#alertinfo").text("密码不能为空");
			$("#psw").focus();
			return;
		}
		if(verification==""){
			$("#myAlert").show();
			$("#alertinfo").text("验证码不能为空");
			$("#verification").focus();
			return;
		}
		
		
		$.ajax({
			type:"get",
			url:"/feicuiwb/user/login?username="+username+"&password="+psw+"&code="+verification,
			async:true,
			success: function(res){
				if(res.code===200){
					window.location.href = "index.html";
				}else{
					$("#myAlert").show();
					$("#alertinfo").text(res.msg);
					$("#yzm").attr("src", "/feicuiwb/user/code?r="+Math.random());
				}
			},
			error: function(err){
				$("#alertinfo").text("登录失败");
			}
		});
	}
	
	$("#login").click(login);
	// 回车事件
	document.onkeydown = function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e && e.keyCode==13){
			login();
		}
	}
	
	$(".close").click(function(){
		$("#myAlert").hide();
	});
	
	$("#yzm").click(function(){
		$(this).attr("src", "/feicuiwb/user/code?r="+Math.random());
	});
})
