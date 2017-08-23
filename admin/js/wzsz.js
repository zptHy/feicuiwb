$(function(){
	// 页面全局变量
	var  GLOBAL = {};
	// 点击编辑按钮，模态框显示此行的所有数据
	window.dictActionEvents = {
        'click #modify': function (e, value, row) {
        	GLOBAL.status = "modify";
        	assignValue(row);
        }
//        'click #remove': function (e, value, row) {
//           // alert('remove:'+row.id); 
//            $.ajax({
//            	url: "/feicuiwb/WebsiteInfo/deleteCourse?id="+row.id,
//            	type: "get",
//            	success: function(res){
//            		if(res.msg=="删除课程成功"){
//            			refreshData();
//            			alert("删除课程成功");
//            		}else{
//            			alert("删除课程失败");
//            		}
//            	},
//            	error: function(error){
//            		alert("删除课程失败");
//            	}
//            });
//        }
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
			url: "",
			schoolImg: "",
			description: "",
			transport: "",
			address: "",
			tel: "",
			fax: "",
			email: "",
			homeTitle: "",
			homeKeywords: "",
			homeDesc: "",
			footSettings: "",
			consultUrl: "",
			worksTitle: "",
			worksKeywords: "",
			worksDesc: "",
			consultTitle: "",
			consultKeywords: "",
			consultDesc: "",
			teacKeywords: "",
			teacDesc: "",
			recruitTitle: "",
			recruitDesc: "",
			stuTitle: "",
			stuKeywords: "",
			stuDesc: "",
			schoolID: ""
		};
		if(GLOBAL.status == "modify"){
			$("#myModalTitle").text("修改网站信息");
		}else{
			$("#myModalTitle").text("新增网站信息");
		}
    	$("#hideId").val(row.id);
    	$("#name").val(row.name);
    	$("#url").val(row.url);
    	$("#schoolImg").val(row.schoolImg);   	
    	$("#description").val(row.description);
    	$("#transport").val(row.transport);
    	$("#address").val(row.address);   	
    	$("#tel").val(row.tel);
    	$("#fax").val(row.fax);
    	$("#email").val(row.email);   	
    	$("#homeTitle").val(row.homeTitle);
    	$("#homeKeywords").val(row.homeKeywords);
    	$("#homeDesc").val(row.homeDesc); 	
    	$("#footSettings").val(row.footSettings);
    	$("#consultUrl").val(row.consultUrl);
    	$("#worksTitle").val(row.worksTitle);   	
    	$("#worksKeywords").val(row.worksKeywords);
    	$("#worksDesc").val(row.worksDesc);
    	$("#consultTitle").val(row.consultTitle);   	
    	$("#consultKeywords").val(row.consultKeywords);
    	$("#consultDesc").val(row.consultDesc);
    	$("#teacKeywords").val(row.teacKeywords);   	
    	$("#teacDesc").val(row.teacDesc);
    	$("#recruitTitle").val(row.recruitTitle);
    	$("#recruitDesc").val(row.recruitDesc);
    	$("#stuTitle").val(row.stuTitle);
    	$("#stuKeywords").val(row.stuKeywords);
    	$("#stuDesc").val(row.stuDesc);
    	$("#schoolID").val(row.schoolID);
    	
     	$('#myModal').modal('toggle');
	}
	
	$("#sureCommit").click(function(){
		// 修改
		if(GLOBAL.status == "modify"){
			//alert("修改："+$("#hideId").text());
			var name = $("#name").val().trim();
			var url = $("#url").val().trim();
			var picFile = $("#picFile").val().trim();
			var description = $("#description").val().trim();
			var transport = $("#transport").val().trim();
			var address = $("#address").val().trim();
			var tel = $("#tel").val().trim();
			var fax = $("#fax").val().trim();
			var email = $("#email").val().trim();
			var homeTitle = $("#homeTitle").val().trim();
			var homeKeywords = $("#homeKeywords").val().trim();
			var homeDesc = $("#homeDesc").val().trim();
			var footSettings = $("#footSettings").val().trim();
			var consultUrl = $("#consultUrl").val().trim();
			var worksTitle = $("#worksTitle").val().trim();
			var worksKeywords = $("#worksKeywords").val().trim();
			var worksDesc = $("#worksDesc").val().trim();
			var consultTitle = $("#consultTitle").val().trim();
			var consultKeywords = $("#consultKeywords").val().trim();
			var consultDesc = $("#consultDesc").val().trim();
			var teacKeywords = $("#teacKeywords").val().trim();
			var teacDesc = $("#teacDesc").val().trim();
			var recruitTitle = $("#recruitTitle").val().trim();
			var recruitDesc = $("#recruitDesc").val().trim();
			var stuTitle = $("#stuTitle").val().trim();
			var stuKeywords = $("#stuKeywords").val().trim();
			var stuDesc = $("#stuDesc").val().trim();
			var schoolID = $("#schoolID").val().trim();
	
			var options = {
				dataType: "json",
				url: "/feicuiwb/websiteInfo/updateWebsiteInfo",
				type: "post",
				beforeSubmit: function(){
					//alert("正在修改");
				},
				success:  function(result){
					console.log(result);
					if(result.msg == "修改网站信息成功"){
						refreshData();
						alert("修改网站信息成功");
					}else{
						alert("修改网站信息失败");
					}
				},
				error: function(){
					alert("修改网站信息失败");
				}
			};
			$("#myForm").ajaxSubmit(options);
			
			
		}else{// 新增
			// 非空校验
/*			var chineseName = $("#chineseName").val().trim();
			var englishName = $("#englishName").val().trim();
			var redirectUrl = $("#redirectUrl").val().trim();
			var courseDescription = $("#courseDescription").val().trim();
			var pictureFile = $("#pictureFile").val().trim();
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
				alert("图片必须上传");
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
					if(result.msg == "添加课程成功"){
						refreshData();
						alert("上传成功")
					}else{
						alert("上传失败")
					}
				},
				error: function(){
					alert("上传失败");
				}
			};
			$("#myForm").ajaxSubmit(options);*/
		}

		$('#myModal').modal('toggle');
	});
     
	// 操作列的显示按钮
    function actionFormatter(value) {
         return [ '<button id="modify" class="btn btn-success btn-xs rightSize detailBtn" type="button"><i class="glyphicon glyphicon-wrench"></i> 修改</button>',
            // '<button id="remove" class="btn btn-danger btn-xs rightSize packageBtn" style="margin-left: 2px;" type="button"><i class="glyphicon glyphicon-remove"></i> 删除</button>'
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
	        field: 'name',
	        title: '校区名称',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    },{
	        field: 'url',
	        title: '网址',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    },{
	        field: 'schoolImg',
	        title: '校区图片',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<div><a href="'+row.url+'"  target="_blank"><img style="height:30px" src="/feicuiwb/upload/'+value+'" /></a></div>';
            }
	    }, {
	        field: 'description',
	        title: '校区简介',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
    		formatter: function(value, row, index){
return '<div style="display: inline-block; width: 100px; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" data-toggle="tooltip" data-placement="top" title='+value+'><span>'+value+'</span></div>';
            }
	    }, {
	        field: 'transport',
	        title: '乘车方式',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    },  {
	        field: 'address',
	        title: '地址',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'tel',
	        title: '电话',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    },  {
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
			url: "/feicuiwb/websiteInfo/queryWebsiteInfo?act=read",
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
