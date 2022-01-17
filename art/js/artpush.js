$(function () {
  let layer = layui.layer
  let form = layui.form
  initEditor()//初始化富文本

  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)
  getartclass()
  function getartclass() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取失败')
        }
        let htmlstr = template('pushclass', res)
        $('#puclass').html(htmlstr)
        form.render();
      }
    })
  }

  $('#btnupimg').on('click', function () {
    $('#upfile').click();
  })
  $('#upfile').on('change', function (e) { //1.给一个表单添加一个change事件
    let filelist = e.target.files  //2.拿到提交的文件
    if (filelist.length === 0) {  //3.判断用户是不是没有提交
      return 
    }
    let file = filelist[0]  //4.拿到第一个图片
    var newImgURL = URL.createObjectURL(file)  //5.把那个图片转成路径
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域

  })
  let artstate = '已发布'
  $('#caogao').on('click', function () {
    artstate = '草稿'
  })
  $('#pushfile').on('submit', function (e) {
    e.preventDefault()
    let fd = new FormData($(this)[0])
    fd.append('state', artstate)
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append('cover_img', blob)
        pushdata(fd)
      })
  
  })

  function pushdata(fd) {
    $.ajax({
      type: 'POST',
      url: '/my/article/add',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('发布文章失败！')
        }
        layer.msg('发布文章成功！')
        console.log(111);
        
        location.href = '/art/artlist.html'
        console.log(res);
        
      }

    })
  }

})