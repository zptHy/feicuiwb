$(function(){
	window.onload = function(){
		$(".div2").click(function(){ 
			$(this).next("div").slideToggle("slow")  
			.siblings(".div3:visible").slideUp("slow");
		});
		$(".divone").click(function(){
			$(this).siblings(".div3:visible").slideUp("slow");
		});
	}
	$.getJSON('json/tab.json',function(data){
		$(".left-wrapper").empty();
		var html = "";
		for(var i=0; i<data.length; i++){
			if(!data[i].isurl){
				html += '<div class="div2"><span class="'+data[i].iconfont+'"></span>  '+data[i].title+'</div><div class="div3"><ul>';
				for(var j=0; j<data[i].subtitle.length; j++){
					html += '<li><a href="'+data[i].subtitle[j].redirecturl+'" target="rightFrame">'+data[i].subtitle[j].title+'</a></li>';
				}
				html += '</ul></div>';
			}else{
				html += '<div class="divone"><a href="'+data[i].redirecturl+'" target="rightFrame"><span class="'+data[i].iconfont+'"></span>  '+data[i].title+'</a></div>';
			}
		}
		$(".left-wrapper").html(html);
	})
	$(".loginout").click(function(){
		$.ajax({
			type:"get",
			url:"/feicuiwb/user/logout",
			async:true,
			success: function(){
				window.location.href = "login.html";
			}
		});
	});
});
