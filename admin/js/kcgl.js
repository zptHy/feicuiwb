$(function(){
	// 页面全局变量
	var  GLOBAL = {};
	// 点击编辑按钮，模态框显示此行的所有数据
	window.dictActionEvents = {
        'click #modify': function (e, value, row) {
        	GLOBAL.status = "modify";
        	assignValue(row);
        },
        'click #remove': function (e, value, row) {
        	if(!confirm("是否确定删除？")){
        		return;
        	} 
            $.ajax({
            	url: "/feicuiwb/course/deleteCourse?id="+row.id,
            	type: "get",
            	success: function(res){
            		if(res.msg=="删除课程成功"){
            			refreshData();
            			alert("删除课程成功");
            		}else{
            			alert("删除课程失败");
            		}
            	},
            	error: function(error){
            		alert("删除课程失败");
            	}
            });
        }
    };
    
    $("#btnAdd").click(function(){
    	GLOBAL.status = "add";
		assignValue();
	});
	// 为模态框赋值
	function assignValue(row){
		var row = row || {
			id: -1,
			img: "",
			imgMobile:"",
			chineseName: "",
			englishName: "",
			description: "",
			url: ""
		};
		if(GLOBAL.status == "modify"){
			$("#myModalTitle").text("修改课程");
		}else{
			$("#myModalTitle").text("新增课程");
		}
    	$("#hideId").val(row.id);
    	$("#chineseName").val(row.chineseName);
    	$("#englishName").val(row.englishName);
    	$("#redirectUrl").val(row.url);
    	$("#courseDescription").val(row.description);
    	$("#pictureFile").val("");
    	$("#pictureAddress").val(row.img);
    	$("#mobilePictureFile").val("");
    	$("#mobilePictureFileAddr").val(row.imgMobile);
    	
     	$('#myModal').modal('toggle');
	}
	
	$("#sureCommit").click(function(){
		// 修改
		if(GLOBAL.status == "modify"){
			//alert("修改："+$("#hideId").text());
			var chineseName = $("#chineseName").val().trim();
			var englishName = $("#englishName").val().trim();
			var redirectUrl = $("#redirectUrl").val().trim();
			var courseDescription = $("#courseDescription").val().trim();
			if(!chineseName){
				alert("中文名称不能为空");
				return;
			}
			if(!englishName){
				alert("英文名称不能为空");
				return;
			}
			if(!redirectUrl){
				alert("跳转链接不能为空");
				return;
			}
			if(!courseDescription){
				alert("课程描述不能为空");
				return;
			}
			var options = {
				dataType: "json",
				url: "/feicuiwb/course/updateCourse",
				type: "post",
				beforeSubmit: function(){
					//alert("正在修改");
				},
				success:  function(result){
					if(result.code == 200){
						refreshData();
						alert(result.msg);
						$('#myModal').modal('toggle');
					}else{
						alert(result.msg);
					}
				},
				error: function(){
					alert("修改课程失败");
				}
			};
			$("#myForm").ajaxSubmit(options);
		}else{// 新增
			// 非空校验
			var chineseName = $("#chineseName").val().trim();
			var englishName = $("#englishName").val().trim();
			var redirectUrl = $("#redirectUrl").val().trim();
			var courseDescription = $("#courseDescription").val().trim();
			var pictureFile = $("#pictureFile").val().trim();
			var mobilePictureFile = $("#mobilePictureFile").val().trim();
			if(!chineseName){
				alert("中文名称不能为空");
				return;
			}
			if(!englishName){
				alert("英文名称不能为空");
				return;
			}
			if(!redirectUrl){
				alert("跳转链接不能为空");
				return;
			}
			if(!courseDescription){
				alert("课程描述不能为空");
				return;
			}
			if(!pictureFile){
				alert("PC端图片必须上传");
				return;
			}
			if(!mobilePictureFile){
				alert("移动端图片必须上传");
				return;
			}
			
			var options = {
				dataType: "json",
				type: "post",
				url: "/feicuiwb/course/insertCourse",
				beforeSubmit: function(){
					//alert("正在上传");
				},
				success:  function(result){
					if(result.code == 200){
						refreshData();
						alert(result.msg);
						$('#myModal').modal('toggle');
					}else{
						alert(result.msg);
					}
				},
				error: function(){
					alert("添加课程失败");
				}
			};
			$("#myForm").ajaxSubmit(options);
		}
	});
     
	// 操作列的显示按钮
    function actionFormatter(value) {
         return [
             '<button id="modify" class="btn btn-success btn-xs rightSize detailBtn" type="button"><i class="glyphicon glyphicon-wrench"></i> 修改</button>',
             '<button id="remove" class="btn btn-danger btn-xs rightSize packageBtn" style="margin-left: 2px;" type="button"><i class="glyphicon glyphicon-remove"></i> 删除</button>'
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
	        field: 'img',
	        title: '图片',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<div><a href="'+row.url+'"  target="_blank"><img style="height:30px" src="/feicuiwb/upload/'+value+'" /></a></div>';
            }
	    }, {
	        field: 'chineseName',
	        title: '中文名称',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'englishName',
	        title: '英文名称',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'description',
	        title: '描述',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<div style="display: inline-block; width: 100px; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" data-toggle="tooltip" data-placement="top" title='+value+'><span>'+value+'</span></div>';
            }
	    }, {
	        field: 'url',
	        title: '跳转链接',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
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
			url: "/feicuiwb/course/queryAllCourse?act=read",
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
