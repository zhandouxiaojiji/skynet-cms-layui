layui.use(['form', 'jquery', 'skynet', 'session'], function(){
  	var $ = layui.jquery
  	var form = layui.form;
  	//监听提交
  	form.on('submit(login)', function(data){
    	layer.msg(JSON.stringify(data.field));
    	layui.session.setLastServer(data.field.server);
    	alert(data.field.server);
    	return false;
  	});


	$('#serverSelect').empty();
	for (i in window.serverlist){
		let server = window.serverlist[i];
		$('#serverSelect').append("<option value="+server.name+">"+server.desc+"</option>");
	}
	var last = layui.session.getLastServer();
	if(last){
		$('#serverSelect').val(last);
	}
	form.render();
	
  	$('#helpBtn').click(function(){
  		window.location.href = "http://github.com/zhandouxiaojiji/SkynetConsole"
  	});
});