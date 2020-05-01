$(function () {
var myYzm
    //点击注册  非空校验 所有 信息 合格 之后 请求数据
    $('.updateBtn').on('tap' , function () {
        var oldPassword = $.trim($('.oldPassword').val());
        var newPassword1 = $.trim($('.newPassword1').val());
        var newPassword2 = $.trim($('.newPassword2').val());
        var yzm  = $.trim($('.yzmInp').val())
        console.log(oldPassword);
        console.log(yzm);
        console.log(newPassword1);

        if(!oldPassword) return mui.toast('请输入密码');
        if(!newPassword1) return mui.toast('请输入新密码');
        if(!newPassword2) return mui.toast('请输入确认新密码');
        if(!(newPassword2 === newPassword1 )) return mui.toast('密码确认不一致');



        loginAjax({
            url:'/user/updatePassword',
            type:'post',
            data:{
                oldPassword: oldPassword,
                newPassword: newPassword1,
                vCode: yzm
            },
            dataType:'json',
            success: function (data) {
                console.log(data);

                if( data.error==403 ){
                    mui.toast(data.message)
                }else{
                    mui.toast('修改成功')
                    //修改成功500毫秒后跳转

                    setTimeout(function () {
                        location.href = "./index.html"
                    },500)

                }

            }
        })

    })



    //点击获取验证码
    $('.yzmBtn').on('tap',function () {
        var $this = $(this)
        //禁用按钮
        $this.attr('disabled',true)
        //有 灰色的类 就return
        if($this.hasClass('hui')) return
        //点击按钮 按钮改变样式
        var t = 60;
        $this.addClass('hui')
        $this.html(t+'秒后重新获取')
        //定时器
        var yzmTime = setInterval(function () {
            t--;
            $this.html(t+'秒后重新获取')

            if( t < 0 ){
                clearInterval(yzmTime)
                $this.removeClass('hui')
                $this.html('获取验证码')
                $this.removeAttr("disabled");
                t = 60;
            }
            // console.log(t);
        },1000)

        //获取验证码
        $.ajax({
            url:"/user/vCodeForUpdatePassword",
            type:'get',
            // data:,
            success: function (data) {
                myYzm = data.vCode
                $('.yzmInp').val(data.vCode)
                console.log(data);
            }
        })
    })


    //点击 小眼睛 切换 input 的type类型
    $('.mui-icon-eye').on('tap',function () {
        // 点击时  判断是否有高亮显示的类
        if( $(this).hasClass('active') ){
            //有有就删除类
            $(this).removeClass('active');
            //并 改变 input的 type类型 为 text 可见
            $(this).prev().attr('type',"password")
        }else{
            //没有就添加
            $(this).addClass('active');
            //并 改变 input的 type类型 为 text 可见
            $(this).prev().attr('type',"text")

        }

        // console.log($(this).prev().attr('type'));

    })
})