$(function () {

  $('#link-zhuce').on('click', function () {
    $('.login-denglu').hide();
    $('.login_zhuce').show()
  })
  $('#link-login').on('click', function () {
    $('.login-denglu').show()
    $('.login_zhuce').hide();
  })


  // 表单效验规则
let form = layui.form
form.verify({
  pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  // 校验两次密码是否一致的规则
  repwd: function(value) {
    // 通过形参拿到的是确认密码框中的内容
    var pwd = $('#pwd').val() //拿到密码框的value
    if (pwd !== value) { //判断是否一致（不一致return 一个消息）
      return '两次密码不一致！'
    }
  }
})
// 利用ajax实现注册
let layer = layui.layer
$('#zhuceform').on('submit',function(e){
  e.preventDefault()
  $.post('/api/reguser',{
    username:$('#zhuceform [name =username]').val(),
    password:$('#zhuceform [name =password]').val()

  },function(res){
    if(res.status!==0){
      return layer.msg(res.message);
    }
    layer.msg('注册成功！请登录')
    $('#link-login').click();
  })
 
})

$('#dengluform').on('submit',function(e){
  e.preventDefault()
  $.ajax({
    url:'/api/login',
    type:'POST',
    data:$(this).serialize(),
    success:function(res){
      if(res.status !==0){
        layer.msg(res.message);
      }
      console.log(res);
      layer.msg('登陆成功');
      localStorage.setItem('token',res.token)
      location.href ='index.html'
    }
    


  })
})
})
