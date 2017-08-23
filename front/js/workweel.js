/**
 * Created by Administrator on 2017/7/20.
 */
$(function(){
    // $("#header").load("header.html");
    // $("#footer").load("footer.html");
    // $("img.lazy").lazyload();
//    瀑布流开始
    var container = $(".waterfull ul");
    var loading = $("#imloading");
//    初始化loading状态
    loading.data("on",true);
//    判断瀑布流最大宽度1100
    tores();
    function tores(){
        var tmpWid = $(window).width();
        if(tmpWid>1100){
            tmpWid=1100;
        }else{
            var column=Math.floor(tmpWid/340);
            tmpWid=column*340;
            // console.log(column)
        }
        $('.waterfull').width(tmpWid);
    }
    $(window).resize(function(){
        tores();
    });
    container.imagesLoaded(function(){
        container.masonry({
            columnWidth: 340,
            itemSelector : '.item',
            isFitWidth: true,//是否根据浏览器窗口大小自动适应默认false
            isAnimated: true,//是否采用jquery动画进行重拍版
            isRTL:false,//设置布局的排列方式，即：定位砖块时，是从左向右排列还是从右向左排列。默认值为false，即从左向右
            isResizable: true,//是否自动布局默认true
            animationOptions: {
                duration: 400,
                // easing: 'easeInOutBack',//如果你引用了jQeasing这里就可以添加对应的动态动画效果，如果没引用删除这行，默认是匀速变化
                queue: false//是否队列，从一点填充瀑布流
            }
        });
    });
    //模拟ajax请求
    $.ajax({
    	async: true,　　
        type: "get",
        url: "../json/homeWorkInfo.json",
		cache: false,
		dataType: "json",
        beforeSend: function(XMLHttpRequest){
            console.log("开始请求")
        },
        success: function(res){
            var data = res.data;
            var data1 = [];

            $(window).scroll(function(){
                if(!loading.data("on")) return;
                var itemNum =$(".item").length;
                // console.log(itemNum);
                var itemArr=[];
                itemArr[0]=$(".item").eq(itemNum-1).offset().top+$(".item").eq(itemNum-1)[0].offsetHeight;
                itemArr[1]=$(".item").eq(itemNum-2).offset().top+$(".item").eq(itemNum-1)[0].offsetHeight;
                itemArr[2]=$(".item").eq(itemNum-3).offset().top+$(".item").eq(itemNum-1)[0].offsetHeight;
                var abcd = document.getElementById("abcd");
                var $li = abcd.getElementsByTagName("li");
                var maxTop=Math.max.apply(null,itemArr);
                num = $li.length-6;
                // $("#abcd").css("height", maxTop+20);
                // container.css("height", maxTop+20);
                // $("#waterfull").css("height", maxTop+20);
                    if(maxTop<($(window).height()+$(document).scrollTop())){
                        for(var i=num;i<num+4;i++){
                                if(i>=data.length){
                                    break;
                                }else {
                                    data1.push(data[i]);
                                    console.log(i,data[i].type,data1);
                                }
                        }
                        //console.log(data1);
                        //加载更多数据
                        loading.data("on",false).fadeIn(800);
                        if(itemNum>=data.length+6){
                            loading.text('就有这么多了！');
                        }else{
                            var html="";
                            for(var i in data1){
                                html+='<li class="item clear"><a href="javascript:" class="a-img"><img src=../upload/'+data1[i].img +' alt=""></a><div class="clear s-detail"><div class="fl"><img    src=../upload/'+data1[i].avatar +' alt="头像"></div><div class="fl"><div class="fl-top"><span>'+data1[i].stuName +'</span><em>'+data1[i].classInfo +'</em></div><div class="fl-bot"><span>'+data1[i].type +'</span></div></div></div></li>';
                            }
                            data1 =[];

                            /*请求数据时延时800毫秒*/
                            var time=setTimeout(function(){
                                var $newElems = $(html).css({ opacity: 0}).appendTo(container);
                                container.imagesLoaded(function() {
                                    $newElems.animate({opacity: 1}, 400);
                                    container.masonry('appended', $newElems, true);
                                    loading.data("on", true).fadeOut();
                                    clearTimeout(time);
                                });
                            },400)
                        }
                    }

            });

        },

        complete: function(XMLHttpRequest, textStatus){

        },
        error: function(){
            alert("获取数据出错")
        }
    });

});