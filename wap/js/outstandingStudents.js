$(function(){
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	
	/**************************数据交互******************************/
    $.ajax({
        async: false,　　　　　　　
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
					"<li>" +
					    "<img src="+"../upload/"+item.avatar+" class="+"studentPic"+"/>" +
						"<div class="+"studentsDes"+">"+
							"<p class="+"name"+">"+item.name+"</p>"+
							"<p class="+"enterprise"+">"+item.company+"</p>"+
							"<p class="+"post"+">"+item.position+"</p>"+
						   
						"<div/>"+
					    "<div class="+"works"+"><a href='studentswork.html'>看作品</a></div>"+
					"</li>"; 
		   	    });
	   	    	$(".studentsList").html(list);
			}else{
				alert("请求失败");
			}
        }
    });
})
