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
        	if(!confirm("是否确认删除")){
        		return;
        	}
            $.ajax({
            	url: "/feicuiwb/workinfo/deleteWorkInfo?id="+row.id,
            	type: "get",
            	success: function(res){
            		if(res.msg=="删除学员作品成功"){
            			refreshData();
            			alert("删除学员作品成功");
            		}else{
            			alert("删除学员作品失败");
            		}
            	},
            	error: function(error){
            		alert("删除学员作品失败");
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
			stuName: "",
			avatar: "",
			avatarMobile:"",
			classInfo: "",
			type: "",
			title: "",
			description: "",
			fileName: "",
			img: "",
			imgMobile:"",
			schoolID: ""
		};
		if(GLOBAL.status == "modify"){
			$("#myModalTitle").text("修改学员作品");
		}else{
			$("#myModalTitle").text("新增学员作品");
		}
    	$("#hideId").val(row.id);
    	$("#stuName").val(row.stuName);
    	$("#classInfo").val(row.classInfo);
    	$("#type").val(row.type);
    	$("#title").val(row.title);
    	$("#description").val(row.description);
    	$("#avatarFile").val("");
    	$("#avatarFileAddr").val(row.avatar);
    	$("#mobileAvatarFile").val("");
    	$("#mobileAvatarFileAddr").val(row.avatarMobile);
    	$("#workFile").val("");
    	$("#workFileAddr").val(row.img);
    	$("#mobileWorkFile").val("");
    	$("#mobileWorkFileAddr").val(row.imgMobile);
     	$('#myModal').modal('toggle');
	}
	
	$("#sureCommit").click(function(){
		document.getElementById("schoolID").value = -1;
		// 修改
		if(GLOBAL.status == "modify"){
			//alert("修改："+$("#hideId").text());
			// 非空校验
			var stuName = $("#stuName").val().trim();
			var classInfo = $("#classInfo").val().trim();
			var type = $("#type").val().trim();
			var title = $("#title").val().trim();
			var description = $("#description").val().trim();
			var fileName = "default";
			var schoolID = $("#schoolID").val().trim();
			if(!stuName){
				alert("姓名不能为空");
				return;
			}
			if(!classInfo){
				alert("班级不能为空");
				return;
			}
			if(!type){
				alert("作品类别不能为空");
				return;
			}
			if(!title){
				alert("标题不能为空");
				return;
			}
			if(!fileName){
				alert("标题不能为空");
				return;
			}
			if(!description){
				alert("学员作品简介不能为空");
				return;
			}
			if(!schoolID){
				alert("所属校区不能为空");
				return;
			}
			var options = {
				dataType: "json",
				url: "/feicuiwb/workinfo/updateWorkInfo",
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
					alert("修改学员作品失败");
				}
			};
			$("#myForm").ajaxSubmit(options);
			
			
		}else{// 新增
			// 非空校验
			var stuName = $("#stuName").val().trim();
			var avatarFile = $("#avatarFile").val().trim();
			var mobileAvatarFile = $("#mobileAvatarFile").val().trim();
			var classInfo = $("#classInfo").val().trim();
			var type = $("#type").val().trim();
			var title = $("#title").val().trim();
			var description = $("#description").val().trim();
			var fileName = "default";
			var workFile = $("#workFile").val().trim();
			var mobileWorkFile = $("#mobileWorkFile").val().trim();
			var schoolID = $("#schoolID").val().trim();
			if(!stuName){
				alert("姓名不能为空");
				return;
			}
			if(!avatarFile){
				alert("PC端头像必须上传");
				return;
			}
			if(!mobileAvatarFile){
				alert("移动端头像必须上传");
				return;
			}
			if(!classInfo){
				alert("班级不能为空");
				return;
			}
			if(!type){
				alert("作品类别不能为空");
				return;
			}
			if(!title){
				alert("标题不能为空");
				return;
			}
			if(!fileName){
				alert("标题不能为空");
				return;
			}
			if(!description){
				alert("学员作品简介不能为空");
				return;
			}
			if(!workFile){
				alert("PC端作品必须上传");
				return;
			}
			if(!mobileWorkFile){
				alert("移动端作品必须上传");
				return;
			}
			if(!schoolID){
				alert("所属校区不能为空");
				return;
			}
			var options = {
				dataType: "json",
				type: "post",
				url: "/feicuiwb/workinfo/insertWorkInfo",
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
					alert("添加学员作品失败");
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
	        title: '头像',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<div><a href="'+row.url+'"  target="_blank"><img style="height:30px" src="/feicuiwb/upload/'+value+'" /></a></div>';
            }
	    }, {
	        field: 'stuName',
	        title: '姓名',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'classInfo',
	        title: '班级',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'description',
	        title: '作品简介',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<div style="display: inline-block; width: 100px; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" data-toggle="tooltip" data-placement="top" title='+value+'><span>'+value+'</span></div>';
            }
	    }, {
	        field: 'title',
	        title: '标题',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'img',
	        title: '作品',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<div><a href="'+row.url+'"  target="_blank"><img style="height:30px" src="/feicuiwb/upload/'+value+'" /></a></div>';
            }
	    }, {
	        field: 'type',
	        title: '作品类别',
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
			url: "/feicuiwb/workinfo/queryAllWorkInfo?act=read",
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
