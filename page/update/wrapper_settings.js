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
	function update_list(){
		session.call('/cms/update/wrapper_settings/list', {}, function(data){
			console.log(data.list)
			table.render({
				elem:'#list',
				cols:[[
					{field:'select', type:'checkbox', width:50},
					{title:'配置名', field:'name', sort:true, width:150},
					{title:'脚本路径', field:'shell'},
					{title:'脚本参数', field:'param', width:150},
					{title:'输出路径', field:'path'}
				]],
				toolbar:'default',
				page:true,
				data:data.list
			});
		})
	}
	update_list();
	function edit(data) {
		var index = layui.layer.open({
			title: '添加配置',
			type: 2,
			content: 'wrapper_edit.html',
			success: function() {
                var body = layui.layer.getChildFrame('body', index);
				if(data){
                    body.find(".name").val(data.name);
                    body.find(".shell").val(data.shell);
                    body.find(".param").val(data.param);
                    body.find(".path").val(data.path);
                    form.render();
				}
                setTimeout(function(){
                    layui.layer.tips('点击此处返回', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
			}
		});
		layui.layer.full(index);
        window.sessionStorage.setItem("index",index);
        $(window).on("resize",function(){
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
	}
	table.on('toolbar(list)', function(obj){
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
				session.call("/cms/update/wrapper_settings/remove", {names:names}, function() {
					update_list();
				})
				break;
		}
	})
})