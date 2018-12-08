layui.use(['layer', 'form', 'session', 'skynet'], function(){
  	var $ = layui.jquery;
  	var skynet = layui.skynet;
  	var session = layui.session;
	var layer = layui.layer;
	layer.msg('Hello World');

	session.call("/cms/view/menu", {}, function(data){
		console.log(data);
	});
});
