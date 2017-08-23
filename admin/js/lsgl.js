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
            	url: "/feicuiwb/teacher/deleteTeacher?id="+row.id,
            	type: "get",
            	success: function(res){
            		if(res.msg=="删除老师成功"){
            			refreshData();
            			alert("删除老师成功");
            		}else{
            			alert("删除老师失败");
            		}
            	},
            	error: function(error){
            		alert("删除老师失败");
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
			name: "",
			avatar:"",
			avatarMobile:"",
			position: "",
			description: "",
			content: "",
			schoolID: ""
		};
		if(GLOBAL.status == "modify"){
			$("#myModalTitle").text("修改老师");
		}else{
			$("#myModalTitle").text("新增老师");
		}
    	$("#hideId").val(row.id);
    	$("#name").val(row.name);
    	$("#position").val(row.position);
    	$("#description").val(row.description);
    	$("#content").val(row.content);
    	$("#schoolID").val(row.schoolID);
    	$("#pictureFile").val("");
    	$("#pictureAddress").val(row.avatar);
    	$("#mobilePicFile").val("");
    	$("#mobilePicAddr").val(row.avatarMobile);
    	
     	$('#myModal').modal('toggle');
	}
	
	$("#sureCommit").click(function(){
		document.getElementById("schoolID").value = -1;
		// 修改
		if(GLOBAL.status == "modify"){
			//alert("修改："+$("#hideId").text());
			var name = $("#name").val().trim();
			var position = $("#position").val().trim();
			var description = $("#description").val().trim();
			var content = $("#content").val().trim();
			if(!name){
				alert("姓名不能为空");
				return;
			}
			if(!position){
				alert("职称不能为空");
				return;
			}
			if(!description){
				alert("简介不能为空");
				return;
			}
			if(!content){
				alert("内容不能为空");
				return;
			}
			
			var options = {
				dataType: "json",
				url: "/feicuiwb/teacher/updateTeacher",
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
					alert("修改老师失败");
				}
			};
			$("#myForm").ajaxSubmit(options);
			
			
		}else{// 新增
			// 非空校验
			var name = $("#name").val().trim();
			var position = $("#position").val().trim();
			var description = $("#description").val().trim();
			var content = $("#content").val().trim();
			var pictureFile = $("#pictureFile").val().trim();
			var mobilePicFile = $("#mobilePicFile").val().trim();
			var schoolID = $("#schoolID").val().trim();
			if(!name){
				alert("姓名不能为空");
				return;
			}
			if(!position){
				alert("职称不能为空");
				return;
			}
			if(!description){
				alert("简介不能为空");
				return;
			}
			if(!schoolID){
				alert("所属校区ID不能为空");
				return;
			}
			if(!pictureFile){
				alert("PC端图片必须上传");
				return;
			}
			if(!mobilePicFile){
				alert("移动端图片必须上传");
				return;
			}
			if(!content){
				alert("内容不能为空");
				return;
			}
			
			var options = {
				dataType: "json",
				type: "post",
				url: "/feicuiwb/teacher/insertTeacher",
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
					alert("添加老师失败");
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
		height: 450,
	    columns: [{
	        field: 'id',
	        title: 'ID',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'avatar',
	        title: '图片',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<div><a href="'+row.url+'"  target="_blank"><img style="height:30px" src="/feicuiwb/upload/'+value+'" /></a></div>';
            }
	    }, {
	        field: 'name',
	        title: '老师名称',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'position',
	        title: '职称',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'description',
	        title: '简介',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
	    }, {
	        field: 'content',
	        title: '内容',
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
			url: "/feicuiwb/teacher/queryAllTeacher?act=read",
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
