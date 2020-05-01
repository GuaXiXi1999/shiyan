//搜索中心 —————— 本地缓存
//先取数据  如果没有localStorage 中没有数据 则使其为空数组
$(function () {
    var dataHtml = ''
    var list = localStorage.getItem("list") || '[]';
//为了方便操作 转为json格式的数组
    list = JSON.parse(list)
//2. 拿到 搜索框中的value 值 并存入localStorage
    $("#searchBtn").on('tap',function () {
        //点击搜索按钮是 追加到 list数组里面
        // console.log($("#searchK").val());
        var key = $("#searchK").val()
        guolv(key, list)
        console.log(list);// [1,2,3,4]

        //重新存数组
        localStorage.setItem("list",JSON.stringify(list));
        init(dataHtml,list)
        //跳转 并传值 用 ?key= 拿到的value值 拼接
        location.href = "searchList.html?key="+key
        //清空value值
        $("#searchK").val('')
    })


    // 页面记载完毕 初始化历史记录
    init(dataHtml,list)

    //点击删除 委托事件
    $(".lg_search_jilu_box").on('tap','span',function () {
        list.splice($(this).attr("data-ind"),1);
        //重新存数组
        localStorage.setItem("list",JSON.stringify(list));
        init(dataHtml,list)

    })
//删除全部
    $(".lg_search_deleteAll_box .right").on('tap',function () {
        // list 重新赋值 为json格式空数组
        list = JSON.parse("[]")
        localStorage.setItem("list",JSON.stringify(list));

        init(dataHtml,list)


    })



    //点击 对应li  跳转
    $(".lg_search_jilu_box").on('tap','.lg_search_jilu_box>li',function () {
        var txtId = $(this).children('span').text()
        console.log(txtId);
        location.href = "searchList.html?key="+txtId

    })

})
//封装 渲染历史记录列表
var init = function (dataHtml ,list) {

//渲染 temp 方法返回的是html格式的字符串 传的参数 是 模板id 和 对象形式的数据
    $(".lg_search_jilu_box").html(template("searchMoban",{ mylist: list }))

// 删除搜索全部  模板
    $(".lg_search_deleteAll_box").html(template("searchMoban2",{ mylist: list }))

    console.log({ mylist: list })
}

//封装过滤 函数 参数 ： 拿到的搜索框value值
var guolv = function (data,list) {
    // console.log(list.indexOf(data, 0));
    //需求 1.非空校验 2. 超过10条 删除最早的一条 3. 有相同的话 删除相同的 新的追加 UNshift
    //如果拿到的value值是空 的 则为false
    if(data){
        var asd = list.indexOf(data, 0)
        // console.log('ok');
        //长度超过了10 则 删除 最早的一个 ，然后在追加 unshift
        if( list.length >= 10 ){

            if(asd === -1  ){
                list.splice(9,1)
                list.unshift(data)
            }else if( asd === 0 ){

            }else{
                //重复了 删除之前的 添加新的
                list.splice(asd,1)
                list.unshift(data)
            }
            // console.log('大于10');
            //如果有相同的 删除原来的， 然后追加 unshift
        }else{
            if(asd === -1  ){
                list.splice(9,1)
                list.unshift(data)
            }else if( asd === 0 ){

            }else{
                //重复了 删除之前的 添加新的
                list.splice(asd,1)
                list.unshift(data)
            }
        }

    }else{
        //mui提示框
        mui.toast("请输入")
        return
    }

}

