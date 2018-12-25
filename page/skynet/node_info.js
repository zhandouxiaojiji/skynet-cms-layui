layui.config({
  base : "../../js/"
})
layui.use(['table', 'jquery', 'session'], function(){
	var session = layui.session;
	var table = layui.table;
	var $ = layui.jquery;

	session.call('/cms/skynet/node_info', {}, function(data){
		table.render({
			elem:'#info',
			cols:[[
				{field:'k', width:200},
				{field:'v'}
			]],
			data:data.list
		});
	})
})