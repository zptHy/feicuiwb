$(function(){
	var GLOBAL = GLOBAL || {};
    
    /**************************数据交互******************************/
     $.ajax({
        async: true,　　　　　　　　
        type: "get",   
        url: "../json/homeStudent.json",   
        cache: false,
        dataType: "json",
        success: function(json) {  
        	if(json.code == 200){
        		var list = "";
		   		var data = json.data;  /**数组**/
		   	    data.forEach(function(item,index){
		   	    	//studentsMessage(item,index);
					list += 
					"<li class="+"perStudentBox"+">" +
					    "<img src="+"../upload/"+item.avatar+" class="+"studentPic"+"/>" +
						"<div class="+"studentsText"+">"+
							"<p class="+"studentsName"+">"+item.name+"</p>"+
							"<p class="+"studentsFirm"+">"+item.company+"</p>"+
							"<p class="+"studentsPost"+">"+item.position+"</p>"+
						    "<div class="+"worksBtn"+"><a href='workweel.html' >看作品</a></div>"+
						"<div/>"+
					"</li>"; 
		   	    });
	   	    	$(".studentPicList").html(list);
			}else{
				alert("请求失败");
			}
        }
    });
 })	
