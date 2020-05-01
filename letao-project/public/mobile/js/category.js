$(function () {
    //根据 一级表 渲染二级表

    //渲染一级分类
    yiji(function (data) {
        // console.log(data);
        var yijiHtml = template('yijiHtml', data);
        $(".lg_category_con_left ul").html(yijiHtml)
        var cateId = $(".lg_category_con_left ul li").find(".now").attr("data-id");

        erji(cateId,function (erjiData) {
            // console.log(erjiData);
            var erjiHtml = template('erjiHtml', erjiData);
            $(".lg_category_con_right ul").html(erjiHtml)
        })

    })



    $(".lg_category_con_left ul ").on("tap",'a',function () {
        // console.log('asd');
        $(this).parent().siblings().children("a").removeClass("now")
        $(this).addClass("now")

        var cateId = $(this).attr("data-id");
        // console.log(cateId);
        erji(cateId,function (data) {
            var data = template('erjiHtml', data);
            $(".lg_category_con_right ul").html(data)
        });
        return false;
    })

})

//封装
 var yiji = function  (callback){
     $.ajax({
         url:"/category/queryTopCategory",
         type:'get',
         dataType:'json',
         //请求成功 得到数据data
         success: function (data) {
             // console.log(data)
             //渲染
             callback && callback(data);

         }
     })
}
var erji = function  (id, callback){
    $.ajax({
        url:"/category/querySecondCategory",
        type:'get',
        dataType:'json',

        data:{
            id : id
        },
        //请求成功 得到数据data
        success: function (data) {
            // console.log(data)
            //渲染
            callback && callback(data)
        }
    })
}
