$(function(){
	/***全局变量**/
	var GLOBAL = GLOBAL || {};
	/**专业个数**/
	GLOBAL.isPlaying = false;
    //所有页面的点击logo，调到首页
	$("#logo").click(function(){
		window.location.href= "index.html";
	});
	
	/**头部的导航下换线**/
	$(".navLi").click(function(){
		$(this).children("a").addClass("active");
	})

	/*********************课程介绍*******************/
	/**点击右侧按钮换页***/
	function rightLunbo(length){
		//alert(length);
		var liWidth = 376;
		
		for (var i = 0;i<=length;i++){
			
			$(".courseIntroduction li").eq(i).animate({
				
				"left":i*liWidth-liWidth*3+"px"
				
			},1000)
			
		}
	}
	/**点击左侧按钮换页***/
	function leftLunbo(length){
		var n = 1;
		n++
		var liWidth = 376;
		for (var i = 0;i<=length;i++){
			/*$(".courseIntroduction li").eq(i).css("left",i*liWidth+"px");*/
			$(".courseIntroduction li").eq(i).animate({
				"left":i*liWidth+"px"
			},1000)
		}
	}

	
	/**点击右侧按钮的时候导航变绿色**/
	function rightArrowNavChange(){
		$(".courseIntrDot li").removeClass("changeNavActive");
		//GLOBAL.this.addClass("changeNavActive");
		
		$(".courseIntrDot li").eq(1).addClass("changeNavActive");
		rightLunbo(length);
	}
	/**点击左侧按钮的时候导航变绿色**/
	function leftArrowNavChange(){
		$(".courseIntrDot li").removeClass("changeNavActive");
		//GLOBAL.this.addClass("changeNavActive");
		GLOBAL.basicIndex -= 1;
		if(GLOBAL.basicIndex = 0){
			$(".courseIntrDot li").eq(0).addClass("changeNavActive");
		}
		$(".courseIntrDot li").eq(GLOBAL.basicIndex).addClass("changeNavActive");
		leftLunbo(length);
	}
	
	
	GLOBAL.movingInterval = 200;
	
	
	/**课程咨询**/
    $(".courseBtn").click(function(){
   	    window.location.href= "index.html";  //TODO
    }) 
    /**更多动态**/
    $(".newsBtn").click(function(){
    	window.location.href= "feicuinews.html";  //TODO
    })
    /**翡翠新闻的tab点击切换**/
    $(".taba").click(function(){
       var index = $(this).index();
       $(this).addClass("tabhover").siblings('.taba').removeClass('tabhover');
   	   $('.newsContent').eq(index).fadeIn(1000).siblings('.newsContent').hide();
    });
  
 
    /**************************数据交互******************************/
    /***banner 轮播效果数据**/
    $.ajax({
        async: true,　　　　　　　
        type: "get",   
        url: "../json/homeLoopImg.json",   
        cache: false,
        dataType: "json",
        success: function(json) {  
        	//console.log(json);
        	if(json.code == 200){
        		var list = "";
        		var data = json.data;  /**数组**/
			  	data.forEach(function(item,index){
		   	    	
		   	    	//studentsMessage(item,index);
					list += '<div class="swiper-slide"><a target="_blank" href="'+item.url+'"><img data-src="'+"../upload/"+ item.imgurl+'" alt="" class="ban1 swiper-lazy"></a></div>'
					/***挂载到dom树**/
		   	    	$(".swiper-wrapper").html(list);
		   	    	
		   	    	$(".swiper-slide").click(function(){
			   	    	window.location.href= item.url;  
			   	    })

				});
		   	    
		   	    var mySwiper = new Swiper ('.swiper-container', {
			        slidePerView: 'auto',
			        centerSliders: true,
			        pagination: '.pagination',
			        paginationElement : 'li',
			        // 如果需要前进后退按钮
			        nextButton: '.swiper-button-next',
			        prevButton: '.swiper-button-prev',
			        paginationClickable: true,
			        loop: true,
			        autoplay: 2000,
			        speed: 1000,
			        keyboardControl: true,
			        loopedSlides: 10,
			        autoplayDisableOnInteraction: false,
			        lazyLoading : true
			        //effect: 'fade',
			        //paginationType : 'custom'
		    	});
			    $(".swiper-wrapper").mouseenter(function(){
			        mySwiper.stopAutoplay();
			    }).mouseleave(function(){
			        mySwiper.startAutoplay();
			    })
			    $(".banner img").css("height","500px");
		   	}
        	else{
				alert("请求失败");
			}
		   	
        },
        error : function() { 
	    	alert("异常！"); 
   		} 
    });
   
    /****课程介绍的ajax****/
    $.ajax({
        async: true,　　　　　　　
        type: "get",   
        url: "../json/homeCourse.json",   
        cache: false,
        dataType: "json",
        success: function(result) {  
        	///////////////////
        	if(result.code == 200){
	        	var courseList = "";
	        	var subjectsList = "";
	        	var courseItem = "";
	        	var data = result.data;  /**数组**/
			   	data.forEach(function(item,index){
			   		subjectsList += 
					"<li>"+
					    "<a href="+item.url+">"+item.chineseName+"</a>"+
					"</li>"; 
					
					courseItem += 
					"<li>"+
					   item.chineseName+
					"</li>"; 
					headerAndFooterSubjectsFun(item,index);
					footerPhoneAndAdrrFunc(item,index);
	   	    	});
	   	    	$(".sub_nav").html(subjectsList);
	   	    	$(".courseSet").after(courseItem);
			   	var length = data.length;   /**数组长度**/
		   	    for(var i=0;i<length;i++){
	                var imgSrc=result.data[i].img;  /***图片路径**/
	                var posterMainTitle = result.data[i].chineseName; 
	                var posterSubsTitle = result.data[i].englishName;  
	                var posterTxt = result.data[i].description;       
	                var url = result.data[i].url;                      
	                
	                var newsClone=$(".course li.subjects").eq(0).clone();	    
	                
	                newsClone.removeClass("none");
	                newsClone.find("img").attr("src","../upload/"+imgSrc);
	                newsClone.find(".poster .posterMainTitle").html(posterMainTitle);
	                newsClone.find(".poster .posterSubsTitle").html(posterSubsTitle);
	                newsClone.find(".poster .posterTxt").html(posterTxt);
	                newsClone.find(".poster .posterBtn").attr("href", url);
	                /*newsClone.find(".poster .posterBtn").click(function(){
	               		window.location.href = url;
        			})*/
	                /***加载到dom树**/
	                $(".course .clearfix").append(newsClone);
                }
	        	////////////////////
			    $('.lession_hover').hover(function(){
			    	$('.sub_nav').show();
				},function(){
					$('.sub_nav').hide();
				})
				$(".outstandingStudent_hover").hover(function(){
					$('.studentSub_nav').show();
				},function(){
					$('.studentSub_nav').hide();
				
				})
                /***鼠标悬停动画**/
				courseAnimate();
				
				//师资轮播
	        	//师资轮播
	        	//师资轮播
	
				var oDiv = $('.courseIntrInner');
				var oPrev = oDiv.find(".prev");
				var oNext = oDiv.find(".next");
				var moveDiv = oDiv.find(".clearfix");
				var li = moveDiv.find("li");
				var timer = null;
				var nextTimer = null;
				var prevTimer = null;
				var nowIndex = 0;
				
				oPrev.click(function(){
					clearTimeout( prevTimer );
					prevTimer = setTimeout(function(){
						doPrev();
					},200)
					
				});
				oNext.click(function(){
					clearTimeout( nextTimer );
					nextTimer = setTimeout(function(){
						doNext();
					},200)
					
				});
				oDiv.hover(function(){
						clearInterval( timer );
				}, autoMove)
				
				function autoMove(){
					clearInterval( timer );
					timer = setInterval(function(){
							doNext();
					},5500)
					
				}
				autoMove();
				
				function doPrev(){
					moveDiv.find("li:last").insertBefore(moveDiv.find("li:first"));
					moveDiv.animate({"left": "-348px"},0);
					moveDiv.animate({"left": "0px"},1000,'backIn');
				}
				
				function doNext(){
					moveDiv.animate({"left": "-348px"},1000,'backIn',function(){
						moveDiv.find("li:first").appendTo(moveDiv);
						moveDiv.animate({"left": "0px"},0);
					});
				}
			   
				
			}else{
				alert("请求失败");
			}
        },
        error : function() { 
	    	alert("异常！"); 
   		} 
    });
    /***尾部数据  的电话号码+地址***/
	$.ajax({
        async: true,　　　　　　　　　
        type: "get",   
        url: "../json/homeWebsiteInfo.json",   
        cache: false,
        dataType: "json",
        success: function(json) {  
        	if(json.code == 200){
        		var data = json.data;  /**数组**/
	   	    	data.forEach(function(item,index){
		   	    	footerPhoneAndAdrrFunc(item,index);
	   	    	});
	   	    }else{
				alert("请求失败");
			}
        }
    });
    
    /**头尾的课程列表数据**/
	function headerAndFooterSubjectsFun(item,index) {
		var headerSubjects = $(".sub_nav li").eq(index);
		var footerCourse = $(".footerCourse li").eq(index+1);
		headerSubjects.find("a").html(item.chineseName);       // 头部的课程数据
		/*alert(item.chineseName);*/
		footerCourse.html(item.chineseName);                   // 尾部的课程数据
		
	}
	/**尾部电话和地址数据**/
	function footerPhoneAndAdrrFunc(item,index) {
		var footerPhone = $(".footerPhone");
		var footerAddr = $(".footerAddr");
		footerPhone.html(item.tel);                            // 尾部电话号
		footerAddr.html(item.address);                         // 尾部地址
		
	}
   
    /**翡翠新闻**/
    $.ajax({
        async: true,　　　　　　　　　
        type: "get",   
        url: "../json/homeNews.json",   
        cache: false,
        dataType: "json",
        success: function(json) {  
        	if(json.code == 200){
		   	var data = json.data;  /**数组**/
	   	    data.forEach(function(item,index){
	   	    	newsFunc(item,index);
	   	    });
			}else{
				alert("请求失败");
			}
        },
        error : function() { 
	    	alert("异常！"); 
   		} 
    });
   
    
	

	/**banner轮播赋值**/
	function bannerLunbo(item,index){
		var slides = $(".slides li").eq(index);
		slides.find("img").click(function(){              // 点击课程详情的跳转地址
   	    	window.location.href= item.url;  
    	});
	}
	/**首页课程介绍的鼠标悬停效果**/;
	function courseAnimate(){
		$(".subjects").delegate(".poster","mouseover",function(event){
		    $(this).stop().animate({
		    		"top":"62px",
		    		"box-shadow":"0 0 10px 10px #d5ebdd"
			},GLOBAL.movingInterval);
			$(this).find(".posterTitleLine").css({"background":"#01a83f","margin-top":"24px"});
	    	$(this).find(".posterMainTitle").css({"color":"#01a83f","padding-top":"20px"});
	    	$(this).find(".posterSubsTitle").css("color","#01a83f");
	    	$(this).find(".posterTxt").css("display","block");
		});
		$(".subjects").delegate(".poster","mouseout",function(event){
		    $(this).stop().animate({
	    		"top":"226px",
	    		"box-shadow":"0 0 0 0 #d5ebdd"
	    	},GLOBAL.movingInterval);
	    	
	    	$(this).find(".posterTxt").css("display","none");
			$(this).find(".posterTitleLine").css({"background":"#434343","margin-top":"13px"});
	    	$(this).find(".posterMainTitle").css({"color":"#434343","padding-top":"48px"});
	    	$(this).find(".posterSubsTitle").css("color","#434343");	 
		});
	}
	
	/****翡翠新闻*****/
	function newsFunc(item,index) {
		var newsList = $(".taba").eq(index);
		var newsCentent = $(".newsContent").eq(index);
		
		/**转化时间戳**/
		var time = item.publishTime.time;
		
		function   formatDate(now)   {     
            GLOBAL.year=now.getFullYear(); 
            GLOBAL.month=now.getMonth()+1;     
            GLOBAL.date=now.getDate(); 
            if(GLOBAL.month<10){
            	GLOBAL.month ="0"+GLOBAL.month
            }else{
            	GLOBAL.month =GLOBAL.month
            }
            if(GLOBAL.date<10){
            	GLOBAL.date ="0"+GLOBAL.date;
            }else{
            	GLOBAL.date = GLOBAL.date;
            }
           
            var   hour=now.getHours();     
            var   minute=now.getMinutes();     
            var   second=now.getSeconds();     
            return    GLOBAL.year+"-"+GLOBAL.month+"-"+GLOBAL.date+"   "+hour+":"+minute+":"+second;     
        }
        var   d=new  Date(time);     
        formatDate(d); 
		
		newsList.find(".newsTitle").html(item.title);                 // 新闻列表
		newsList.find(".listMonth").html( GLOBAL.month);              // 月份
		newsList.find(".date").html(GLOBAL.date);                     // 日期
		/**新闻内容**/
		
		newsCentent.find(".newsYear").html( GLOBAL.year);              // 年
		newsCentent.find(".titleMonth").html( GLOBAL.month);           // 月
		newsCentent.find(".newsDate").html( GLOBAL.date);              // 日期
		newsCentent.find(".newContentHeadTi").html(item.title);        // 列表标题            
		
		newsCentent.find("img").attr("src","../upload/"+item.img);                // 图片路径
		newsCentent.find(".newsContentText").html(item.description);   //新闻描述
		
		
	}
	/**视频    滚动条监听事件***/
	$(window.document).scroll(function () {
		/****/
		var a = $(".studentsIntroduction").offset().top;
		
		var windowTop = $(window.document).scrollTop();
		if(!GLOBAL.isPlaying && windowTop>a-400 && windowTop<a+180){
			var myPlayer = videojs('my-video');
			videojs("my-video").ready(function(){
				var myPlayer = this;
				myPlayer.play();
				GLOBAL.isPlaying= true;
			});
		}else if (GLOBAL.isPlaying && (windowTop<a-600|| windowTop>a+100)){
			var myPlayer = videojs('my-video');
			videojs("my-video").ready(function(){
				var myPlayer = this;
				myPlayer.pause();
				GLOBAL.isPlaying= false;
			});
		}
	    
	 
    });
   
    /**取到**/
    var clientName  = $(".nameText").val();
    var clientPhone = $(".phoneText").val();
    
   
    /****数据校验**/
    
    /***点击立即预定座位上传数据**/
    $(".reservation").click(function(){
    	/**取到**/
	    clientName  = $(".nameText").val();
	    clientPhone = $(".phoneText").val();
	    if(clientName==""){
			alert("请录入您的姓名或昵称!");
			return;
		}
		if(!isPhoneMatch()){
			alert("请填写正确的手机");
			return;
		}
    	postNameAndPhone();

    })
	
     //判断输入的字符是否满足要求
	function isNameMatch() {
		var clientName  = $(".nameText").val();
		var patten = new RegExp("^([\u4E00-\u9FA5]{2,5})$");
		return patten.test(clientName);
	}
	//非法字符的验证
	/*function isLegalChar() {
		var clientName  = $(".nameText").val();
		var patten =/[`~!@#$%^&*_+<>{}\/'[\]]/im;
		return patten.test(clientName);
	}*/
    //判断输入的电话是否满足要求
    function isPhoneMatch(){
    	var clientPhone = $(".phoneText").val();
		var pattern = /^1[34578]\d{9}$/;   
		return pattern.test(clientPhone);
    }
    
    //获得字符串的字节数
	function getCharSize(str) {
		var realLength = 0,
			len = str.length,
			charCode = -1;
		for (var i = 0; i < len; i++) {
			charCode = str.charCodeAt(i);
			if (charCode >= 0 && charCode <= 128)
				realLength += 1;
			else
				realLength += 2;
		}
		return realLength;
	}
    
   
    
    /**上传姓名和电话***/
    function postNameAndPhone(){
	 	
	    $.ajax({
	        async: true,　　　　　　　
	        type: "post",   
	        url: "/feicuiwb/enroll/insertEnroll",
            dataType: "json",
	        data:{
	        	name:clientName,  
	        	telphone:clientPhone  
	        },
	        success: function(json) {  
	        	$(".nameText").val("");
    			$(".phoneText").val("");
	        	alert(json.msg);
	        },
	        error : function() { 
		    	alert("网络错误"); 
	   		} 
	    });
	}
	
	
	//ip地址获取更改头部地区
	
	//根据ip地址获取地理位置
	        var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
	        $.getJSON(url, function(data) {
	            var ip = data.Ip;
	            $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=' + ip, function(_result) {
	                // console.log(remote_ip_info.city);
	                //城市
	                var xuanxiang = remote_ip_info.city;
	          		$('.location>.right:nth-of-type(3)').html(xuanxiang);
	            });
	        	});
	
})		