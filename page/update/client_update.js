layui.config({
  base : "../../js/"
})
layui.use(['table', 'jquery', 'session'], function(){
	var session = layui.session;
	var table = layui.table;
	var $ = layui.jquery;

	session.call('/cms/update/client_update', {}, function(data){
		console.log(data.list)
		table.render({
			elem:'#list',
			cols:[[
				{title:'版本号', field:'version', sort:true, width:150},
				{title:'说明', field:'desc'},
				{title:'提交版本', field:'git_version', width:100},
				{title:'当前使用', field:'cur', type:'radio', width:100},
				{field:'right', toolbar:'#toolbar', align:'center', width:80}
			]],
			page:true,
			data:data.list
		});
	})
})