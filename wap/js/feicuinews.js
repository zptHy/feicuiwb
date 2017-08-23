var GLOBAL = GLOBAL || {};
$(function () {
	GLOBAL.data = '';
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	
	$.ajax({
        async: false,　　　　　　　
        type: "get",   
        url: "../json/homeNews.json",   
        cache: false,
        dataType: "json",
        success: function(result) {  
      	    GLOBAL.data = result.data;
			loadNews ( GLOBAL.data );
        }
    });
    
	console.log(GLOBAL.data);
	
	//加载列表
	function loadNews (newsData) {
		var itemHtml = '';
		var itemTitle = '';
		
		var msgnum = Math.ceil(Math.random()*10) ;	//0-10
	
		for (var i=0;i < newsData.length;i++) {
			if (i<3) {
				$('.newsTemplate img').attr('src', '../upload/' + newsData[i].imgMobile);
				
				itemHtml = $('.newsTemplate').html().replace('$newId$',newsData[i].id)
													    .replace('$title$',newsData[i].title)
													    .replace('$type$',newsData[i].type)
													    .replace('$msg$', '10000+');
			}else {
				$('.newsTemplate img').attr('src', '../upload/' + newsData[i].imgMobile);	
				
				itemHtml = $('.newsTemplate').html().replace('$newId$',newsData[i].id)
													    .replace('$title$',newsData[i].title)
													    .replace('$type$',newsData[i].type)
													    .replace('$msg$', '8000+');
			}
			$('.news_list').append(itemHtml);  
			
			//图片轮播
			itemTitle =  $('.swiper-model').html().replace('$title$', newsData[i].title);
			$('.swiper-wrapper').append(itemTitle);
		
		}
		
		$('.news_item').each(function (index, element) {
			if ($(this).find('.tip').html().trim()=='新闻') {
				$(this).find('.tip').addClass('tipGreen');
			} else if($(this).find('.tip').html().trim()=='活动') {
				$(this).find('.tip').addClass('tipRed');
				
			}
		});
	}
  
//	点击列表
	$('.news_list').delegate('.news_item', 'click', function () {
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
  
  	//上拉加载  (滚动条高度、滚动条长度以及页面总长度)
  	//获取滚动条当前的位置 
    function getScrollTop() { 
	    var scrollTop = 0; 
	    if (document.documentElement && document.documentElement.scrollTop) { 
	    	scrollTop = document.documentElement.scrollTop; 
	    } else if (document.body) {
	    	scrollTop = document.body.scrollTop; 
	    } 
	    return scrollTop; 
    } 

    //获取当前可视范围的高度 
    function getClientHeight() { 
	    var clientHeight = 0; 
	    if (document.body.clientHeight && document.documentElement.clientHeight) { 
	    	clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
	    } 
	    else { 
	    	clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
	    } 
	    return clientHeight; 
    } 

    //获取文档完整的高度 
    function getScrollHeight() { 
   	 	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
    } 
    //页面滚动时
    window.onscroll = function () { 
	    if (getScrollTop() + getClientHeight() >= getScrollHeight()) { 
		    //ajax新数据从这里开始
		   
	    }
    };

});