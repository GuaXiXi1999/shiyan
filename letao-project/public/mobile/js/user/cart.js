$(function () {
    /*
    * 1.初始化页面， 自动刷新
    * 2. 点击刷新按钮 重新刷新
    * 3. 侧滑是 点击删除 弹出确认框
    * 4. 侧滑时 ， 点击编辑 。弹出确认框
    * 5. 点击复选框计算总金额
    *
    * */
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                // style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                // color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                // height:'50px',//可选,默认50px.下拉刷新控件的高度,
                // range:'100px'/, //可选 默认100px,控件可下拉拖拽的范围
                // offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback :function () {
                    var that = this;
                    console.log(321321);
                    setTimeout(function () {
                        loginAjax({
                            url: "/cart/queryCart",
                            type: 'get',
                            dataType: 'json',
                            success: function (data) {
                                //这里 data 是数组
                                console.log(data);
                                //模板语法 数据必须传对象
                                $('.cart_box').html(template('spLi', {data: data}))

                            }
                        })


                        //释放
                        that.endPulldownToRefresh()
                    },500)
                }
            }
        }
    });

    //点击刷新 重新加载
    $('.shuaxin').on('tap',function () {
        mui('#refreshContainer').pullRefresh().pulldownLoading()
        // return false

    })

    //点击删除 时 弹框
    // 委托
    $('.cart_box').on('tap', '.delete' , function () {
        var that2 = $(this)
        var nowLi = $(this).parent().parent()[0]

        //点击弹对话框
        mui.confirm('你确定要删除吗？', '温馨提示', ['是', '否'], function(e) {
            if (e.index == 0) {
                // info.innerText = '添加成功'
                // location.href = "/mobile/user/cart.html"
                console.log('删除');
                //点击 是 删除 并同步删除 dom节点
                //拿到 当前 li 的id 渲染是 已经绑定id
                var spId = that2.attr('data-id');
                // console.log(spId);

                //删除数据库中 对应id的数据
                loginAjax({
                    url: "/cart/deleteCart",
                    type: 'get',
                    data: {
                        id: spId
                    },
                    dataType: 'json',
                    success: function (data) {

                    }
                })
                //删除 调用 求和方法


                //删除对应到的节点
                that2.parents('.spLi').remove()
                Summation()


            } else {
                //点击否  取消侧滑状态
//点击否 关闭 滑块
                mui.swipeoutClose(nowLi)
            }
        })
    })

    //点击编辑 是 弹框 框中有选项

    $('.cart_box').on('tap' , '.edit', function () {

        // console.log(this.dataset.size);

        var itemObj = this.dataset;
        console.log(itemObj);
        var sizeHtml = template('sizeHtml' ,itemObj);

        //找到 对应的li
        var nowLi = $(this).parent().parent()[0]
        console.log(nowLi);

        mui.confirm(sizeHtml.replace(/\n/g,''), '编辑商品', ['是', '否'], function(e) {
            if (e.index == 0) {
                // info.innerText = '添加成功'
                // location.href = "/mobile/user/cart.html"

                //
                // 获取 编辑框内的 size 和num
                var size = $(".sizeBtn.now").text();
                var num = $("input.num").val();
                console.log(num);
                console.log(size);

                //点击 是  请求 数据
                loginAjax({
                    url:"/cart/updateCart",
                    type: 'post',
                    data:{
                        id: itemObj.id,
                        size : size,
                        num : num
                    },
                    success:function (data) {
                        console.log(data);
                    }
                })

                //改 dom 结构中的数据

                $(nowLi).find('.spNum>span').text(num)
                $(nowLi).find('.size>span').text(size)
                //编辑完成 调用 求和方法

                Summation()

                mui.swipeoutClose(nowLi)


            } else {
                //点击否 关闭 滑块
                mui.swipeoutClose(nowLi)

            }
        })
    })

    //点击尺码 高亮显示
    // var size
    $("body").on('tap','.sizeBtn',function () {
        // console.log(321);
        $(this).addClass("now").siblings().removeClass("now")
        // size =  $(this).html()
        // console.log(size);


    })

    //点击 加减
    // var num;  //记录 商品的数量

    $("body").on('tap','.jian',function () {
        if( $('.num').val() <= 0 ){
            mui.toast('再减就没啦！')
            return
        }
        $('.num').val(parseInt($('.num').val())-1)
        // num = parseInt($('.num').val())
        // console.log(num);

    })

    $("body").on('tap','.jia',function () {
        var maxnum = parseInt($(this).parent().children().children('.shuliang').text())

        console.log(maxnum);
        if( $('.num').val() >= maxnum ){
            mui.toast('不能再多了！')
            return
        }
        $('.num').val(parseInt($('.num').val())+1)


    })


    //点击复选框 计算总价
//点击每一个复选框  调用 求和方法
    $('body').on('click','.fuxuan',function () {
        Summation()
    })
    // $('body').on('change','[input:checked]',function () {
    //     Summation()
    // })

    Summation()


})
//封装 计算总和 方法
//需求 ： 拿到所有选中复选框对应li 中物品的价钱的和
var Summation = function () {
    //拿到所有的复选框

    var arr = $('.fuxuan:checked')

    var mySum = 0
    $.each(arr,function (index, value) {

        //单价
        var p = $(value).next().children('.spPN').children('.Price').children('span').html()
        //数量
        var n = $(value).next().children('.spPN').children('.spNum').children('span').html()
        mySum += (p*n)
    })
    //保留两位小数
    $('.sumText').html(mySum.toFixed(2))
    console.log(mySum.toFixed(2));
    console.log(arr);

}