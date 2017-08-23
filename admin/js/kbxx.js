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
            	url: "/feicuiwb/classInfo/deleteClassInfo?id="+row.id,
            	type: "get",
            	
            	success: function(res){
        			
            		if(res.msg=="删除班级成功"){
            			refreshData();
            			alert("删除班级成功");
            		}else{
            			alert("删除班级失败");
            		}
            	},
            	error: function(error){
            		alert("删除班级失败");
            	}
            });
        }
    };
     $("#btnAdd").click(function(){
    	GLOBAL.status = "add";
    		//$('#myModal').modal('toggle');
		assignValue();
	});
		// 为模态框赋值
	function assignValue(row){
		var row = row || {
			id: -1,
			title: "",
			url: "",
			openTime: "",
			sequence: "",
			schoolID: ""
		};
		if(GLOBAL.status == "modify"){
			$("#myModalTitle").text("修改课程");
		}else{
			$("#myModalTitle").text("新增班级");
		}
    	$("#hideId").val(row.id);
    	$("#title").val(row.title);
    	$("#url").val(row.url);
    	$("#openTime").val(row.openTime);
    	$("#sequence").val(row.sequence);
    	$("#schoolID").val(row.schoolID);
    	
     	$('#myModal').modal('toggle');
	}
	
	$("#sureCommit").click(function(){
		document.getElementById("schoolID").value = -1;
		// 修改
		if(GLOBAL.status == "modify"){
			//alert("修改："+$("#hideId").text());
			var title = $("#title").val().trim();
			var url = $("#url").val().trim();
			var res=isEmail(url);
			if(!res){
				alert("连接地址格式不正确");
				return;
			}
			var openTime = $("#openTime").val().trim();
			var sequence = $("#sequence").val().trim();
			var schoolID = $("#schoolID").val().trim();
			var options = {
				dataType: "json",
				url: "/feicuiwb/classInfo/updateClassInfo",
				type: "post",
				beforeSubmit: function(){
					//alert("正在修改");
				},
				success:  function(result){
					console.log(result);
					if(result.msg == "修改班级成功"){
						refreshData();
						alert("修改班级成功");
						$('#myModal').modal('toggle');
					}else{
						alert("修改班级失败");
					}
				},
				error: function(){
					alert("修改班级失败");
				}
			};
			$("#myForm").ajaxSubmit(options);
		}else{// 新增
			// 非空校验
			var title = $("#title").val().trim();
			var url = $("#url").val().trim();
			var openTime = $("#openTime").val().trim();
			var sequence = $("#sequence").val().trim();
			var schoolID = $("#schoolID").val().trim();
			var res=isEmail(url);
			if(!title){
				alert("标题不能为空");
				return;
			}
			if(!url){
				alert("链接地址不能为空");
				return;
			}
			if(!res){
				alert("连接地址格式不正确");
				return;
			}
			if(!openTime){
				alert("开班日期不能为空");
				return;
			}
			if(!sequence){
				alert("排序不能为空");
				return;
			}
			if(!schoolID){
				alert("所属校区不能为空");
				return;
			}
			
			var options = {
				dataType: "json",
				type: "post",
				url: "/feicuiwb/classInfo/insertClassInfo",
				beforeSubmit: function(){
					//alert("正在上传");
				},
				success:  function(result){
					if(result.msg == "添加班级成功"){
						refreshData();
						alert("添加成功");
						$('#myModal').modal('toggle');
					}else{
						alert("添加失败");
					}
				},
				error: function(){
					alert("添加失败");
				}
			};
			$("#myForm").ajaxSubmit(options);
		}
	});
	
	//验证连接正则
	function isEmail(str){
		var reg =/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/; 
		return reg.test(str);
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
	        field: 'title',
	        title: '标题',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
           
	    }, {
	        field: 'url',
	        title: '链接地址',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'openTime',
	        title: '开班日期',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'sequence',
	        title: '排序',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
	    },{
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
			url: "/feicuiwb/classInfo/queryAllClassInfo?act=read",
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
	
	
}
)