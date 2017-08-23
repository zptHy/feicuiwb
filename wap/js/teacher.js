$(function(){
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	
	$.ajax({
        async: false,　　　　　　　
        type: "get",   
        url: "../json/teacher.json",  
        cache: false,
        dataType: "json",
        success: function(result) {  
        	if(result.code = 200){
	        	var data = result.data;
	      		var imgSrc;
	      		var name;
	      		var description;
	      		var newsClone;
	      		var length=data.length;
	            for(var i=0;i<length;i++){
	                imgSrc=result.data[i].avatar;
	                name = result.data[i].name;
	                description = result.data[i].description;
	                newsClone=$(".mySwiper01 .none").clone();
	                newsClone.removeClass("none");
	                newsClone.find("img:nth-of-type(1)").attr("src","../upload/"+imgSrc);
					newsClone.find("p.name").html(name);
					newsClone.find("p.des").html(description);
	                $(".mySwiper01 .swiper-wrapper").append(newsClone);
	        	}
        	}else{
        		alert("请求失败！")
        	}
        	
        },
        error:function(){
        	alert("失败！")
        }
            
            
    });
  
    var mySwiper01 = new Swiper('.mySwiper01',{
				lazyLoading : true,
				autoplay: 3000,//可选选项，自动滑动
				lazyLoadingInPrevNext : true,
				lazyLoadingInPrevNextAmount : 2,
				slidesPerView : 3,
				spaceBetween : 10
			});
})