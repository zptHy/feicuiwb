 var GLOBAL = GLOBAL || {};
(function ($) {
	
	//ajax错误
	$.ajaxSetup({
		error: function () {
			alert('调用列表失败！');
			return false;
		}
	});
	
	//GLOBAL.items = 10; 	//一页10条数据
	GLOBAL.data = '';
	var newsList = '';
	/*
	$('#header').load('header.html');
	$('#footer').load('footer.html');
	*/
    $.ajax({
        async: true,　　　　　　　
        type: "get",   
        url: "../json/homeNews.json",   
        cache: false,
        dataType: "json",
        success: function(result) {  
        	GLOBAL.data = result.data;
        	loadNews ( GLOBAL.data.slice(0,10) ); //先加载第一页列表
        	renderTemplate('#paging-template', formatPaging(GLOBAL.data, 1), '#paging');  //分页模板
        }
    });
    
  
//  $.getJSON('../json/homeNews.json', function(data) {
//		renderTemplate('#paging-template', formatPaging(data.data, 1), '#paging');
//	});
    
	//转化日期
	function transformDate (time) {
		var date = new Date(time);
		Y = date.getFullYear() + '-';
		M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		D = date.getDate() + ' ';
		return Y + M + D;
	}
	
	//加载新闻列表
	function loadNews (data) {
		if ( $(".news_list ul:has(li)").length == 0 ) {
			for (var i=0; i<data.length; i++) {
			   newsList += '<li><a href="javascript:;">' + data[i].title + '</a> <span>' + transformDate(data[i].publishTime.time) + '</span></li>';
			  // newsList += '<li><a href="javascript:;">' + data[i].title + '</a> <span>' +  + '</span></li>';
			
			}
			$('.news_list ul').html( newsList );
		}else {
			for (var i=0; i<data.length; i++) {
			   $('.news_list li a').eq(i).html(data[i].title);
			   $('.news_list li span').eq(i).html( transformDate(data[i].publishTime.time) );
			}
		}
	}
	 
	 
	 
	//分页
	//代码重构
	function renderTemplate (templateSelector, data, htmlSelector) {
		var t = $(templateSelector).html(),
			f = Handlebars.compile(t),     //compile编译模板
			h = f( data );
		$(htmlSelector).html(h);
	}
	
	//加载新页面数据
	function refreshClasses (curPage) {
		$.getJSON('../json/homeNews.json', {curPage: curPage}, function(data) {
			renderTemplate('#paging-template', formatPaging(data, curPage), '#paging');
			loadNews( GLOBAL.data.slice( (curPage-1)*10, curPage*10 ) ); 
		});
		console.log(curPage);
	}
	
	//事件委托
	function bindPageEvent () {
		$('#paging').delegate('li.clickable', 'click', function () {
			$this = $(this);						//将点击的当前封装成jq对象，并存给一个变量
			refreshClasses( $this.data('id') ); 		//点击第几页
			console.log($this.data('id'));
		});
	}
	bindPageEvent ();
	
	
	
	//分页显示页数
	function formatPaging (pagingData, cur) {
		var arr = [];
		var total = 20;
		var cur = cur;
		//处理到首页的逻辑
		var toLeft = {};
		toLeft.index = 1;
		toLeft.text = '&laquo;';
		if (cur != 1) {
			toLeft.clickable = true;
		}
		arr.push(toLeft);
		//处理到上一页的逻辑
		var pre = {};
		pre.index = cur - 1;
		pre.text = '&lsaquo;';
		if (cur != 1) {
			pre.clickable = true;
		}
		arr.push(pre);
		//处理到cur页前的逻辑
		if (cur <= 5) {
			for (var i=1; i<cur; i++) {
				var pag = {};
				pag.text = i;
				pag.index = i;
				pag.clickable = true;
				arr.push(pag);
			}
		}else {
			//如果cur>5,那么cur前的页面显示...
			var pag = {};
			pag.text = 1;
			pag.index = 1;
			pag.clickable = true;
			arr.push(pag);
			var pag = {};
			pag.text = '...';
			arr.push(pag);
			for (var i=cur-2; i<cur; i++) {
				var pag = {};
				pag.text = i;
				pag.index = i;
				pag.clickable = true;
				arr.push(pag);
			}
		}
		//处理到cur页的逻辑
		var pag = {};
		pag.text = cur;
		pag.index = cur;
		pag.cur = true;
		arr.push(pag);
		//处理到cur页后的逻辑
		if (cur >= total-4) {
			for (var i=cur+1; i<=total; i++) {
				var pag = {};
				pag.text = i;
				pag.index = i;
				pag.clickable = true;
				arr.push(pag);
			}
		}else {
			//如果cur < total-4，那么cur后的页要显示...
			for (var i=cur+1; i<=cur+2; i++) {
				var pag = {};
				pag.text = i;
				pag.index = i;
				pag.clickable = true;
				arr.push(pag);
			}
			var pag = {};
			pag.text = '...';
			arr.push(pag);
			var pag = {};
			pag.text = total;
			pag.index = total;
			pag.clickable = true;
			arr.push(pag);
		}
		//处理到下一页的逻辑
		var next = {};
		next.index = cur + 1;
		next.text = '&rsaquo;';
		if (cur != total) {
			next.clickable = true;
		}
		arr.push(next);
		//处理到尾页的逻辑
		var toRight = {};
		toRight.index = total;
		toRight.text = '&raquo;';
		if (cur != total) {
			toRight.clickable = true;
		}
		arr.push(toRight);
		return arr;
	}
	
	//点击左侧导航 右侧内容切换
	$('.nav_list').click(function () {
		$(this).addClass('nav_active').siblings().removeClass('nav_active');
		$('.news_wrap').eq( $(this).index() ).fadeIn(300).siblings().fadeOut(200);
	});
	
	//点击新闻列表
	$('.news_list').delegate('li','click',function () {
		var index = $(this).index();
		$('.news_wrap').fadeOut(200) ;
		$('.news_descript').fadeIn(300);
		$('.news_descript .news_article').html( GLOBAL.data[index].content );
	});
	
})(jQuery)
