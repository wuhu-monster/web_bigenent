$(function () {
  getdata()
 
let layer = layui.layer;
$('#btnexit').on('click',function(){
  layer.confirm('确认退出吗？', {icon: 3, title:'提示'}, function(index){
    localStorage.removeItem('token')
   location.href='/login.html' //2.跳转
    layer.close(index);
  });
})
})
function getdata() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取失败')
      }
      // console.log(res);
      xuandata(res.data)
    },
    // complete : function(res){
    //   console.log('执行了回调');
    //   console.log(res);
      
    // }
  })
}
function xuandata(res){
  let name = res.nickname ||res.username
  $('.welcome').html('欢迎 &nbsp;&nbsp;'+name)
  if(res.user_pic!==null){
    $('.layui-nav-img').attr('src',res.user_pic).show();
    $('.text-img').hide();
  }else{
    $('.layui-nav-img').hide();
    let str = name[0].toUpperCase()
    $('.text-img').html(str).show();
  }
    }