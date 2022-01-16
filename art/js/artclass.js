$(function () {
  let layer = layui.layer
  let form = layui.form
  getartdata()
  function getartdata() {
    $.ajax({
      url: '/my/article/cates',
      type: 'GET',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取失败')
        }
        // console.log(res);
        let htmlstr = template('templateclass', res)
        $('tbody').html(htmlstr)
      }
    })
  }
  let indexadd = null
  $('#btnadd').on('click', function () {
    indexadd = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '添加文字分类'
      , content: $('#content-add').html()

    });
  })
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data:
        $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          layer.msg('添加失败')
        }
        getartdata()
        layer.msg('添加成功')
        layer.close(indexadd)
      }
    })
  })
  // 编辑
  $('tbody').on('click', '#classedit', function (e) {
    e.preventDefault()
    indexadd = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '添加文字分类',
      content: $('#content-edit').html()

    });
    let id = $(this).attr('data-id')
    $.ajax({
      url: "/my/article/cates/" + id,
      type: 'GET',
      success: function (res) {
        form.val('form-edit', res.data) //快速填充数据
      }
    })
    // 点击修改数据
    $('body').on('submit', '#form-edit', function (e) {
      e.preventDefault()
      $.ajax({
        type: 'POST',
        url: '/my/article/updatecate',
        data:
          $(this).serialize(),
        success: function (res) {
          if (res.status !== 0) {
            layer.msg('修改失败')
          }
          getartdata()
          layer.msg('修改成功')
          layer.close(indexadd)
        }
      })
    })


  })
// 删除按钮
$('tbody').on('click','#classdele',function(){
  let id = $(this).attr('data-id')
  layer.confirm('确定删除吗？', {icon: 3, title:'提示'}, function(index){
   $.ajax({
     type:'GET',
     url:'/my/article/deletecate/'+id,
     success :function(res){
       if(res.status !==0){
         return layer.msg('删除失败')
       }
       getartdata()
       layer.msg('删除成功')
     }
   })
    
    layer.close(index);
  });
})



})   