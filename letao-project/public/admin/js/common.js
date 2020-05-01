//公共的js

//当ajax开始请求 时
$(window).ajaxStart(function(){
    NProgress.start();
})

//当ajax结束请求 时
$(window).ajaxComplete(function(){
    NProgress.done();
})

//禁用 进度环
NProgress.configure({
    showSpinner:false
})


//退出登录 模态框 
var outModalHtml = '<div class="modal fade" id="outModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
'    <div class="modal-dialog modal-sm" role="document">'+
'      <div class="modal-content">'+
'        <div class="modal-header">'+
'          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'          <h4 class="modal-title" id="myModalLabel">温馨提示</h4>'+
'        </div>'+
'        <div class="modal-body">'+
'          <p class="text-danger"> <span class="glyphicon glyphicon-exclamation-sign  "></span>    你确定要退出后台管理系统吗？</p>'+
'        </div>'+
'        <div class="modal-footer">'+
'          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
'          <button  type="button" class="btn btn-primary out">退出</button>'+
'        </div>'+
'      </div>'+
'    </div>'+
'  </div>';

$('body').append(outModalHtml)

//点击 退出按钮 弹出模态框
$('.outBtn').on('click',function(){
    $('#outModal').modal({
        keyboard: false
      })
})
//点击确认 退出
$('.out').on('click',function(){
    $.ajax({
        url:'/employee/employeeLogout',
        type:'get',
        dataType:'json',
        success: function(data){
            console.log(data);
            if( data.success ){
                location.href = 'login.html'
            }
            
        }
    })
})