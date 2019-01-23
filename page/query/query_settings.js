layui.config({
  base : "../../js/"
})
layui.use(['table', 'jquery', 'session', 'form', 'layer', 'laydate'], function(){
	var session = layui.session;
    var layer = parent.layer === undefined ? layui.layer : top.layer
    var form = layui.form;
    var laydate = layui.laydate;
	var table = layui.table;
	var $ = layui.jquery;
	var url = "/cms/query/setting"
	var confs = {
		db:{
			filter:"db_list",
			elem:"#db_list",
			cols:[
				{field:'select', type:'checkbox', width:50},
				{title:'产品', field:'name', width:150},
				{title:'地址', field:'db_host'},
				{title:'数据库', field:'db_name', width:150},
				{title:'用户', field:'db_user'},
				{title:'密码', field:'db_password'}
			]
		},
		platform:{
			filter:"platform_list",
			elem:"#platform_list",
			cols:[
				{field:'select', type:'checkbox', width:50},
				{title:'平台', field:'name'},
			]
		},
		channel:{
			filter:"channel_list",
			elem:"#channel_list",
			cols:[
				{field:'select', type:'checkbox', width:50},
				{title:'渠道', field:'name'},
			]
		},
		product:{
			filter:"product_list",
			elem:"#product_list",
			cols:[
				{field:'select', type:'checkbox', width:50},
				{title:'产品', field:'name'},
			]
		},
		query:{
			filter:"query_list",
			elem:"#query_list",
			cols:[
				{field:'select', type:'checkbox', width:50},
				{title:'查询类型', field:'name', width:150},
				{title:'查询语句', field:'sql', textarea:true},
			]
		}
	};
	function create_table(conf) {
		function update_list(){
			session.call(url, {filter:conf.filter, action:"list"}, function(data){
				console.log(data.list)
				table.render({
					elem:conf.elem,
					cols:[conf.cols],
					toolbar:'default',
					data:data.list
				});
			})
		}
		update_list();
		function edit(data) {
	        var html = '<form class="layui-form" lay-filter="edit_form" style="width:90%;">';
	        function form_item(v) {
	        	var str = ""
		        str += '<div class="layui-form-item layui-row layui-col-xs12">'
				str += '<label class="layui-form-label">'+v.title+'</label>'
				str += '<div class="layui-input-block">'
				if(v.textarea){
					str += '<textarea name="'+v.field+'" type="text" class="layui-textarea '+v.field+'" style="height:400px"></textarea>'
				}else{
					str += '<input name="'+v.field+'" type="text" class="layui-input '+v.field+'" lay-verify="required" placeholder="">'
				}
				str += '</div></div>'
				return str
	        }
	        for(let i in conf.cols){
	        	var v = conf.cols[i]
	        	if(v.field != "select"){
		        	html += form_item(v);
	        	}
	        }
	        html += '</form>';
			var index = layer.open({
				title: '添加配置',
				content: '<div style="width:600px">'+html+'</div>',
				maxWidth: 1000,
				maxHeight: 1000,
				success: function(layero) {
					if(data){
						console.log(data)
						for(let i in conf.cols){
							var v = conf.cols[i]
				        	if(v.field != "select"){
					        	layero.find("."+v.field).val(data[v.field]);
				        	}
						}
					}
				},
				yes: function(idx, layero) {
					var param = {}
					for(let i in conf.cols){
						var v = conf.cols[i]
			        	if(v.field != "select"){
				        	param[v.field] = layero.find("."+v.field).val();
			        	}
					}
					session.call(url, {
						filter:conf.filter,
						old_name:data?data.name:null,
				    	action:"edit",
				    	param:param
			        }, function() {
	                    layer.close(index);
	                    update_list();
			        })
				}
			});
		}
		table.on('toolbar('+conf.filter+')', function(obj){
			var checkStatus = table.checkStatus(obj.config.id);
			var data = checkStatus.data; //获取选中的数据
			switch(obj.event){
				case 'add':
					edit();
					break;
				case 'update':
					edit(data[0]);
					break;
				case 'delete':
					layer.msg('delete');
					let names = ""
					for(let i in data){
						names = names + ' ' + data[i].name;
					}
					session.call(url, {
						filter:conf.filter, 
						action:'remove', 
						names:names
					}, function() {
						update_list();
					})
					break;
			}
		})
	}

	for(let i in confs){
		create_table(confs[i]);
	}
})