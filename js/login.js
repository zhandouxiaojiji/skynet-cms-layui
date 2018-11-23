layui.use(['form', 'jquery', 'skynet'], function(){
  	var $ = layui.jquery
  	var form = layui.form;
  	//监听提交
  	form.on('submit(login)', function(data){
    	layer.msg(JSON.stringify(data.field));
		layui.skynet.hello();
    	return false;
  	});
	
  	$('#helpBtn').click(function(){
  		window.location.href = "http://github.com/zhandouxiaojiji/SkynetConsole"
  	});
});