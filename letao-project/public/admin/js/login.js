$(function(){
    $('#myLogin').bootstrapValidator({
        //图标 
            　feedbackIcons: {
                　　　　　　　　valid: 'glyphicon glyphicon-ok',
                　　　　　　　　invalid: 'glyphicon glyphicon-remove',
                　　　　　　　　validating: 'glyphicon glyphicon-refresh'
            　　　　　　　　   },
            fields: {
                //验证的内容
                username: {
                //配置 校验规则 校验规则可以设置多个
                    validators: {
                        //非空校验
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        //校验长度
                        stringLength: {
                            min: 2,
                            max: 10,
                            message: '用户名长度必须在2到10位之间'
                        },
                        //校验格式 不能是中文
                        regexp: {
                            regexp: /^[a-zA-Z0-9_]+$/,
                            message: '用户名只能包含大写、小写、数字和下划线'
                        },
                        //自定义规则
                        callback:{
                            message:'用户名不存在'
                        }
                    }
                },
                password: {
                    validators: {
                        //非空
                        notEmpty: {
                            message: '密码不能为空'
                        },
                         //校验长度
                         stringLength: {
                            min: 6,
                            max: 15,
                            message: '密码长度必须在6到15位之间'
                        },
                        //自定义规则
                        callback:{
                            message:'密码错误'
                        }
                    }
                }
            },
            
        })
        .on('success.form.bv',function(e){
            var $this = $(this);


            //阻止默认事件
            e.preventDefault();
            console.log($this.serialize());


            //请求数据
            $.ajax({
                url:'/employee/employeeLogin',
                type:'post',
                data: $this.serialize(),
                dataType:'json',
                success: function(data){
                    console.log(data);
                    if( data.error == 1000 ){
                        //用户不存在
                        console.log(data.message);

                        //参数1 ：要设置元素的name名 2.修改成什么状态（小图标） 3. 定义的规则名
                        $this.data('bootstrapValidator').updateStatus('username','INVALID','callback')


                    }else if(data.error == 1001  ){
                        //密码错误
                        console.log(data.message);
                        $this.data('bootstrapValidator').updateStatus('password','INVALID','callback')

                    }else if(data.success){
                        //正确 跳转到首页
                        location.href = 'index.html'
                        // console.log($this.serialize());
                        
                    }
                    
                }
            })
        })

        //点击重置
        $('.btn-chongzhi').on('click', function(){
            $('#myLogin').data('bootstrapValidator').resetForm();
        })
})