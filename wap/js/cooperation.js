var GLOBAL = GLOBAL || {};

$(function () {
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	
	
	$.ajax({
        async: false,　　　　　　　
        type: "get",   
        url: "../json/cooperation.json",   
        cache: false,
        dataType: "json",
        success: function(result) {  
        	GLOBAL.data = result.data;
      		console.log(GLOBAL.data);
        }
    });
    
	GLOBAL.pageStart = 0;	    //初始化 第一页 （当前第几页）
	GLOBAL.pageSize = 4; 		//每页多少条
	GLOBAL.pageCount = Math.ceil(GLOBAL.data.length/GLOBAL.pageSize);  // 计算一共加载多少页
	
	loadCompanyList( GLOBAL.data ); //初始化数据

});


//数据加载方法
function loadCompanyList (listData) {
	var itemHtml = '',
		companyLink = '';
		
	for (var i=0;i < listData.length;i++) {
		$('#itemHtml img').attr('src', "../upload/"+listData[i].logoMobile);
		companyLink = listData[i].url;
		itemHtml = $('#itemHtml').html().replace('$companyId$',listData[i].id)
										.replace('$companyTitle$',listData[i].name)
										.replace('$companyLink$',companyLink)
										.replace('$describe$',listData[i].description);
		$('#companyList').append(itemHtml); 
		
		//src=$companyCover$，src解析的是字符串，不是真正的路径，报404
	}
}

