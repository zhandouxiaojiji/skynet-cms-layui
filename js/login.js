layui.use(['form', 'skynet', 'session'], function(){
  	var $ = layui.jquery;
  	var session = layui.session;
  	var form = layui.form;
  	//监听提交
  	form.on('submit(login)', function(data){
    	layer.msg(JSON.stringify(data.field));
    	layui.session.setLastServerName(data.field.server);
	    session.login(data.field.account, data.field.password);
    	return false;
  	});


	$('#serverSelect').empty();
	for (i in window.serverlist){
		let server = window.serverlist[i];
		$('#serverSelect').append("<option value="+server.name+">"+server.desc+"</option>");
	}
	var last = session.getLastServerName();
	if(last){
		$('#serverSelect').val(last);
	}
	form.render();
	
  	$('#helpBtn').click(function(){
  		window.location.href = "http://github.com/zhandouxiaojiji/SkynetConsole"
  	});
});