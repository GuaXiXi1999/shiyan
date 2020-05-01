$(function () {
    
    var myYzm
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
    
    //点击注册时 各种非空校验
    
    $('.registerBtn').on('tap', function () {
        // 获取用户名 （去除两边空格符 之后的数据）
        var userName = $.trim($('.userName').val())
        // 获取电话号码
        var phone = $.trim($('.phone').val())
        // 获取电话密码
        var password = $.trim($('.password').val())
        // 获取电话确认密码
        var againPassword = $.trim($('.againPassword').val())
        //获取验证码
        var yzmInp = $.trim($('.yzmInp').val())




        if(!userName) return mui.toast('请输入用户名');
        if(!phone) return mui.toast('请输入手机号');

        //不为空的话 正则表达式 判断 手机号 以1开头 十一位
        if(!/^[1]\d{10}$/.test(phone)) return mui.toast('请输入正确手机号');
        if(!password) return mui.toast('请输入密码');
        if(!againPassword) return mui.toast('请输入再次密码');

        //两次密码不一致
        if(!(password === againPassword)) return mui.toast('两次密码不一致');
        //验证码非空校验
        if(!yzmInp) return mui.toast('请输入验证码');
        //判断输入的验证码 是否与后台的验证码相匹配
        if( !(yzmInp === myYzm) )return mui.toast('验证码错误')



        console.log('成功');

        //所有信息 正确 则请求数据
        $.ajax({
            url:'/user/register',
            type: 'post',
            data:{
                username: userName,
                password: password,
                mobile: phone,
                vCode :yzmInp
            },
            dataType: 'json',
            success:function (data) {
                console.log(data);
                if(data.success){
                    console.log('注册成功');

                    location.href = "./index.html"
                }else{
                    console.log(data.message);

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
            url:"/user/vCode",
            type:'get',
            // data:,
            success: function (data) {
                myYzm = data.vCode
                $('.yzmInp').val(data.vCode)
            }
        })
    })



    
    
})