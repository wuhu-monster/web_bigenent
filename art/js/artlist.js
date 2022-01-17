$(function () {
  let layer = layui.layer
  let form = layui.form
  let laypage = layui.laypage;
  let q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: '',
  }

  // 美化时间
  template.defaults.imports.dataFormat = function (data) {
    let date = new Date(data);
    let y = date.getFullYear()
    let m = (String(date.getMonth() + 1)).padStart(2, '0')

    let d = (String(date.getDate())).padStart(2, '0')

    let h = (String(date.getHours())).padStart(2, '0')

    let mm = (String(date.getMinutes())).padStart(2, '0')

    let ss = (String(date.getSeconds())).padStart(2, '0')

    return y + '/' + m + '/' + d + ' — ' + h + ':' + mm + ':' + ss
  }
  initTable()
  function initTable() {
    $.ajax({
      type: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取失败')
        }
        // res.data = [
        //   { id: 1, title: 'title', cate_name: '美食', pub_date: '2021-1-16 20:9:3.817', state: '草稿' },
        //   { id: 2, title: 'title', cate_name: '美食', pub_date: '2021-1-16 20:8:8.817', state: '草稿' },
        //   { id: 3, title: 'title', cate_name: '美食', pub_date: '2021-1-16 20:4:3.817', state: '草稿' },
        //   { id: 4, title: 'title', cate_name: '美食', pub_date: '2021-1-16 20:8:3.817', state: '草稿' }
        // ]

        let htmlstr = template('artlist', res)
        $('tbody').html(htmlstr)
        // layer.msg('Table获取完成')
        // console.log(res.data);
        page(res.total)
      }
    })
  }

  artlist_class()
  function artlist_class() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取失败')
        }
        let htmlstr = template('artlist_class', res)
        // console.log(htmlstr);

        $('#listclass').html(htmlstr)
        form.render();
      }
    })
  }
//提交事件
$('#formbake').on('submit',function(e){
  e.preventDefault()
  let cate_id = $('[name =cate_id]').val()
  let state =$('[name =state]').val()
  q.cate_id = cate_id
  q.state = state 
  initTable()
  // console.log(11);
  
})

//分页
function page(total){
  laypage.render({
    elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
    count: total, //数据总数，从服务端得到
    limit:q.pagesize,
    curr:q.pagenum,
    layout:['count','limit','prev', 'page', 'next','skip'],
    // limit:[2,3,5,8,10],
    limits: [2, 3, 5, 10],
    jump :function(obj,first)
    {
      q.pagenum = obj.curr;
      q.pagesize = obj.limit;
      if(!first){
        initTable()
      }
   
    }
  });

}

$('tbody').on('click','#dellist1',function(){
  let len = $('.btn-delete').length
  let id = $(this).attr('data-index')
  layer.confirm('确定要删除吗？', {icon: 3, title:'提示'}, function(index){
    $.ajax({
      type:'GET',
      // url:'/my/article/delete'+id,
      url: '/my/article/delete/' + id,
      success:function(res){
      if(res.status!==0){
       return layer.msg('数据删除失败')
      }
      layer.msg('数据删除成功')
      if(len ===1){
        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
      }
      // layer.msg('数据删除成功')
      initTable()
      }
      
        })
    
    layer.close(index);
  });


})

})