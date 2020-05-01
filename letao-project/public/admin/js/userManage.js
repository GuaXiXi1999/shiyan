$(function(){
    window.page = 1;
    var init = function(){
        getData(function(data){
        
            $('.listTbody').html(template('list', data))
    
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
        })
    }

    init()

    //点击 按钮切换状态
    $('.listTbody').on('click','.myBtn', function(){
        var id = $(this).parent().attr('data-id')
        var isDelete
        if( $(this).html == "禁用" ){
            isDelete = 0
        }else{
            isDelete = 1
        }

        $.ajax({
            url:"/user/updateUser",
            type:'post',
            data:{
                id:id,
                isDelete: isDelete
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                if(data.success){
                    
                }
                init()
            }

        })
         
    })
    
});

//查询用户信息 封装
var getData = function(callback){

    $.ajax({
        url:'/user/queryUser',
        type:'get',
        data:{
            page: window.page,
            pageSize:4
        },
        dataType:'json',
        success:function(data){
            console.log(data);
            
            
        
            callback && callback(data)
            
        }

    })
}