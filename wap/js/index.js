$(function(){
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	
	/*轮播图数据*/
	$.ajax({
        async: false,　　　　　　　
        type: "get",   
        url: "../json/homeLoopImg.json",   
        cache: false,
        dataType: "json",
        success: function(result) {
        	if(result.code == 200){
        		var arr = new Array();
        		var imgSrc;
        		var newsClone;
        		var href;
	        	var data = result.data;
	            for(var i=0;i<data.length;i++){
	            	href = data[i].url;
	            	arr.push(href);
	                imgSrc=result.data[i].imgurlMobile;
	                newsClone=$(".mySwiper01 .none").clone();
	                newsClone.removeClass("none");
	                newsClone.find("img").attr("data-src","../upload/"+imgSrc);
					
	                $(".mySwiper01 .swiper-wrapper").append(newsClone);
	                
	                $(".mySwiper01 .swiper-wrapper .swiper-slide").eq(i).click(function(){
		                window.location.href = arr[$(this).index()-1];
		            });
	        	}	
        	}else{
        		alert("请求失败！")
        	}
        },
        error:function(){
        	alert("异常！")
        }
    });
	
	
	/*课程介绍数据*/
	$.ajax({
        async: false,　　　　　　　
        type: "get",   
        url: "../json/homeCourse.json",   
        cache: false,
        dataType: "json",
        success: function(result) {
        	if(result.code == 200){
        		
	        	var data = result.data;
	        	var arr = new Array();
	        	var href;
	        	var name;
	        	var des;
	        	var imgSrc;
	        	var newsClone;
	            for(var i=0;i<data.length;i++){
	            	
	            	href = data[i].url;
	            	arr.push(href);
	            	name = result.data[i].chineseName;
	            	des = result.data[i].description;
	                imgSrc=result.data[i].imgMobile;
	                newsClone=$(".mySwiper02 .none").clone();
	                newsClone.removeClass("none");
	                newsClone.find("img").attr("data-src","../upload/"+imgSrc);
					newsClone.find("h6").html(name);
					newsClone.find("p").html(des);
	                $(".mySwiper02 .swiper-wrapper").append(newsClone);
	                
	                /*跳转*/
	              $(".mySwiper02 .swiper-wrapper .swiper-slide").eq(i).click(function(){
	                window.location.href = arr[$(this).index()];
	              });
	        	}	
	        
        	}else{
        		alert("请求失败！")
        	}
        	
        	
        },
        error:function(){
        	alert("异常！")
        }
    });
	
	
	/*翡翠新闻*/
	$.ajax({
        async: false,　　　　　　　
        type: "get",   
        url: "../json/homeNews.json",   
        cache: false,
        dataType: "json",
        success: function(result) {
        	if(result.code == 200){
        		var data = result.data;
        		var arr = new Array();
        		var imgSrc;
        		var title;
        		var newsClone;
        		
	            for(var i=0;i<data.length;i++){
	                imgSrc=result.data[i].imgMobile;
	                title=result.data[i].title;
	                newsClone=$(".mySwiper03 .none").clone();
	                newsClone.removeClass("none");
	                newsClone.attr("newId",data[i].id);
	                newsClone.find("img").attr("data-src","../upload/"+imgSrc);  
					newsClone.find("h3").html(title);
	                $(".mySwiper03 .swiper-wrapper").append(newsClone);

	        	};
	        	
	        	var dataList = data.length;
	        	var type;
	        	dataList=dataList>3?3:dataList;
	        	for(var j=0;j<dataList;j++){
	        		imgSrc=result.data[j].imgMobile;
	        		title=result.data[j].title;
	        		type=result.data[j].type;
	        		var newsClone=$(".xinwenList .none").clone();
	        		newsClone.removeClass("none");
	        		newsClone.attr("newId",data[j].id);
	        		newsClone.find("img").attr("src","../upload/"+imgSrc);
					newsClone.find("h3").html(title);
					newsClone.find("p:nth-of-type(1)").html(type);
					newsClone.find("p:nth-of-type(2)").html("10000+");
					$(".xinwenList").append(newsClone);
					
	        	}
	        	
        	}else{
        		alert("请求失败！")
        	}
        	
        },
        error:function(){
        	alert("异常！")
        }
    });
	
	

	
	//	点击列表
	$('.mySwiper03').delegate('.swiper-slide', 'click', function () {
		
		console.log($(this).attr('newId'));
		var Url = getUrlParams('type');
		window.open( 'feicuiarticle.html'+"?type=newsDetails"+'&newId='+$(this).attr('newId') );
	});
	$('.xinwenList').delegate('.news', 'click', function () {
		var Url = getUrlParams('type');
		window.open( 'feicuiarticle.html'+"?type=newsDetails"+'&newId='+$(this).attr('newId') );
	});
  
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
	
	
	/*swiper 滑动*/
	var mySwiper01 = new Swiper ('.mySwiper01', {
		autoplay: 3000,//可选选项，自动滑动
	    direction: 'horizontal',
	    lazyLoading : true,
		lazyLoadingInPrevNext : true,
		lazyLoadingInPrevNextAmount : 2,
	    loop: true,
	    autoplayDisableOnInteraction : false,
	    // 如果需要分页器
	    pagination: '.swiper-pagination'
	});
	
	
	var mySwiper02 = new Swiper('.mySwiper02',{
		lazyLoading : true,
		//autoplay: 3000,可选选项，自动滑动
		lazyLoadingInPrevNext : true,
		lazyLoadingInPrevNextAmount : 2,
		slidesPerView : 3,
		spaceBetween : 10
	});
	
	var mySwiper03 = new Swiper('.mySwiper03',{
		//autoplay: 3000,//可选选项，自动滑动
		pagination : '.swiper-pagination',
		paginationType : 'fraction',
		lazyLoading : true,
		lazyLoadingInPrevNext : true,
		lazyLoadingInPrevNextAmount : 1,
	    loop: true
		//autoplay: 3000可选选项，自动滑动
		//paginationType : 'progress',
		//paginationType : 'custom',
	});
})
