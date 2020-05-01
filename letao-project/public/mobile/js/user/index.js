$(function () {

    //页面加载是 要请求数据  必须是登录状态
    loginAjax({
        url: '/user/queryUserMessage',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            //拿到数据 渲染
            $('.userName').html(data.username)
            $('.phone').html(data.mobile)
        }
    })
    
    
    //点击账号与安全  跳转 修改密码
    $('.anquan').on('tap',function () {
        // loginAjax
        location.href = './updatePassword.html'
    })

    //点击 区购物车
    $('.goCart').on('tap' , function () {
        location.href = './cart.html'

    })

    //点击 区购物车
    $('.goAdd').on('tap' , function () {
        location.href = './address.html'

    })



    //点击退出登录
    $('.outBtn').on('tap',function () {
        $.ajax({
            url: '/user/logout',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                //跳转 回登录页面
                location.href = './login.html'

            }

        })
    })

})