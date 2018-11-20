layui.use(['layer', 'form'], function(){
  var layer = layui.layer
  ,form = layui.form;
  
  layer.msg('Hello World');
});
alert(layui.sessionData('test').a);
layui.sessionData('test', {key:'a', value:111});
alert(layui.sessionData('test').a);
window.location.href = "login.html"
