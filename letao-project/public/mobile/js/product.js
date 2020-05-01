$(function () {



    var spId = getParams()
    // console.log(spId.id);
    // console.log(spId);
    getData1(spId, function (data) {
        // console.log(data);
        // console.log(data.size);
        // console.log(data.size.split('-'));
        var sizeArr = data.size.split('-')
        var newArr = []
        for ( var i = 0 ; i <= sizeArr[1]-sizeArr[0] ; i++ ){
            newArr.push(parseInt(sizeArr[0])+i)
        }
        // console.log(newArr);
        $(".myMuban").html(template('banner',{
            spData : data,
            sizeArr : newArr
        }))

        //轮播
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
        });


    })

    //点击尺码 高亮显示
    // var size
    $(".myMuban").on('tap','.sizeBtn',function () {
        // console.log(321);
        $(this).addClass("now").siblings().removeClass("now")
        // size =  $(this).html()
        // console.log(size);


    })

    //点击 加减
    // var num;  //记录 商品的数量

    $(".myMuban").on('tap','.jian',function () {
        if( $('.num').val() <= 0 ){
            mui.toast('再减就没啦！')
            return
        }
        $('.num').val(parseInt($('.num').val())-1)
        // num = parseInt($('.num').val())
        // console.log(num);

    })

    $(".myMuban").on('tap','.jia',function () {
        if( $('.num').val() >= parseInt($('.shuliang').text()) ){
            mui.toast('不能再多了！')
            return
        }
        $('.num').val(parseInt($('.num').val())+1)
        // num = parseInt($('.num').val())
        // console.log(num);

    })

    // 点击 加入购物车
    $('.addCart').on('tap',function () {
        var size = $('.sizeBtn.now').html()
        var num = parseInt($('.num').val());

        //点击 加入购物车 判断 尺码 是否 有now 类  判断 num框 是有为0
        // console.log($('.sizeBtn').hasClass('now'));
        if( !$('.sizeBtn').hasClass('now') ){
            mui.toast('请选择尺码')
            return
        }
        if( num === 0 ){
            mui.toast('请选择数量')
            return
        }

        //如果 尺寸 数量选择完成 再点击 加入 购物车 ：
        console.log(spId);
        console.log(num);
        console.log(size);

        loginAjax({
            url: "/cart/addCart",
            data: {
                productId: spId.id,
                num : num,
                size : size
            },
            type: 'post',
            success:function (data) {
                // console.log(data);
                if(data.success){
                    //如果登录了
                    // console.log('登录了');
                    // document.getElementById("confirmBtn").addEventListener('tap', function() {
                        mui.confirm('添加成功 去看看？', '温馨提示', ['是', '否'], function(e) {
                            if (e.index == 0) {
                                // info.innerText = '添加成功'
                                location.href = "/mobile/user/cart.html"
                                //点击 是
                            } else {
                                //点击否 什么也不做

                            }
                        })
                    // });

                }
            },
            error:function () {
                console.log('失败');
            }

        })
    })
})

//封装拿数据
var getData1 = function(id, callback){
    $.ajax({
        url:"/product/queryProductDetail",
        data: id,
        type: 'get',
        dataType: 'json',
        success:function (data) {
            callback(data)
        }
    })

}


