$(function(){
	var oBox = $('#banner');
	var oDiv = $('.bannerImgContainer');
	var oImg = oDiv.find('.item');
	var oPrev = $('.arrowLeft');    //左按钮
	var oNext = $('.arrowRight');   //右按钮
	var index = 0;
	var timer = null;
	var prevTimer = null;
	var nextTimer = null;
	/*var oLi = $('.dian li');*/
	var oLi = $(".pointerNavContainer li");
	
	var windowWidth = $(window).width();
	//alert(windowWidth);
	oImg.css({"width":windowWidth});
	
	
	
	oPrev.click(function(){
		//alert("1111");
		clearTimeout(nextTimer);
		nextTimer = setTimeout(function(){
			doPrev();
		},200)
		
	});
	oNext.click(function(){
		clearTimeout(prevTimer);
		prevTimer = setTimeout(function(){
			doNext();
		},200)
		
	});
	function doPrev(){
	    index--;
	    
		if(index < 0){
			index = oImg.length -1;
		}
		
		oLi.removeClass('green').eq(index).addClass('green');
		oDiv.find('img.item:last').insertBefore(oDiv.find('img.item:first'));   /*last 放到 first 的前面*/
		
		oDiv.animate({"left":-windowWidth},0);
		oDiv.animate({"left":"0px"},1000);
	};
	function doNext(){
		index++;
		if(index>oImg.length -1){
			index = 0;
		}
		oLi.removeClass('green').eq(index).addClass('green');
		oDiv.animate({"left":-windowWidth},1000,function(){          /*move.js*/
			oDiv.append(oDiv.find('.item:first')).animate({"left":0},0)
		})
	}
	/***鼠标悬停在图片上停止轮播**/
	oBox.hover(function(){
		clearInterval(timer);
	},autoMove)
	/**自动播放**/
	function autoMove(){
		clearInterval(timer);
		timer = setInterval(function(){
			doNext();
		},2000)
	}
	autoMove();
	
	
	/**点击导航 跳转到响应页面**/
//	$(".pointerNavContainer li").click(function(){
//	    
//	    var index_new = $(this).index();
//		
//		var l_r = (index_new > index) ? "fadeInLeft": "fadeInRight";
//		index = index_new;
//		doFade(l_r);
//	})
//	function doFade(l_r){
//		banner_wrap.fadeOut(300).eq(index).fadeIn(300);
//		oLi.removeClass('green').eq(index).addClass('green');
//		banner_wrap.find('h1').attr('class',"").addClass('animated ' + l_r);    /*animate.css*/
//	};
})
