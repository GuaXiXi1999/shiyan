$(function () {
    $(".queren").on('tap', function () {
        //非空校验
        if( $(".mui-input-clear").val()== '' ){
            mui.toast("请输入用户名")
            return
        }
        if( $(".mui-input-password").val()== '' ){
            mui.toast("请输入密码")
            return
        }
        //点击确认是 获取表单 序列化数据
        console.log($('form').serialize());
        var data = $('form').serialize()

        //点击请求 登录验证接口
        $.ajax({
            url:"/user/login",
            type: 'post',

            // 这里 data 可以传 特殊的字符串 这里 序列化的表单数据 就是一个特殊的字符串
            data:data,
            dataType: 'json',
            success:function (data) {
                console.log(data);
                if( data.error == 403 ){
                    mui.toast(data.message)
                }else{
                    //登录成功 我就 截取字符串(拼接的地址) 并跳转回去
                    // console.log(getParams().returnUrl);
                    var url = location.search.replace("?returnUrl=", '')
                    console.log(url);
                    mui.toast('登录成功')

                    if( url ){
                        location.href = url;

                    }else{

                        //如果后面 没有拼接 地址 就跳转到个人中心
                        location.href = "/mobile/user/index.html"
                        console.log('个人中心');
                    }
                }
            },
            error:function () {
                mui.toast('服务器繁忙')

            }

        })

    })


    //点击注册
    $('.zhuce').on('tap',function () {
        location.href = './register.html'
    })


})