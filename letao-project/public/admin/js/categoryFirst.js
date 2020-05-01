$(function(){
    window.page = 1

//查询一级分类 并渲染 
var init = function(){
    getFirstData(function(data){
        $('tbody').html(template('mytable',data))
    
    //渲染分页
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
    console.log(Math.ceil(data.total / data.size))
    
    })
}

init()

//点击提交
$('#add').bootstrapValidator({
    //图标 
        　feedbackIcons: {
            　　　　　　　　valid: 'glyphicon glyphicon-ok',
            　　　　　　　　invalid: 'glyphicon glyphicon-remove',
            　　　　　　　　validating: 'glyphicon glyphicon-refresh'
        　　　　　　　　   },
        fields: {
            //验证的内容
            categoryName: {
            //配置 校验规则 校验规则可以设置多个
                validators: {
                    //非空校验
                    notEmpty: {
                        message: '一级分类名不能为空'
                    },

                    
                }
            }
        
        },
        
    })
    //触发 提交事件
    .on('success.form.bv',function(e){
        var $this = $(this);
        $('#add').data('bootstrapValidator').resetForm();


        //阻止默认事件
        e.preventDefault();

        //请求数据
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data: $this.serialize(),
            dataType:'json',
            success: function(data){
                // console.log(data);
                if(data.success){
                    window.page = 1;
                    init()
                    $('#addModal').modal('hide');
                    
                }
                
            }
        })


        
    })


    $('.btn-quxiao').on('click', function(){
        $('#add').data('bootstrapValidator').resetForm();
    })
    // $('.addBtn').on('click',function(){
    //     console.log('重置了吗？');
        

    // })

$('#addModal').on('hidden.bs.modal', function(){
    console.log(321);
    $('#add').data('bootstrapValidator').resetForm();
    $('.cInput').val('')
    
})




});

//封装  请求一级分类数据
var getFirstData = function(callback){

    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page: window.page || 1,
            pageSize:3
        },
        dataType:'json',
        success:function(data){
            console.log(data);
            callback && callback(data)
        }
    })
}