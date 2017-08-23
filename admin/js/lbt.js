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
           // alert('remove:'+row.id); 
        	if(!confirm("确定删除吗？")){
        		return;
        	}
            $.ajax({
            	url: "/feicuiwb/loopimg/deleteLoopimg?id="+row.id,
            	type: "get",
            	success: function(res){
            		if(res.msg=="删除轮播图成功"){
            			refreshData();
            			alert("删除成功");
            		}else{
            			alert("删除轮播图失败");
            		}
            	},
            	error: function(error){
            		alert("删除轮播图失败");
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
			imgurlMobile:"",
			url: "",
			displayOrder: ""
		};
		if(GLOBAL.status == "modify"){
			$("#myModalTitle").text("修改轮播图");
		}else{
			$("#myModalTitle").text("新增轮播图");
		}
    	$("#hideId").val(row.id);
    	$("#redirectUrl").val(row.url);
    	$("#displayOrder").val(row.displayOrder);
    	$("#pictureFile").val("");
    	$("#pictureAddress").val(row.imgurl);
    	$("#mobilePicFile").val("");
    	$("#mobilePicAddr").val(row.imgurlMobile);
    	
     	$('#myModal').modal('toggle');
	}
	
	$("#sureCommit").click(function(){
		// 修改
		if(GLOBAL.status == "modify"){
			var redirectUrl = $("#redirectUrl").val().trim();
			var displayOrder = $("#displayOrder").val().trim();
			if(!redirectUrl){
				alert("跳转链接不能为空");
				return;
			}
			if(!displayOrder){
				alert("显示顺序不能为空");
				return;
			}
			var options = {
				dataType: "json",
				url: "/feicuiwb/loopimg/updateLoopimg",
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
					alert("修改轮播图失败");
				}
			};
			$("#myForm").ajaxSubmit(options);
		}else{// 新增
			// 非空校验
			var redirectUrl = $("#redirectUrl").val().trim();
			var displayOrder = $("#displayOrder").val().trim();
			var pictureFile = $("#pictureFile").val().trim();
			var mobilePicFile = $("#mobilePicFile").val().trim();
			if(!pictureFile){
				alert("PC端图片必须上传");
				return;
			}
			if(!mobilePicFile){
				alert("移动端图片必须上传");
				return;
			}
			if(!redirectUrl){
				alert("跳转链接不能为空");
				return;
			}
			if(!displayOrder){
				alert("显示顺序不能为空");
				return;
			}
			var options = {
				dataType: "json",
				type: "post",
				url: "/feicuiwb/loopimg/insertLoopimg",
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
					alert("添加轮播图失败");
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
//	var baseUrl = "http://192.168.1.103:8080/";
//	var baseImgUrl = baseUrl+"feicuiwb/upload/";
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
	        field: 'imgurl',
	        title: '图片',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	console.log(value)
            	return '<div><a href="'+row.url+'"  target="_blank"><img style="height:30px" src="/feicuiwb/upload/'+value+'" /></a></div>';
            }
	    },{
	        field: 'url',
	        title: '跳转链接',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'displayOrder',
	        title: '显示顺序',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
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
			url: "/feicuiwb/loopimg/queryAllLoopimg?act=read",
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
