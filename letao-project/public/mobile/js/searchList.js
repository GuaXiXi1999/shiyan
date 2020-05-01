$(function () {
    /*
    * 1.页面初始化时 关键字在输入框之内
    * 2. 页面初始化完成之后，根据关键字渲染第一页的数据4条
    * 3. 点击搜索根据关键字重新渲染
    * 4. 点击排序 根据排序的选项，重新进行排序 ， 选中时 默认是升序， 在点击同一个 是降序
    * 5. 用户下拉是 要刷新， 根据当时的条件重置排序功能
    * 6. 当用户上拉的时候 加载下一页 ， 没有数据要友好的提醒用户
    *
    *
    * */

    window.page = 0;
// * 1.页面初始化时 关键字在输入框之内
// 获取 关键字
var urlParams = getParams()

$("#searchK").val(urlParams.key)

//    * 2. 页面初始化完成之后，根据关键字渲染第一页的数据4条
//     getDaat({
//         proName:urlParams.key,
//         page:1,
//         pageSize:4
//     },function (data) {
//         $(".lg_index_goodList").html( template("goodsList", data) )
//         console.log(data);
//         // console.log(data.data[0].pic[0].picAddr);
//     })

    //3. 点击搜索根据新的关键字 重新渲染
$("#searchBtn").on('tap',function () {
    // window.page =
    var newKey = $("#searchK").val()
    //非空校验
    if(!newKey) return mui.toast("你是不是忘了些什么？")
    getDaat({
        proName:newKey,
        page:1,
        pageSize:4
    },function (data) {
        $(".lg_index_goodList").html( template("goodsList", data) )
        console.log(data);
        // console.log(data.data[0].pic[0].picAddr);
        mui("#refreshContainer").pullRefresh().pulldownLoading()

    })
    //
    // $(".screen li:first-child").addClass("now").siblings().removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down")

})

    var obj ={}
    //4.  点击排序
    $(".screen li").on('tap', function () {
        //点击 li 标签是 获取 搜索框中的值 和 当前点击里标签自定义属性 值 以及 调用数据时 需要传入的值 obj （在后续判断中 增加了 判断 点击的li）
        var newKey = $("#searchK").val()
        var type = $(this).attr('data-pn')
        obj = {
            proName:newKey,
            page:1,
            pageSize:4
        }

        //先判断 是否有 now 类
        if( $(this).hasClass('now') ){
            //如果已经是高亮显示类了 就再判断 箭头朝向
            if( $(this).children('span').hasClass('fa-angle-down') ){

                $(this).children('span').addClass('fa-angle-up')
                $(this).children('span').removeClass('fa-angle-down')
                console.log('升序');
                obj[type] = 1;
                getDaat(obj,function (data) {
                    $(".lg_index_goodList").html( template("goodsList", data) )
                    // console.log(data.data[0].pic[0].picAddr);
                })
            }else{
                $(this).children('span').addClass('fa-angle-down')
                $(this).children('span').removeClass('fa-angle-up')
                console.log('降序');
                obj[type] = 2;
                getDaat(obj,function (data) {
                    $(".lg_index_goodList").html( template("goodsList", data) )
                    // console.log(data.data[0].pic[0].picAddr);
                })
            }
        }else{
            $(this).addClass("now").siblings().removeClass("now")
            $(this).find('span').siblings().addClass('fa-angle-down').removeClass('fa-angle-up')

            //点新的  默认是降序 并且 其他的li还要 下箭头
            obj[type] = 2;
            getDaat(obj,function (data) {
                $(".lg_index_goodList").html( template("goodsList", data) )
                // console.log(data.data[0].pic[0].picAddr);
            })
        }

    })


    //5  下拉是要刷新 ，根据当前的条件 重置排序功能

    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            //下
            down : {
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function(){
                    var that = this;
                    //为了 看出刷新的感jio 这里使用定时器 500毫秒后 释放
                    setTimeout(function () {
                        //重置 排序的样式
                        // $(".screen li:first-child").addClass("now").siblings().removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down")

                        //重新渲染
                        var newKey = $("#searchK").val()
//排序的类型
                        var type = $(".screen li.now").attr("data-pn")
                        // 决定升降序的 数据
                        var value = $(".screen li.now").find("span").hasClass("fa-angle-up")? 1 : 2;

                         var obj ={
                             proName:newKey,
                             page:1,
                             pageSize:4
                        }

                        obj[type] = value;
                        //    * 2. 页面初始化完成之后，根据关键字渲染第一页的数据4条
                        getDaat(obj,function (data) {
                            $(".lg_index_goodList").html( template("goodsList", data) )
                            // console.log(data);
                            // console.log(data.data[0].pic[0].picAddr);
                        })

                        //释放
                        that.endPulldownToRefresh()
                        //重置 上拉加载
                        that.refresh(true)
                    },500)

                }
            },
            
            //上拉加载 
            up : {
                // auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :function () {
                    window.page++;
                    // console.log(window.page);
                    //获取一系列 数据
                    var newKey = $("#searchK").val()
                    //排序的类型
                    var type = $(".screen li.now").attr("data-pn")
                    // 决定升降序的 数据
                    var value = $(".screen li.now").find("span").hasClass("fa-angle-up")? 1 : 2;
                    // console.log(value);
                    if(!newKey) return mui.toast('你不是不忘了些什么？')
                    var obj = {
                        proName:newKey,
                        page:window.page,
                        pageSize:4
                    }
                    obj[type] = value;
                    var that = this
                    setTimeout(function () {
                        getDaat(obj,function (data) {
                            $(".lg_index_goodList").append( template("goodsList", data) )
                            // console.log(data.data[0].pic[0].picAddr);
                            console.log(data);
                            if( data.data.length > 0  ){
                                that.endPullupToRefresh(false);

                            }else{
                                that.endPullupToRefresh(true);

                            }
                        })

                    },500)






                    //结束上拉加载

                }
            }
        }
    });


})
//-----------------------------------------
//拿数据
var getDaat = function (obj , callback) {
    $.ajax({
        //请求
        url:"/product/queryProduct",
        //前台传过去的数据 类型：对象
        data:obj,
        //请求类型
        type: 'get',
        //要求后台返回的数据类型
        dataType:'json',
        //请求 成功 执行 参数 data 是拿到的数据
        success:function (data) {
            window.page = data.page
            callback && callback(data)
        }

    })
}

//排序 拿数据
