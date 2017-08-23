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
        	if(!confirm("是否确认删除")){
        		return;
        	}
            $.ajax({
            	url: "/feicuiwb/enroll/deleteEnroll?id="+row.id,
            	type: "get",
            	success: function(res){
            		if(res.msg=="删除报名学员成功"){
            			refreshData();
            			alert("删除学员成功");
            		}else{
            			alert("删除学员asdasd失败");
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
			sex: "",
			educationLevel: "",
			age: "",
			idCard: "",
			city: "",
			address: "",
			telphone: "",
			email: "",
			resource: "",
			description: "",
			school: "",
			major: ""
		};
		if(GLOBAL.status == "modify"){
			$("#myModalTitle").text("修改学员");
		}else{
			$("#myModalTitle").text("新增学员");
		}
    	$("#hideId").val(row.id);
    	$("#name").val(row.name);
    	$("#sex").val(row.sex);
    	$("#educationLevel").val(row.educationLevel);
    	$("#age").val(row.age);
    	$("#idCard").val(row.idCard);
    	$("#city").val(row.city);
    	$("#address").val(row.address);
    	$("#telphone").val(row.telphone);
    	$("#email").val(row.email);
    	$("#resource").val(row.resource);
    	$("#description").val(row.description);
    	$("#school").val(row.school);
    	$("#major").val(row.major);
    	
     	$('#myModal').modal('toggle');
	}
	
	$("#sureCommit").click(function(){
		// 修改
		if(GLOBAL.status == "modify"){
			var name = $("#name").val().trim();
			var sex = $("#sex").val().trim();
			var educationLevel = $("#educationLevel").val().trim();
			var age = $("#age").val().trim();
			var idCard = $("#idCard").val().trim();
			var city = $("#city").val().trim();
			var address = $("#address").val().trim();
			var telphone = $("#telphone").val().trim();
			var email = $("#email").val().trim();
			var resource = $("#resource").val().trim();
			var description = $("#description").val().trim();
			var school = $("#school").val().trim();
			var major = $("#major").val().trim();
			var options = {
				dataType: "json",
				url: "/feicuiwb/enroll/updateEnroll",
				type: "post",
				beforeSubmit: function(){
				},
				success:  function(result){
					if(result.msg == "修改报名学员成功"){
						refreshData();
					}else{
						alert("修改学员失败");
					}
				},
				error: function(){
					alert("修改学员失败");
				}
			};
			$("#myForm").ajaxSubmit(options);	
		}

		$('#myModal').modal('toggle');
	});
     
	// 操作列的显示按钮
    function actionFormatter(value) {
    	console.log('value-->'+value);
    	var info = (value===1)?"审阅":"已阅";
         return [
             '<button id="modify" class="btn btn-success btn-xs rightSize detailBtn" type="button"><i class="glyphicon glyphicon-wrench"></i> '+info+'</button>',
             '<button id="remove" class="btn btn-danger btn-xs rightSize packageBtn" style="margin-left: 2px;" type="button"><i class="glyphicon glyphicon-remove"></i> 删除</button>'
         ].join('');
	}
	// 初始化table
	$('#table').bootstrapTable({
		dataType: "json",
		toolbar: "#btnList",
		// 导出excel
		buttonsAlign: "left",//按钮对齐方式
		showExport: true,
		exportDataType: "all",
		exportTypes: ['excel'],
		exportOptions: {
	        fileName: '网站报名数据'
	   },
		height: 450,
	    columns: [{
	        field: 'id',
	        title: 'ID',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
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
	    },{
	        field: 'telphone',
	        title: '电话',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    },{
	        field: 'email',
	        title: '邮箱',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    },{
	    	field: 'educationLevel',
	    	title: '学历',
	    	width: 100,
	    	align: 'center',
	    	valign: 'middle'
	    }, {
	        field: 'city',
	        title: '所在城市',
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
	        field: 'description',
	        title: '描述',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<div style="display: inline-block; width: 100px; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" data-toggle="tooltip" data-placement="top" title='+value+'><span>'+value+'</span></div>';
            }
	    },{
	        field: 'isPass',
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
			url: "/feicuiwb/enroll/queryAllEnroll?act=read",
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
