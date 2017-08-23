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
        }
    });
    
	console.log(GLOBAL.data);
	
	loadArticleDetail();
	
  
	//加载数据方法
	function loadArticleDetail () {
		if ( getUrlParams('type') ) {
			for (var i=0;i<GLOBAL.data.length;i++) {
				if ( getUrlParams('newId')==GLOBAL.data[i].id ) {
					var result = GLOBAL.data[i].content;
					$('.news_content').html(result);
				}
			}
		}
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
  
  
  

 



});