$(function(){
    window.page = 1;

    var init = function(){
        getSecondData(function(data){
            //渲染表格
            $('.listTbody').html(template('list',data));
               //渲染分页按钮
            $('.myPage').bootstrapPaginator({
                bootstrapMajorVersion:'3',
                // alignment:'right',
                currentPage: window.page,
                // 页码按钮的数量
                numberOfPages: Math.ceil(data.total / data.size),
                //一共多少页 = 总条数 % 每一页显示的数量 再+1
                totalPages:  Math.ceil(data.total / data.size),
                //显示文字
                itemTexts:function(type, page, current){
                switch (type) {
                        case 'next':
                        return '下一页'
                        break;
                        case 'last':
                        return '尾页'
                        break;
                        case 'prev':
                        return '上一页'
                        break;
                        case 'first':
                            return '首页'
                            break;
                        case 'page':
                            return page
                            break;          
                }
            
                },
                tooltipTitles:function(type, page, current){
                    switch (type) {
                        case 'next':
                        return '下一页'
                        break;
                        case 'last':
                        return '尾页'
                        break;
                        case 'prev':
                        return '上一页'
                        break;
                        case 'first':
                            return '首页'
                            break;
                        case 'page':
                            return page
                            break;          
                }
                },
                //监听页码改变事件
                onPageChanged:function(event, oldPage, newPage){
                    window.page = newPage
                    init()
                }
            
            
            
            });
            // 渲染模态框中 下拉列表 一级菜单
            getFirstData(function(data){
                //点击li标签 更换内容
                $('.firstC').html(template('firstList', data)).find('li').on('click',function(){
                    $('.xialaTxt').html( $(this).html())
                    var liId = $(this).attr('data-id')
                    $('.hideInp').val(liId)

                    //点击时也要更新表单校验的状态 改为合法的 状态
                    $('#addSecond').data('bootstrapValidator').updateStatus("categoryId",'VALID')
                
                })
            })
        })
    }

    //页面刷新 初始化
    init();

        // 5. 表单校验 : 默认不校验隐藏域, 不校验禁用的input控件等等
        $('#addSecond').bootstrapValidator({
            //重置校验隐藏域
            excluded: [],
            //图标
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            //配置需要校验的表单元素
            fields: {
                //校验 一级分类框

                categoryId: {
                    validators: {
                        notEmpty: {
                            message: '一级分类不能为空'
                        }
    
                    }
                },
                //校验 二级分类框
                brandName: {
                    validators: {
                        notEmpty: {
                            message: '二级分类不能为空'
                        }
    
                    }
                },
                //校验 图片非空
                brandLogo: {
                    validators: {
                        notEmpty: {
                            message: '请选择LOGO图片'
                        }
    
                    }
                },
               
        
    
            },
            //触发submit按钮
        }).on('success.form.bv', function (e) {
            //阻止默认事件
            e.preventDefault();
            var $form = $(this);
            //请求数据
            
            console.log($form.serialize());

            $.ajax({
                url:'/category/addSecondCategory',
                type:'post',
                data:$form.serialize(),
                dataType:'json',
                success: function(data){
                    console.log(data);
                    if(data.success){
                        //隐藏模态框
                        $('#addModal').modal('hide')
                        //重置 页数 及渲染
                        window.page = 1;
                        init();
                        

                    }
                    
                }

            })
            
            
    
        })
    




    //点击上传 图片
    //初始化上传插件
    //通过file控件调用fileupload
     $('#uploadImg').fileupload({
         //上传地址
             url:'/category/addSecondCategoryPic',
         //返回格式
            dataType: 'json',
           //e：事件对象
       //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
             done: function (e, data) {
                //  $('#uploadImg').attr('src',data.result.picAddr);
                console.log(data.result.picAddr);
                $('.disImg').attr('src',data.result.picAddr)
                //图片上传成功 隐藏框赋值
                $('.hideImg').val(data.result.picAddr)
                 //换了图片时也要更新表单校验的状态 改为合法的 brandLogo
                 $('#addSecond').data('bootstrapValidator').updateStatus("brandLogo",'VALID')
             }
         });



         $('#addModal').on('hidden.bs.modal', function(){
            console.log(321);
             //重置 form表单
            $('#addSecond').data('bootstrapValidator').resetForm();
            //清空value框
            $('[name = "brandName"]').val('')
        
            
        })
})

//加载函数之外封装
//封装 渲染表格数据方法
var getSecondData = function(callback){
    $.ajax({
        url:'/category/querySecondCategoryPaging',
        type:'get',
        data:{
            page:window.page|| 1,
            pageSize:3
        },
        dataType:'json',
        success: function(data){
            console.log(data);
            callback && callback(data)
           
            
        }
    })
   

}

//封装  请求一级分类数据
var getFirstData = function(callback){

    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page:1,
            pageSize: 999
        },
        dataType:'json',
        success:function(data){
            console.log(data);
            callback && callback(data)
        }
    })
}