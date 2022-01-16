$(function () {
  let form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '输入的长度为1-6位'
      }
    }

  })
  getdata1 ()
  function getdata1 (){
    $.ajax({
      type:'GET',
      url:'/my/userinfo',
      success:function(res){
        if(res.status !==0){
        
          console.log(111);
          
        }
        //快速向表单输入数据
        form.val('formuserinfo', res.data)//formuserinfo定义的表单的一个属性办法
        // console.log(res)
        
      }
     

     
    })
  }
  $('#resct').on('click',function(e){
    e.preventDefault()
    getdata1 ()
  })

  $('.layui-form').on('submit',function(e){
    e.preventDefault()
$.ajax({
  url:'/my/userinfo',
  type:'POST',
  data:$(this).serialize(),
  success:function(res){
    if(res.status !==0){
      return layui.layer.msg('修改失败')
    }
// console.log(res);
window.parent.getdata();

  }
})
  })
})