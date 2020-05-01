$( function () {
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条

        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });




    //点击拖霸
    $('.lg_tab > a').click(function () {
        $(this).addClass("mui-active").siblings().removeClass("mui-active")
        location.href = $(this).attr("href")
    })




})

//这里需要放在 加载函数 之外 否则 会变成局部变量 外部会获取不到
//获取关键字
var getParams = function () {
    var obj = {};
    //这里 拿到拼接到问好后面的关键字 如果是 汉字 会被编码 这里 可以使用 decodeURI()
    var search = decodeURI(location.search) // decodeURI()  解码
    // console.log(search);
    //判断 是否 有search
    if( search ){
        //如果有  则 去掉 ？
        search = search.replace("?", "") //去 问号 key = "三星"
        //分割字符串 得到的是数组
        var searchArr = search.split("&") // ["key=三星"]

        searchArr.forEach(function (item, i) {
            var itemArr = item.split("=")
            // console.log(itemArr);
            obj[itemArr[0]] = itemArr[1];
            console.log(obj);
        })
    }
    return obj
}


//封装 请求登录 参数 obj 是 对象

var loginAjax = function (obj) {
    $.ajax({
        url:obj.url,
        type: obj.type,

        data: obj.data || '',
        dataType: 'json',
        success:function (data) {
            // console.log(data);
            //未登录 跳转到登录页
            if( data.error === 400 ){
                //跳转到登录页 并且将 本页的地址 拼接在地址栏后面
                // console.log(data);
                location.href = "/mobile/user/login.html"+"?returnUrl="+location.href
                return false
            }
            // //已登录状态 获取信息
            obj.success(data)
            console.log('我已经登录');

        },
        error:function () {
            mui.toast('服务器繁忙')
        }
    })
}
