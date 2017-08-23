var GLOBAL = GLOBAL || {};

$(function () {
	 $.ajax({
        async:true,　　　　　　　
        type: "get",   
        url: "../json/cooperation.json",   
        cache: false,
        dataType: "json",
        success: function(result) {  
        	GLOBAL.data = result.data;
//      	console.log(GLOBAL.data);
        }
    });
    
	GLOBAL.pageStart = 0;	    //初始化 第一页 （当前第几页）
	GLOBAL.pageSize = 4; 		//每页多少条
	GLOBAL.pageCount = Math.ceil(GLOBAL.data.length/GLOBAL.pageSize);  // 计算一共加载多少页
	
	/*$('#header').load('header.html');
	$('#footer').load('footer.html');*/
	
	loadCompanyList( GLOBAL.data.slice(0,GLOBAL.pageSize) ); //初始化数据
    
    //	点击加载下一页
	$('#loadMore').click(function () {
		if (GLOBAL.pageStart < GLOBAL.pageCount) {
			loadCompanyList( GLOBAL.data.slice(GLOBAL.pageStart*GLOBAL.pageSize, (GLOBAL.pageStart+1)*GLOBAL.pageSize) );
		}
	});
	
	//点击 了解更多,跳转到对应的合作企业 详情页。
	//$('#companyList').delegate('.cooperation_descript','click',function () {
	//	var Url = getUrlParams('type');
	//	window.open('company.html?'+"type=company"+'&companyId='+$(this).attr('companyId'),'_blank');

	//});
});


//数据加载方法
function loadCompanyList (listData) {
	var itemHtml = '',
		companyLink = '',
		logoSrc = '';
	
	
	//瀑布流加载实现 
	GLOBAL.pageStart++ ;      							//每次数据加载完，GLOBAL.pageStart +1
	if (GLOBAL.pageStart >= GLOBAL.pageCount) {			//当是最后一页时，‘没有更多内容’
		$('#loadMore').html('没有更多!');
	}
	if (!listData || !listData.length) {
		$('#companyList').html('暂时没有内容，敬请期待！');
			
	}else {
		for (var i=0;i < listData.length;i++) {
			//companyLink = listData[i].content.replace(/<.*?>/ig,'');
			companyLink = listData[i].url;
			itemHtml = $('#itemHtml').html().replace('$companyId$',listData[i].id)
											.replace('$companyTitle$',listData[i].name)
											.replace('$describe$',listData[i].description)
										    .replace("$companyCover$","../upload/"+listData[i].logo)  
											.replace('$companyLink$',companyLink);
										  //如果将$companyCover$绑定在src属性上，src解析的是字符串，不是真正的路径，报404
											
			$('#companyList').append(itemHtml);           //将替换好的数据模板追加到 图文 #companyList 这个div中
		}
			
	}
}

