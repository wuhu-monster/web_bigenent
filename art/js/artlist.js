$(function(){
   let layer = layui.layer
let q ={
  pagenum:1,
  pagesize :2,
  cate_id:'',
  state:'',
}

// 美化时间
template.defaults.imports.dataFormat =function(data){
let date = new Date(data);
let y = date.getFullYear()
let m = (String(date.getMonth()+1)).padStart(2,'0')

let d = (String(date.getDate())).padStart(2,'0')

let h = (String(date.getHours())).padStart(2,'0')

let mm = (String(date.getMinutes())).padStart(2,'0')

let ss = (String(date.getSeconds())).padStart(2,'0')

return y + '/'+m+'/'+d+' — '+h+':'+mm+':'+ss
}
initTable()
function initTable(){
  $.ajax({
    type:'GET',
    url:'/my/article/list',
    data:q,
    success:function(res){
      if(res.status !==0){
        return layer.msg('获取失败')
      }
      res.data = [
        {id:1,title:'title',cate_name:'美食',pub_date:'2021-1-16 20:9:3.817',state:'草稿'},
        {id:2,title:'title',cate_name:'美食',pub_date:'2021-1-16 20:8:8.817',state:'草稿'},
        {id:3,title:'title',cate_name:'美食',pub_date:'2021-1-16 20:4:3.817',state:'草稿'},
        {id:4,title:'title',cate_name:'美食',pub_date:'2021-1-16 20:8:3.817',state:'草稿'}
    ]

      let htmlstr = template('artlist',res)
      $('tbody').html(htmlstr)
      layer.msg('获取完成')
    }
  })
 

}

})