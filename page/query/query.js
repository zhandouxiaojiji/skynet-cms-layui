layui.config({
  base : "../../js/"
})
layui.use(['table', 'jquery', 'session', 'form', 'layer', 'laydate'], function(){
	var session = layui.session;
	var table = layui.table;
	var layer = layui.layer;
	var form = layui.form;
	var laydate = layui.laydate;
	var $ = layui.jquery;
	
	// var date = new Date();
	// var beginTime = new Date(new Date(new Date().toLocaleDateString()).getTime()); // 当天0点
	// var endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000-1);
	laydate.render({
		elem:'#begin_time',
		// type: 'datetime',
		value:new Date()
	});
	laydate.render({
		elem:'#end_time',
		// type: 'datetime',
		value:new Date()
	});
})
