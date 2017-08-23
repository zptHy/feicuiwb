$(function () {
	var GLOBAL = GLOBAL || {};
		//GLOBAL.items = 10; 	//一页10条数据
		GLOBAL.data = '';
		
	var newsList = '';
	
	$('#header').load('header.html');
	$('#footer').load('footer.html');
	
    $.ajax({
        async: false,　　　　　　　
        type: "get",   
        url: "js/homeNews.json",   
        dataType: "json",
        success: function(result) {  
        	GLOBAL.data = result.data;
        	loadNews ( GLOBAL.data.slice(0,10) ); //先加载第一页
        }
    });
    
		
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
	
	
	//	分页
	
	//初始化数据
	var page = 1,   //当前页数
		totalPages = Math.ceil( GLOBAL.data.length/10 );
	$('[pages]').each(function (index,element) {     //5页 li
		$(this).text( index+1 );
		$(this).attr( 'index', $(this).text() );
	});
	$('[page-rel="prepage"]').attr('index', 0);      //上页
	$('[page-rel="nextpage"]').attr('index', 2);     //下页
	$('.paging_wrap li').eq(0).html('共 ' + GLOBAL.data.length + ' 条');  //共多少条
	$('.paging_wrap li').eq(1).attr('index',1);      //首页
	$('.paging_wrap li:last').attr('index', totalPages ); //尾页
	$('[page-rel="prepage"],[first]').removeClass('pageItemActive').addClass('pageItemDisable');//刚进入页面首页不可点击
	
	//点击上一页
	$('[page-rel="prepage"]').click(function () {
		page--;
		if (page<0) {
			page=1;
		}
		$('[index="'+page+'"]').addClass('pageItemActive');  //点击上页下页,当前页 样式active
		$(this).removeClass('hover').addClass('pageItemActive').siblings().removeClass('pageItemActive');
		
		if ( $('[pages]:first').hasClass('pageItemActive') ) { //第一页是当前
			$(this).removeClass('hover').addClass('pageItemDisable');
		}else {
			$(this).removeClass('pageItemDisable');
		}
		paging( page,totalPages )  //调用,修改页码
		loadNews ( GLOBAL.data.slice( (page-1)*10,page*10) );
	});
	
	//点击下一页
	$('[page-rel="nextpage"]').click(function () {
		page++;
		if (page>totalPages) {
			page=totalPages;
		}
		$(this).removeClass('hover').addClass('pageItemActive').siblings().removeClass('pageItemActive');
		$('[index="'+page+'"]:not("[last]")').addClass('pageItemActive');  //点击上页下页,当前页 样式active
		paging( page,totalPages )  //调用,修改页码
		loadNews ( GLOBAL.data.slice( (page-1)*10,page*10) );
	});
	
	//点击每一页
	$('[pages]').click(function () {
		page = $(this).attr('index');
		paging( page,totalPages )  //调用,修改页码
		loadNews ( GLOBAL.data.slice( (page-1)*10,page*10) );
		
		if ( $(this).attr('index') ) {
			
		}
		$(this).addClass('pageItemActive').siblings().removeClass('pageItemActive');
		
		
	});
	//点击首页
	$('[first]').click(function () {
		page = 1;
		paging( page,totalPages )  //调用,修改页码
		loadNews ( GLOBAL.data.slice( (page-1)*10,page*10) );
		$('[pages]:first').addClass('pageItemActive');   //第一页
		$('[pages]:last').removeClass('pageItemActive'); 
		$('[pages]').each(function (index,element) {    
			$(this).text( index+1 );
			$(this).attr( 'index', $(this).text() );
		});
		$('[page-rel="prepage"]').addClass('pageItemDisable').siblings().removeClass('pageItemDisable');
		
	});
	//点击尾页
	$('[last]').click(function () {
		page = totalPages;
		paging( page,totalPages );  						//调用,修改页码
		loadNews ( GLOBAL.data.slice( (page-1)*10,page*10) );
		$('[pages]:last').addClass('pageItemActive');   //最后一页
		$('[pages]:first').removeClass('pageItemActive'); 
		$('[page-rel="nextpage"]').addClass('pageItemDisable'); 
		$('[page-rel="prepage"],[first]').removeClass('pageItemDisable');
		$('[pages]').each(function (index,element) {
			$(this).text( page-4 + index );
			$(this).attr( 'index', $(this).text() );
		});
	});
	
	//鼠标悬停
	$('.paging_wrap li').hover(function () {
		$(this).addClass('hover').siblings().removeClass('hover');
	},function () {
		$(this).removeClass('hover');
	});
		
		function paging( nowPage,totalPages ) {
			
//			if ( nowPage >= ( $('[pages]:last').text()-0+1 )/2 && totalPages > $('[pages]:last').text() ) {
//				$('[pages]').each(function (index,element) {     //5页 li
//					$(this).text( nowPage-2 + index );
//					$(this).attr( 'index', $(this).text() );
//				});
//			}else if ( totalPages == $('[pages]:last').text() ) {
//				$('[pages]').each(function (index,element) {     //5页 li
//					$(this).text( totalPages-4 + index );
//					$(this).attr( 'index', $(this).text() );
//				});
//			}
			
			$('[page-rel="prepage"]').attr('index', (nowPage-1)<1?1:(nowPage-1) ); 						   //上页的index
			$('[page-rel="nextpage"]').attr('index', (nowPage-0+1)>totalPages?totalPages:(nowPage-0+1) );  //下页的index
			
			//当前已经在首页或尾页时,首页尾页不可点击
			if ( $('[last]').attr('index')==$('[pages]:last').attr('index')&&$('[pages]:last').hasClass('pageItemActive') ) {
				$('[page-rel="nextpage"],[last]').removeClass('pageItemActive').addClass('pageItemDisable');
			}else {
				$('[page-rel="nextpage"],[last]').removeClass('pageItemDisable');
				
			}
			
			if ( $('[first]').attr('index')==$('[pages]:first').attr('index')&&$('[pages]:first').hasClass('pageItemActive') ) {
				$('[page-rel="prepage"],[first]').removeClass('pageItemActive').addClass('pageItemDisable');
			}else {
				$('[page-rel="prepage"],[first]').removeClass('pageItemDisable');
				
			}
			
		}
	
	
	
	//分页换页
	$('.paging_wrap li:gt(0)').click(function () {     //除了点击 共几页之外的li
		
//		console.log($(this))
//		paging( page,totalPages )  //调用,修改页码
//		loadNews ( GLOBAL.data.slice( (page-1)*10,page*10) );
	});
	
	
	
	
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
		$('.news_descript .news_article_content').html( GLOBAL.data[index].content );
	});
	
	
	
	
	
	
  



});