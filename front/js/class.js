$(function(){
	
	/*$('#header').load('header.html');
	$('#footer').load('footer.html');*/
	
	$.ajax({
        async: true,　　　　　　　
        type: "get",   
        url: "../json/classInfo.json",   
        cache: false,
        dataType: "json",
        success: function(result) {  
        	var data = result.data;
        	var nowDate = new Date();
        	nowDate = Date.parse(nowDate)/1000;
            for(var i=0;i<data.length;i++){
                var title=result.data[i].title;
                var targetDate = result.data[i].openTime;
                /*拿到目标时间     月份*/
                var month = targetDate.split("-")[1];
                /*拿到目标时间     天数*/
                var day = targetDate.split("-")[2];
                /*转化成时间戳*/
                targetDate =Date.parse(new Date(targetDate))/1000;
                var lastDate = Math.ceil((targetDate - nowDate)/60/60/24);
                lastDate = lastDate>0?lastDate:0;
               
                
                /*最新开班信息部分*/
                var newsClone=$(".class_left>li.none").clone();
                newsClone.removeClass("none");
                newsClone.find("p:nth-child(1)").html(title);
				newsClone.find("p:nth-child(2)").html("距离开班时间还有"+lastDate+"天");
                $(".new_class").append(newsClone);
        	
        		
        	}	
        	var n = data.length>=5?5:data.length;
        	for(var i=0;i<n;i++){
        		var title=result.data[i].title;
                var targetDate = result.data[i].openTime;
                /*拿到目标时间     月份*/
                var month = targetDate.split("-")[1];
                /*拿到目标时间     天数*/
                var day = targetDate.split("-")[2];
                
                /*火爆开班部分*/
        		var boom_li = $(".class_right>li").clone();
        		console.log(boom_li.length)
        		boom_li.removeClass("none");
        		boom_li.find("p:nth-child(1)").html(month+"月"+day+"日开班");
        		boom_li.find("p:nth-child(2)").html(title);
        		$(".class_right>ul").append(boom_li);
        	}
        }
            
            
    });
})
