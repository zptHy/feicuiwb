$(function(){
	// 页面全局变量
	var  GLOBAL = {};
	// 点击编辑按钮，模态框显示此行的所有数据
	window.dictActionEvents = {
        'click #modify': function (e, value, row) {
        	GLOBAL.status = "modify";
        	assignValue(row);
        }
    };
    
    $("#btnAdd").click(function(){
    	GLOBAL.status = "add";
		assignValue();
	});
	// 为模态框赋值
	
	//"/feicuiwb/seo/updateSeo" 返回: msg: "修改SEO成功"
	//"/feicuiwb/seo/insertSeo" 返回: msg: "新增SEO成功"
	
	function assignValue(row){
		var row = row || {
			id: -1,
	    	name: "",
	    	chineseDes: "",
	    	title: "",
	    	keywords: "",
	    	description: ""
		};
		if(GLOBAL.status == "modify"){
			$("#myModalTitle").text("修改SEO");
		}else{
			$("#myModalTitle").text("新增SEO");
		}
    	$("#hideId").val(row.id);
    	$("#name").val(row.name);
    	$("#chineseDes").val(row.chineseDes);
    	$("#title").val(row.title);
    	$("#keywords").val(row.keywords);
    	$("#description").val(row.description);
    	
     	$('#myModal').modal('toggle');
	}
	
	$("#sureCommit").click(function(){
		// 修改
		if(GLOBAL.status == "modify"){
			var hideId = $("#hideId").val().trim();
			var name = $("#name").val().trim();
			var chineseDes = $("#chineseDes").val().trim();
			var title = $("#title").val().trim();
			var keywords = $("#keywords").val().trim();
			var description = $("#description").val().trim();
			if(!name){
				alert("网站名称不能为空");
				return;
			}
			if(!chineseDes){
				alert("网页中文描述不能为空");
				return;
			}
			
			var options = {
				dataType: "json",
				url: "/feicuiwb/seo/updateSeo",
				type: "post",
				data: {
					id: hideId,
			    	name: name,
			    	chineseDes: chineseDes,
			    	title: title,
			    	keywords: keywords,
			    	description: description
				},
				success:  function(result){
					if(result.msg == "修改SEO成功"){
						refreshData();
						alert("修改SEO成功");
						$('#myModal').modal('toggle');
					}else {
						alert("修改SEO失败");
					}
				},
				error: function(){
					alert("修改SEO失败");
				}
			};
			$.ajax(options);
			
			
		}else{// 新增
			// 非空校验
			var name = $("#name").val().trim();
			var chineseDes = $("#chineseDes").val().trim();
			var title = $("#title").val().trim();
			var keywords = $("#keywords").val().trim();
			var description = $("#description").val().trim();
			if(!name){
				alert("网站名称不能为空");
				return;
			}
			if(!chineseDes){
				alert("网页中文描述不能为空");
				return;
			}
			
			var options = {
				dataType: "json",
				url: "/feicuiwb/seo/insertSeo",
				type: "post",
				data: {
			    	name: name,
			    	chineseDes: chineseDes,
			    	title: title,
			    	keywords: keywords,
			    	description: description
				},
				success:  function(result){
					console.log(result);
					if(result.msg == "新增SEO成功"){
						refreshData();
						alert("新增SEO成功");
						$('#myModal').modal('toggle');
					}else if(result.msg == "html文件不存在"){
						alert("html文件不存在");
					}else{
						alert("新增SEO失败");
					}
				},
				error: function(){
					alert("新增SEO失败");
				}
			};
			$.ajax(options);
		}

		
	});
     
	// 操作列的显示按钮
    function actionFormatter(value) {
         return [
             '<button id="modify" class="btn btn-success btn-xs rightSize detailBtn" type="button"><i class="glyphicon glyphicon-wrench"></i> 修改</button>'
         ].join('');
	}
	// 初始化table
	$('#table').bootstrapTable({
		dataType: "json",
		toolbar: "#btnList",
	    columns: [{
	        field: 'id',
	        title: 'ID',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'name',
	        title: '页面名称',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'chineseDes',
	        title: '中文描述',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'title',
	        title: 'title',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'keywords',
	        title: 'keywords',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<div style="display: inline-block; width: 100px; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" data-toggle="tooltip" data-placement="top" title='+value+'><span>'+value+'</span></div>';
            }
	    }, {
	        field: 'description',
	        title: 'description',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<div style="display: inline-block; width: 100px; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" data-toggle="tooltip" data-placement="top" title='+value+'><span>'+value+'</span></div>';
            }
	    }, {
	        field: 'operate',
	        title: '操作',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
    		formatter: actionFormatter,
    		events: dictActionEvents
	    }],
	    data: []
	});
	
	function refreshData(){
		$.ajax({
			url: "/feicuiwb/seo/queryAllSeo?act=read",
			type: "get",
			success: function(res){
				$('#table').bootstrapTable('load', res.data);
				$('[data-toggle="tooltip"]').tooltip();
			},
			error: function(error){
				alert('网络问题');
			}
		});
	}
	refreshData();
	
});
