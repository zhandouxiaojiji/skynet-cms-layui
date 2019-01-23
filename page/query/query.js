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
	session.call("/cms/query/setting", {action:"get"}, function(data) {
		var settings = data.settings
		$('#db').empty();
    	for (var i in settings.db_list){
        	let db = settings.db_list[i];
        	$('#db').append("<option value="+db.name+">"+db.name+"</option>");
    	}
		$('#platform').empty();
    	$('#platform').append('<option value="*">所有平台<option>');
		for(var i in settings.platform_list){
			let platform = settings.platform_list[i];
        	$('#platform').append("<option value="+platform.name+">"+platform.name+"</option>");
		}

		$('#channel').empty();
    	$('#channel').append('<option value="*">所有渠道<option>');
		for(var i in settings.channel_list){
			let channel = settings.channel_list[i];
        	$('#channel').append("<option value="+channel.name+">"+channel.name+"</option>");
		}

		$('#product').empty();
    	$('#product').append('<option value="*">所有产品<option>');
		for(var i in settings.product_list){
			let product = settings.product_list[i];
        	$('#product').append("<option value="+product.name+">"+product.name+"</option>");
		}
		
		$('#query').empty();
		for(var i in settings.query_list){
			let query = settings.query_list[i];
        	$('#query').append("<option value="+query.name+">"+query.name+"</option>");
		}

    	form.render();
	})
	form.on('submit(*)', function(data){
		let field = data.field;
		session.call('/cms/query/mysql', {
			db: field.db,
			platform: field.platform,
			channel: field.channel,
			product: field.product,
			query: field.query,
			begin_time: field.begin_time,
			end_time: field.end_time,
			addition: field.addition 
		}, function(data) {
			console.log(data);
			table.render({
				elem:'#list',
				cols:[data.cols],
				data:data.ret,
				page:true,
				cellMinWidth:80,
				toolbar: true,
				limit: 15,
				limits: [15,30,60,90],
				text: {
				    none: '暂无相关数据'
				}
			});
		})		
	})
})
