$(function () {
    //加载此页面时 判断是否拼接了 id拼接了 则 视为 修改 
    // 没有拼接则视为添加 
    //判断 地址栏后面是否拼接了值 ：id 如果有 则 获取对应id 的数据 渲染在对应的input中 并改变h3标签内容 为’修改收货地址‘

    //拿到 拼接在地址栏后面的值 
    var addressId = getParams().id

    if(addressId){
        //如果有 拿到 id 请求数据 将数据渲染在对应的input中  h3 标签的文字 更改
        $('.title').html('修改收货地址')
        loginAjax({
            url:'/address/queryAddress',
            type:'get',
            dataType:'json',
            success:function(data){
                console.log(data);
                //遍历数组 查找 对应的id 的元素7
                var arr = data.filter(function(item, i){
                    //如果 查找的元素中的id值 等于 地址栏后面拼接的值的话 就返回
            
                    return item.id ==addressId
                     
                })
                console.log(arr);
                $('.consignee').val(arr[0].recipients)
                $('.zipCode').val(arr[0].postCode)
                $('.address').val(arr[0].address)
                $('.detAdd').val(arr[0].addressDetail)
            }
        })
    }
    

    //点击 确认 时 非空校验  如果数据都通过了 则进行判断 后续应该进行 修改 还是新增操作
    $('.modifyBtn').on('tap' , function () {

        //点击 非空校验
        var consignee = $.trim($('.consignee').val())
        var zipCode = $.trim($('.zipCode').val())
        var address = $.trim($('.address').val())
        var detAdd = $.trim($('.detAdd').val())

        //非空校验
        if(!consignee) return mui.toast('请填写收货人')
        if(!zipCode) return mui.toast('请填写邮政编码')
        if(!address) return mui.toast('请填写收货地址')
        if(!detAdd) return mui.toast('请填写详细地址')

        //判断 地址栏后面是否拼接了 id
        if(addressId){
            console.log('有拼接');
            //有 则请求修改 地址
            loginAjax({
                url:'/address/updateAddress',
                type:'post',
                data:{
                    id: addressId,
                    address:address,
                    addressDetail:detAdd,
                    recipients :consignee,
                    postcode: zipCode
                },
                success: function(data){
                    // console.log(data);
                    //修改成功 跳转
                    if(data.success){
                        location.href = 'address.html'
                    }
                    
                }
            })
        }else{
            //如果没有拼接id  就是添加 调用 添加收货地址 接口
            console.log('没有拼接');
            //此接口 需要登录 所以 这里 调用 loginAjax
            loginAjax({
                url:'/address/addAddress',
                type:'post',
                data:{
                    address  :address,
                    addressDetail  :detAdd,
                    recipients :consignee,
                    postcode: zipCode
                    
                },
                success:function(data){
                    // console.log(data);
                    // console.log('添加成功');
                    //添加成功 跳转

                    if(data.success){
                        location.href = 'address.html'
                    }
                }
            })

        }



        

    })




    //---------------------------------------------------------

    //点击 地址框 弹三级联动框
    //初始化poppicker 组件
    var cityPop = new mui.PopPicker({

        //显示的列数
        layer:3,
        //按钮
        buttons: ['取消', '确认']
    })
    //设置数据
    cityPop.setData(cityData)

    //点击 地址栏 显示  聚焦显示
    //这里使用 focus 会出现 重复点击地址栏时  弹窗不会出现
    $('.address').on('tap',function(){
        cityPop.show(function(items){
            console.log(items);

            //点击确认之后将 items中的值 带到 地址框中
            //因为 有向北京这种 直辖市的原因 这里需要判断一下 避免出现 '北京市 北京市 东城区'这种现象

            //如果第一个 与第二个相等 则第二个赋值为空
            if( items[0].text==items[1].text ){
                items[1].text = '';
            }
            $('.address').val(items[0].text+' '+items[1].text+' '+items[2].text)



        })
    })




})