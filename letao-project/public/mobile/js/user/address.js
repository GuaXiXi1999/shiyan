$(function () {
    getAddressData()


 



    //删除 地址信息
    $('.myAddressBox').on('tap','.myDelete', function () {
        var $this = $(this)
        var nowId = $this.parent().parent().attr('data-id')
        // console.log $this.parent().parent().attr('data-id'));
        $.ajax({
            url:"/address/deleteAddress",
            type: 'post',
            data:{
                id:nowId
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if(!data.success) return mui.toast('服务器繁忙')

                // 后台数据 重新 渲染
                getAddressData()

                
            }
            
        })
    })

    //点击 添加 去 添加地址页面
    $('.addTo').on('tap',function () {
        location.href = './addAddress.html'
    })

})

var getAddressData = function(){
    //封装 因为 删除 要判断data 是否有长度 如果没有 则需要提示用户 ‘暂无数据’
    //渲染 地址信息数据
    loginAjax({
        url:'/address/queryAddress',
        type:'get',
        dataType:'json',
        success:function (data) {
            console.log(data);

            $('.myAddressBox').html(template('myAddress',{myData: data}))

        }

    })
    }
