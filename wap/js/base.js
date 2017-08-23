$(function(){
 	/**点击导航下拉菜单**/
	$(".navToShowDrop").click(function(){
		$(".navDrop").slideToggle(500);
		$(".triangle").slideToggle(500);
	})
	/**点击回退按钮回到首页**/
	$(".backBtn").click(function(){
		window.location.href= "index.html";
	})

    $(".course").click(function(){
    	$(".courseList").slideToggle("1000");
    })
    /***头部数据+尾部数据  的课程数据***/
	$.ajax({
        async: false,　　　　　　　
        type: "get",   
        url: "../json/homeCourse.json",   
        cache: false,
        dataType: "json",
        success: function(json) {  
        	if(json.code == 200){
        		var subjectsList = "";
	    		var data = json.data;  /**数组**/
	    		data.forEach(function(item,index){
	    			subjectsList += 
					"<li>"+
					    "<a href="+item.url+"?type=courseIntro"+">"+item.chineseName+"</a>"+
					"</li>"
	   	    		
	   	    	});
	   	    	$(".courseList").html(subjectsList);
	   	   
			}else{
				alert("请求失败");
			}
        }
    });
	
	if (getUrlParams('type')=='aboutFeicui') {
		$('.headerTxt').html('关于我们');
	}else if(getUrlParams('type')=='teacher'){
		$('.headerTxt').html('师资团队');
	}else if(getUrlParams('type')=='outstandingStudents'){
		$('.headerTxt').html('优秀学员');
	}else if(getUrlParams('type')=='studentswork'){
		$('.headerTxt').html('学员作品');
	}else if(getUrlParams('type')=='cooperation'){
		$('.headerTxt').html('合作企业');
	}else if(getUrlParams('type')=='courseIntro'){
		$('.headerTxt').html('课程介绍');
	}else if(getUrlParams('type')=='classInfo'){
		$('.headerTxt').html('开班信息');
	}
	
	//获取页面url传来的参数
	function  getUrlParams(name) {
		var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
		var r = window.location.search.substring(1).match(reg); //获取到一个数组
		if (r!=null) {
			return r[2];
		}else {
			return '';
		}
	}



	/***尾部数据  的电话号码+地址***/
	$.ajax({
        async: false,　　　　　　　
        type: "get",   
        url: "../json/homeWebsiteInfo.json",   
        cache: false,
        dataType: "json",
        success: function(json) {  
        	if(json.code == 200){
        		var data = json.data;  /**数组**/
        		data.forEach(function(item,index){
		   	    	footerFunc(item,index);
	   	    	});
	   	    }else{
				alert("请求失败");
			}
        }
    });

	/**尾部电话和地址数据**/
	function footerFunc(item,index) {
		var footerPhone = $(".tel");
		var footerAddr = $(".address");
		footerPhone.html(item.tel);                            // 尾部电话号
		footerAddr.html(item.address);                         // 尾部地址
	}
	
	
	
	
	
	
	
	

});

	