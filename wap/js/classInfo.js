$(function(){
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	
	$.ajax({
        async: false,　　　　　　　
        type: "get",   
        url: "../json/classInfo.json",   
        cache: false,
        dataType: "json",
        success: function(result) {
        	if(result.code == 200){
	        	var data = result.data;
	        	var targetDate;
	        	var month;
	        	var day;
	        	var title;
	        	var newsClone;
	        	var lastDate;
	        	var nowDate = new Date();
	        	nowDate = Date.parse(nowDate)/1000;
	            for(var i=0;i<data.length;i++){
	                title=data[i].title;
	                targetDate = data[i].openTime;
	                /*拿到目标时间     月份*/
	                month = targetDate.split("-")[1];
	                /*拿到目标时间     天数*/
	                day = targetDate.split("-")[2];
	                /*转化成时间戳*/
	                targetDate =Date.parse(new Date(targetDate))/1000;
	                lastDate = Math.ceil((targetDate - nowDate)/60/60/24);
	                lastDate = lastDate>0?lastDate:0;
	               
	                
	                /*最新开班信息部分*/
	                newsClone=$(".classlist>li.none").clone();
	                newsClone.removeClass("none");
	                newsClone.find("h4").html(title);
					newsClone.find("p").html("距离开班时间还有"+lastDate+"天");
	                $(".classlist").append(newsClone);
	        	}	
	        	var n = data.length>=7?7:data.length;
	        	var boom_li;
	        	for(var i=0;i<n;i++){
	        		title=data[i].title;
	        		title = title.split("").join("</br>");
	                targetDate = data[i].openTime;
	                /*拿到目标时间     月份*/
	                var month = targetDate.split("-")[1];
	                /*拿到目标时间     天数*/
	                var day = targetDate.split("-")[2];
	                
	                /*火爆开班部分*/
	        		boom_li = $(".boom_class>li.none").clone();
	        		boom_li.removeClass("none");
	        		boom_li.find("p").html(month+"月"+day+"日开班");
	        		boom_li.find("h5").html(title);
	        		$(".boom_class").append(boom_li);
	        	}
        	}else{
        		alert("请求失败！")
        	}
        },
        error:function(){
        	alert("异常！")
        }
            
            
    });
})