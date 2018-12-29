layui.config({
  base : "../../js/"
})
layui.use(['table', 'jquery', 'session'], function(){
	var session = layui.session;
	var table = layui.table;
	var $ = layui.jquery;

	session.call('/cms/skynet/all_service', {}, function(data){
		console.log(data.list)
		table.render({
			elem:'#list',
			cols:[[
				{title:'地址', field:'addr', sort:true, width:150},
				{title:'描述', field:'desc', sort:true},
				{title:'内存', field:'mem', sort:true, width:100},
				{title:'任务', field:'task', sort:true, width:100},
				{title:'消息队列', field:'mqlen', sort:true, width:100}
			]],
			toolbar:true,
			page:true,
			unresize: false,
			limit: 20,
			limits: [20,50,100],
			text: {
			    none: '暂无相关数据'
			},
			data:data.list
		});
	})
})