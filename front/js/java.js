$(function () {
	
	/*$('#header').load('header.html');
	$('#footer').load('footer.html');*/
	
	$('.a').click(function () {
		$('.dd,.bb,.cc').slideUp(200);
		$('.aa').slideToggle(300);
	});
	$('.b').click(function () {
		$('.dd,.aa,.cc').slideUp(200);
		$('.bb').slideToggle(300);
	});
	$('.c').click(function () {
		$('.dd,.bb,.aa').slideUp(200);
		$('.cc').slideToggle(300);
	});
	$('.d').click(function () {
		$('.aa,.bb,.cc').slideUp(200);
		$('.dd').slideToggle(300);
	});
	
	//终端 红色图
	$('.terminals').hover(function () {
		var index = $(this).index()+1;
		$(this).find('img').attr('src','img/java/content2_0' + index + '_1.png');
	},function () {
		var index = $(this).index()+1;
		$(this).find('img').attr('src','img/java/content2_0' + index + '.png');
	});
	
	
});