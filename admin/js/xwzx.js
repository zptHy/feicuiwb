$(function(){
	Date.prototype.format = function(format) {
       var date = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3),
          "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
          format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
          if (new RegExp("(" + k + ")").test(format)) {
                 format = format.replace(RegExp.$1, RegExp.$1.length == 1
                        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
          }
       }
       return format;
	}
	
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
            	url: "/feicuiwb/news/deleteNews?id="+row.id,
            	type: "get",
            	success: function(res){
            		if(res.msg=="删除新闻成功"){
            			refreshData();
            			alert("删除新闻成功");
            		}else{
            			alert("删除新闻失败");
            		}
            	},
            	error: function(error){
            		alert("删除新闻失败");
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
 			type: "",
 			title: "",
 			description: "",
 			keywords: "",
 			resource: "",
 			author:"",
 			img:"",
 			imgMobile:"",
 			content:"",
 			sequence:""
 		};
 		if(GLOBAL.status == "modify"){
 			$("#tip").text("修改新闻资讯");
 		}else{
 			$("#tip").text("新增新闻资讯");
 		}
     	$("#hideId").val(row.id);
     	$("#type").val(row.type);
     	$("#title").val(row.title);
     	$("#description").val(row.description);
     	$("#keywords").val(row.keywords);
     	$("#resource").val(row.resource);
     	$("#author").val(row.author);
     	$("#pictureFile").val("");
     	$("#mobilePicFile").val("");
     	$("#sequence").val(row.sequence);
     	ue.ready(function(){
     		ue.setContent(row.content);
     	});
     	
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
		/*height: 450,*/
	    columns: [{
	        field: 'id',
	        title: 'ID',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'type',
	        title: '类型',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'img',
	        title: 'PC端图片',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<div><img style="height:30px" src="/feicuiwb/upload/'+value+'" /></div>';
            }
	    },{
	        field: 'title',
	        title: '标题',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<span style="display:inline-block; width: 100px; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" data-toggle="tooltip" data-placement="top" title="'+value+'">'+value+'</span>';
            }
	    }, {
	        field: 'resource',
	        title: '来源',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    }, {
	        field: 'author',
	        title: '作者',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    },{
	        field: 'keywords',
	        title: '关键字',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
	    },{
	        field: 'publishTime',
	        title: '发布时间',
	        width: 100,
    		align: 'center',
    		valign: 'middle',
            formatter: function(value, row, index){
            	return '<span>'+new Date(value).format('yyyy-MM-dd')+'</span>';
            }
	    },{
	        field: 'sequence',
	        title: '排序',
	        width: 100,
    		align: 'center',
    		valign: 'middle'
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
	$.ajax({
		url: "/feicuiwb/news/queryAllNews?act=read",
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
			var type = $("#type").val().trim();
			var title = $("#title").val().trim();
			var description = $("#description").val().trim();
			var keywords = $("#keywords").val().trim();
			var resource = $("#resource").val().trim();
			var author = $("#author").val().trim();
			var sequence = $("#sequence").val().trim();
			var content = ue.getContent().trim(); //获取Html内容(包括标签)
			$("#content").val(content);
			
			if(!type){
				alert("类型不能为空");
				return;
			}
			if(!title){
				alert("标题不能为空");
				return;
			}
			if(!description){
				alert("简介不能为空");
				return;
			}
			if(!keywords){
				alert("关键字不能为空");
				return;
			}
			if(!resource){
				alert("来源不能为空");
				return;
			}
			if(!author){
				alert("作者不能为空");
				return;
			}
			if(!sequence){
				alert("排序不能为空");
				return;
			}
			if(!content){
				alert("信息内容不能为空");
				return;
			}
			
			var options = {
				dataType: "json",
				url: "/feicuiwb/news/updateNews",
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
					alert("修改新闻失败");
				}
			};
			$("#myForm").ajaxSubmit(options);
			
			
		}else{// 新增
			// 非空校验
			var type = $("#type").val().trim();
			var title = $("#title").val().trim();
			var description = $("#description").val().trim();
			var keywords = $("#keywords").val().trim();
			var resource = $("#resource").val().trim();
			var author = $("#author").val().trim();
			var picFile = $("#picFile").val().trim();
			var mobilePicFile = $("#mobilePicFile").val().trim();
			var sequence = $("#sequence").val().trim();
			var content = ue.getContent().trim(); //获取Html内容(包括标签)
			console.log(content);
			$("#content").val(content);
			
			if(!type){
				alert("类型不能为空");
				return;
			}
			if(!title){
				alert("标题不能为空");
				return;
			}
			if(!description){
				alert("简介不能为空");
				return;
			}
			if(!keywords){
				alert("关键字不能为空");
				return;
			}
			if(!resource){
				alert("来源不能为空");
				return;
			}
			if(!author){
				alert("作者不能为空");
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
			if(!sequence){
				alert("排序不能为空");
				return;
			}
			if(!content){
				alert("信息内容不能为空");
				return;
			}
			
			var options = {
				dataType: "json",
				type: "post",
				url: "/feicuiwb/news/insertNews",
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
					alert("添加新闻失败");
				}
			};
			$("#myForm").ajaxSubmit(options);
		}
	});
	
	function refreshData(){
		$.ajax({
			url: "/feicuiwb/news/queryAllNews?act=read",
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
