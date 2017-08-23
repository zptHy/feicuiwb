$(function(){
	
	$("#btnAdd").click(function(){
    	// 隐藏表格
    	$("#topDiv").hide();
    	// 显示编辑
    	$("#editDiv").show();
    	GLOBAL.status = "add";
		assignValue();
	});
	// 页面全局变量
	var  GLOBAL = {};
	// 点击编辑按钮，模态框显示此行的所有数据
	window.dictActionEvents = {
        'click #modify': function (e, value, row) {
        	console.log("修改");
        	// 隐藏表格
        	$("#topDiv").hide();
        	// 显示编辑
        	$("#editDiv").show();
        	GLOBAL.status = "modify";
        	assignValue(row);
        },
        'click #remove': function (e, value, row) {
//            alert('remove:'+row.id); 
        	if(!confirm("是否确定删除？")){
        		return;
        	}
            $.ajax({
            	url: "/feicuiwb/cooperation/deleteCooperation?id="+row.id,
            	type: "get",
            	success: function(res){
            		if(res.msg=="删除合作企业成功"){
            			refreshData();
            			alert("删除合作企业成功");
            		}else{
            			alert("删除合作企业失败");
            		}
            	},
            	error: function(error){
            		alert("删除合作企业失败");
            	}
            });
        }
     };
     $("#cancelBtn").click(function(){
     	// 隐藏表格
    	$("#topDiv").show();
    	// 显示编辑
    	$("#editDiv").hide();
     });
 	// 为模态框赋值
 	function assignValue(row){
 		var row = row || {
 			id: -1,
 			name: "",
 			description: "",
 			sequence: "",
 			url: "",
 			logo: "",
 			logoMobile:"",
 			schoolID:""
 		};
 		if(GLOBAL.status == "modify"){
 			$("#tip").text("修改合作企业");
 		}else{
 			$("#tip").text("新增合作企业");
 		}
     	$("#hideId").val(row.id);
     	$("#name").val(row.name);
     	$("#description").val(row.description);
     	$("#sequence").val(row.sequence);
     	$("#url").val(row.url);
     	$("#picFile").val("");
     	$("#mobilePicFile").val("");
 	}
	// 操作列的显示按钮
    function actionFormatter(value) {
         return [
             '<button id="modify" class="btn btn-success btn-xs rightSize detailBtn" type="button"><i class="glyphicon glyphicon-wrench"></i> 修改</button>',
             '<button id="remove" class="btn btn-danger btn-xs rightSize packageBtn" style="margin-left: 2px;" type="button"><i class="glyphicon glyphicon-remove"></i> 删除</button>'
         ].join('');
	}
	
	$('#table').bootstrapTable({
		dataType: "json",
		toolbar: "#btnList",
		height: 450,
	    columns: [{
	        field: 'id',
	        title: 'ID',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'name',
	        title: '企业名称',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'logo',
	        title: '企业logo',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<div><img style="height:30px" src="/feicuiwb/upload/'+value+'" /></div>';
            }
	    }, {
	        field: 'description',
	        title: '企业简介',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<span style="display:inline-block; width: 100px; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" data-toggle="tooltip" data-placement="top" title="'+value+'">'+value+'</span>';
            }
	    }, {
	        field: 'sequence',
	        title: '排序',
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
	$.ajax({
		url: "/feicuiwb/cooperation/queryAllCooperation?act=read",
		type: "get",
		success: function(res){
			$('#table').bootstrapTable('load', res.data);
			$('[data-toggle="tooltip"]').tooltip();
		},
		error: function(error){
			alert('网络问题');
		}
	});
	$("#commitBtn").click(function(){
		// 修改
		if(GLOBAL.status == "modify"){
			var name = $("#name").val().trim();
			var description = $("#description").val().trim();
			var sequence = $("#sequence").val().trim();
			var url = $("#url").val().trim();
			if(!name){
				alert("企业名称不能为空");
				return;
			}
			if(!description){
				alert("企业简介不能为空");
				return;
			}
			if(!sequence){
				alert("排序不能为空");
				return;
			}
			if(!url){
				alert("企业链接不能为空");
				return;
			}
			
			var options = {
				dataType: "json",
				url: "/feicuiwb/cooperation/updateCooperation",
				type: "post",
				beforeSubmit: function(){
//					alert("正在修改");
				},
				success:  function(result){
					if(result.code == 200){
						refreshData();
						alert(result.msg);
						// 隐藏表格
				    	$("#topDiv").show();
				    	// 显示编辑
				    	$("#editDiv").hide();
					}else{
						alert(result.msg);
					}
				},
				error: function(){
					alert("修改合作企业失败");
				}
			};
			$("#myForm").ajaxSubmit(options);
			
			
		}else{// 新增
			// 非空校验
			var name = $("#name").val().trim();
			var description = $("#description").val().trim();
			var sequence = $("#sequence").val().trim();
			var picFile = $("#picFile").val().trim();
			var mobilePicFile = $("#mobilePicFile").val().trim();
			var url = $("#url").val().trim();
			
			if(!name){
				alert("企业名称不能为空");
				return;
			}
			if(!description){
				alert("企业简介不能为空");
				return;
			}
			if(!sequence){
				alert("排序不能为空");
				return;
			}
			if(!picFile){
				alert("PC端图片必须上传");
				return;
			}
			if(!mobilePicFile){
				alert("移动端图片必须上传");
				return;
			}
			if(!url){
				alert("企业链接不能为空");
				return;
			}
			
			var options = {
				dataType: "json",
				type: "post",
				url: "/feicuiwb/cooperation/insertCooperation",
				beforeSubmit: function(){
//					alert("正在上传");
				},
				success:  function(result){
					if(result.code == 200){
						refreshData();
						alert(result.msg);
						// 隐藏表格
				    	$("#topDiv").show();
				    	// 显示编辑
				    	$("#editDiv").hide();
					}else{
						alert(result.msg);
					}
				},
				error: function(){
					alert("添加合作企业失败");
				}
			};
			$("#myForm").ajaxSubmit(options);
		}
	});
	
	function refreshData(){
		$.ajax({
			url: "/feicuiwb/cooperation/queryAllCooperation?act=read",
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
