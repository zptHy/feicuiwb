$(function () {
	
	$('#header').load('header.html');
	$('#footer').load('footer.html');
	
//	$('.a').click(function () {
//		$('.dd,.bb,.cc').slideUp(200);
//		$('.aa').slideToggle(300);
//	});
//	$('.b').click(function () {
//		$('.dd,.aa,.cc').slideUp(200);
//		$('.bb').slideToggle(300);
//	});
//	$('.c').click(function () {
//		$('.dd,.bb,.aa').slideUp(200);
//		$('.cc').slideToggle(300);
//	});
//	$('.d').click(function () {
//		$('.aa,.bb,.cc').slideUp(200);
//		$('.dd').slideToggle(300);
//	});
	
	//终端 红色图
//	$('.terminals').hover(function () {
//		var index = $(this).index()+1;
//		$(this).find('img').attr('src','img/java/content2_0' + index + '_1.png');
//	},function () {
//		var index = $(this).index()+1;
//		$(this).find('img').attr('src','img/java/content2_0' + index + '.png');
//	});
	
	//ABCD区域点击事件
	var abcd =	$(".kecheng_four>ul>li");
	var bgUrl = ['img/java/img_A.png','img/java/img_B.png','img/java/img_C.png','img/java/img_D.png'];
	var bgUrlOld = ['img/java/img_A1.png','img/java/img_B1.png','img/java/img_C1.png','img/java/img_D1.png'];
	abcd.click(function(){
		for (var i = 0; i < abcd.length;i++) {
			abcd.eq(i).css('background-image',"url("+bgUrlOld[i]+")");
		}
		abcd.eq($(this).index()/2).css("background-image","url("+bgUrl[$(this).index()/2] +")");
	});
	
	//各种平台pc，移动，平板等点击事件切换区域
	var duan = 	document.querySelectorAll(".xueJava>ul>li>p:nth-child(1)");
	var duanbg = ['img/java/img_4.png','img/java/img_8.png','img/java/img_7.png','img/java/img_6.png','img/java/img_5.png'];
	var duanbgOld = ['img/java/img_13.png','img/java/img_9.png','img/java/img_10.png','img/java/img_11.png','img/java/img_12.png'];
	for (var i = 0;i < duan.length;i++) {
		duan[i].index = i;
		duan[i].onclick = function(){
			for (var j=0;j<duan.length;j++) {
				duan[j].style.backgroundImage = "url("+duanbg[j]+")";
			}
			duan[this.index].style.backgroundImage = "url("+duanbgOld[this.index]+")";
		}
	}
});