/**
 * Created by Administrator on 2017/7/20.
 */
$(function(){
    // window.onload = function(){
    var arr = ["loadimg/1.jpg","loadimg/2.jpg","loadimg/3.jpg","loadimg/4.jpg","loadimg/5.jpg","loadimg/6.jpg","loadimg/7.jpg"];
    //懒加载
    $("img.lazy").lazyload();

//排列li位置\

   window.onload = function(){
       iiwnet()
   };
    var currentWidth = 1100;
    function iiwnet(){
        var $wrap = $(".showWeel");
        var margin = 15;
        var li = $(".showWeel>li");
        var li_W = 355;
        //记录li高度
        var h = [];
        li.css("position","absolute");
        var n = 3;
        // alert(1)
        for(var i =0;i<li.length;i++){
            li_H = li[i].offsetHeight;//获取每个li的高度
            if(i<3){//最多是n个，如果比n小就是第一行
                h[i] = li_H;
                console.log(h);
                li.eq(i).css("top",0);
                li.eq(i).css("left",i*li_W)
            }else{
                // h[i] = li_H;
                console.log(h);
                min_H = Math.min.apply(null,h);//数组中最小的高度
                max_H = Math.max.apply(null,h);
                $wrap.css("height",max_H)
                minIndex = getarraykey(h,min_H);//最小值对应的指针
                h[minIndex] += li_H +margin;//加上新高度更新高度

                li.eq(i).css("top",min_H+margin);
                li.eq(i).css("left",minIndex*li_W);
                // li.animate({opacity:1});
            }
        }
        //    利用for in运算返回数组中某个值的对应项数
        function getarraykey(s,v){
            for(k in s){
                if(s[k]==v){
                    return k;
                }
            }
        }
        // window.onresize = function() {iiwnet();};
    }
// };

})