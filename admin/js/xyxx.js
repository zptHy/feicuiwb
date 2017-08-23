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
            	url: "/feicuiwb/student/deleteStudent?id="+row.id,
            	type: "get",
            	success: function(res){
            		if(res.msg=="删除学员成功"){
            			refreshData();
            			alert("删除学员成功");
            		}else{
            			alert("删除学员失败");
            		}
            	},
            	error: function(error){
            		alert("删除学员失败");
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
			age: "",
			educationLevel: "",
			position: "",
			salary: "",
			company: "",
			avatar: "",
			description: "",
			content: " ",
			school: "",
			major: "",
			schoolID: "",
			videoURL: " "
		};
		if(GLOBAL.status == "modify"){
			$("#myModalTitle").text("修改学员");
		}else{
			$("#myModalTitle").text("新增学员");
		}
    	$("#hideId").val(row.id);
    	$("#name").val(row.name);
    	$("#age").val(row.age);
    	$("#educationLevel").val(row.educationLevel);
    	$("#position").val(row.position);
    	$("#salary").val(row.salary);
    	$("#company").val(row.company);
    	$("#school").val(row.school);
    	$("#studentDescription").val(row.description);
    	$("#content").val(row.content);
    	$("#avatar").val("");
    	$("#pictureAddress").val(row.avatar);
    	$("#major").val(row.major);
    	$("#schoolID").val(row.schoolID);
     	$('#myModal').modal('toggle');
     	$('#videoURL').modal('videoURL');
	}
	
	$("#sureCommit").click(function(){
		document.getElementById("schoolID").value = -1;
		// 修改
		if(GLOBAL.status == "modify"){
			//alert("修改："+$("#hideId").text());
			var name = $("#name").val().trim();
			var age = $("#age").val().trim();
			var educationLevel = $("#educationLevel").val().trim();
			var position = $("#position").val().trim();
			var salary = $("#salary").val().trim();
			var company = $("#company").val().trim();
			var school = $("#school").val().trim();
			var studentDescription = $("#studentDescription").val().trim();
			var major = $("#major").val().trim();
//			暂时未用的字段的默认值
			var schoolID = $("#schoolID").val().trim();
			var content = "default";
			var videoURL = "default";
			if(!name){
				alert("学员姓名不能为空");
				return;
			}
			if(!age){
				alert("学员年龄不能为空");
				return;
			}
			reg=/^[+]?\d*$/;     
		    if(!(reg.test(age)&&(age>10&&age<100))){
		    	alert("请输入正确的年龄");
				return;  
		    }  
			if(!educationLevel){
				alert("学员学历不能为空");
				return;
			}
			if(!position){
				alert("学员岗位不能为空");
				return;
			}
			if(!salary){
				alert("学员薪资不能为空");
				return;
			}
			var isNum=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
			if(!isNum.test(salary)){
				alert("请输入正确的薪资");
				return;
			}
			if(!company){
				alert("就业公司不能为空");
				return;
			}
			if(!school){
				alert("毕业院校不能为空");
				return;
			}
			if(!studentDescription){
				alert("学员描述不能为空");
				return;
			}
			if(!content){
				alert("内容信息不能为空");
				return;
			}
			if(!major){
				alert("所学专业不能为空");
				return;
			}
			if(!schoolID){
				alert("所属校区不能为空");
				return;
			}
			if(!videoURL){
				alert("视频地址不能为空");
				return;
			}
			
			var options = {
				dataType: "json",
				url: "/feicuiwb/student/updateStudent",
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
					alert("修改学员失败");
				}
			};
			$("#myForm").ajaxSubmit(options);
			
			
		}else{// 新增
			// 非空校验
			var name = $("#name").val().trim();
			var age = $("#age").val().trim();
			var educationLevel = $("#educationLevel").val().trim();
			var position = $("#position").val().trim();
			var salary = $("#salary").val().trim();
			var company = $("#company").val().trim();
			var school = $("#school").val().trim();
			var studentDescription = $("#studentDescription").val().trim();
			var avatar = $("#avatar").val().trim();
			var major = $("#major").val().trim();
//			暂时未用的字段的默认值
			var schoolID = $("#schoolID").val().trim();
			var content = "default";
			var videoURL = "default";
			if(!name){
				alert("学员姓名不能为空");
				return;
			}
			if(!age){
				alert("学员年龄不能为空");
				return;
			}
			reg=/^[+]?\d*$/;     
		    if(!(reg.test(age)&&(age>10&&age<100))){
		    	alert("请输入正确的年龄");
				return;  
		    }  
			if(!educationLevel){
				alert("学员学历不能为空");
				return;
			}
			if(!position){
				alert("学员岗位不能为空");
				return;
			}
			if(!salary){
				alert("学员薪资不能为空");
				return;
			}
			var isNum=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
			if(!isNum.test(salary)){
				alert("请输入正确的薪资");
				return;
			}
			if(!company){
				alert("就业公司不能为空");
				return;
			}
			if(!school){
				alert("毕业院校不能为空");
				return;
			}
			if(!studentDescription){
				alert("学员描述不能为空");
				return;
			}
			if(!content){
				alert("内容信息不能为空");
				return;
			}
			if(!avatar){
				alert("图片必须上传");
				return;
			}
			if(!major){
				alert("所学专业不能为空");
				return;
			}
			if(!schoolID){
				alert("所属校区不能为空");
				return;
			}
			if(!videoURL){
				alert("视频地址不能为空");
				return;
			}
			var options = {
				dataType: "json",
				type: "post",
				url: "/feicuiwb/student/insertStudent",
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
					alert("添加学员失败");
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
	var baseUrl = "http://192.168.1.202:8080/";
	var baseImgUrl = baseUrl+"feicuiwb/upload/";
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
	        field: 'name',
	        title: '姓名',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'age',
	        title: '年龄',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'description',
	        title: '描述',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
	    }, {
	        field: 'educationLevel',
	        title: '学历',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'major',
	        title: '专业',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'position',
	        title: '岗位',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'salary',
	        title: '薪资',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'company',
	        title: '就业公司',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'school',
	        title: '毕业院校',
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
	/**
	 * 暂时未显示字段
	 * {
	        field: 'content',
	        title: '内容信息',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    } , {
	        field: 'schoolID',
	        title: '所属校区',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'videoURL',
	        title: '视频地址',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }
	 */
	function refreshData(){
		$.ajax({
			url: "/feicuiwb/student/queryAllStudent?act=read",
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
