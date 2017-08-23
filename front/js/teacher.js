$(function(){
	/*$('#header').load('header.html');
	$('#footer').load('footer.html');*/
	$("nav>li>a").removeClass("active");
	$("nav>li:nth-child(4)>a").addClass("active");
	var GLOBAL = GLOBAL || {};

	$(window).scroll(function(){
		var dl_01 = $('.teacher_part1 dl');
		var li_02 = $('.teacher_part2 ul li');
		if($(document).scrollTop()>$('.teacher_part1').offset().top-$(window).height()+300){
			/**     选对老师 才能选对学校        **/
			setTimeout(function(){
				dl_01.eq(0).css({"display":"block"}).find("dt").addClass('animated bounceInLeft');
				dl_01.eq(0).find("dd").addClass('animated bounceInRight');
			},100);
			setTimeout(function(){
				dl_01.eq(1).css({"display":"block"}).find("dt").addClass('animated bounceInLeft');
				dl_01.eq(1).find("dd").addClass('animated bounceInRight');
			},300);
			setTimeout(function(){
				dl_01.eq(2).css({"display":"block"}).find("dt").addClass('animated bounceInLeft');
				dl_01.eq(2).find("dd").addClass('animated bounceInRight');
			},500);
		}
		/**     能者为师        **/
		if($(document).scrollTop()>$('.teacher_part2').offset().top-$(window).height()+300){
			setTimeout(function(){
				li_02.eq(0).css({"display":"block"}).addClass('animated bounceInRight');
			},100);
			setTimeout(function(){
				li_02.eq(1).css({"display":"block"}).addClass('animated bounceInRight');
			},300);
			setTimeout(function(){
				li_02.eq(2).css({"display":"block"}).addClass('animated bounceInRight');
			},500);
			setTimeout(function(){
				li_02.eq(3).css({"display":"block"}).addClass('animated bounceInRight');
			},700);
		}
		
	});

	
	$.ajax({
        async: true,　　　　　　　
        type: "get",   
        url: "../json/teacher.json",  
        cache: false,
        dataType: "json",
        success: function(result) {  
        	var data = result.data;
        	var length = data.length;
      		/*data.forEach(function(item,index){
      			$(".teacher_part3 dl").eq(index).find("h3").html(item.name)
      		})*/
      		
      		var length=result.data.length;
            for(var i=0;i<length;i++){
                var imgSrc=result.data[i].avatar;
                var name = result.data[i].name;
                var description = result.data[i].description;
                var newsClone=$(".teacher_part3 dl.none").clone();
                newsClone.removeClass("none");
                newsClone.find("dt img").attr("src","../upload/"+imgSrc);
				newsClone.find("h3").html(name);
				newsClone.find("p").html(description);
                $(".teacher_part3 .clearfix").append(newsClone);
        	
        	}
        		
        		
        	
        	
        	
        	//师资轮播
        	//师资轮播
        	//师资轮播

			var oDiv = $('.prevOrnext');
			var oPrev = oDiv.find(".prev");
			var oNext = oDiv.find(".next");
			var moveDiv = oDiv.find(".clearfix");
			var dl = moveDiv.find("dl");
			var timer = null;
			var nextTimer = null;
			var prevTimer = null;
			var nowIndex = 0;
			
			oPrev.click(function(){
				
				console.log(dl.length)
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
				
				moveDiv.find("dl:last").insertBefore(moveDiv.find("dl:first"));
				moveDiv.animate({"left": "-387px"},0);
				moveDiv.animate({"left": "0px"},1000,'backOut');
			}
			
			function doNext(){
				moveDiv.animate({"left": "-387px"},1000,'backIn',function(){
					moveDiv.find("dl:first").appendTo(moveDiv);
					moveDiv.animate({"left": "0px"},0);
				});
			}
        }
            
            
    });
	    
	   
	  
	    
	    
	    
	    
	
})
