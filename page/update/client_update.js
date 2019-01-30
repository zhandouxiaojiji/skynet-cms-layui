layui.config({
  base : "../../js/"
})
layui.use(['table', 'jquery', 'session', 'form', 'layer'], function(){
	var session = layui.session;
	var table = layui.table;
	var layer = layui.layer;
	var form = layui.form;
	var $ = layui.jquery;
	var versions = {};

	function get_last_wrapper() {
		var last = session.get('last_wrapper');
		if(last&&versions[last]){
			return last;
		}
		for(var name in versions){
			return name;
		}
	}

	function switch_version(type, version) {
		var index = layer.open({
            title: '切换版本',
            content: '确定把当前版本切换到'+version+'?',
            btn: ['确定'],
            yes: function() {
                layer.close(index);
                session.call("/cms/update/client_update/current", {
                    wrapper: $("#wrapper_name").val(),
                    type: type,
                    version: version
                }, function(){
                    update_list();
                });
            }
        });
	}

	function update_list() {
		session.call('/cms/update/client_update/list', {}, function(data){
			versions = data.versions;
			$("#wrapper_name").empty();
			for(var name in versions){
				$("#wrapper_name").append('<option value="'+name+'">'+name+'</option>');
			}
			var name = get_last_wrapper();
			$("#wrapper_name").val(name);
			table.render({
				elem:'#list',
				cols:[[
					{title:'版本号', field:'version', sort:true, width:80},
					{title:'说明', field:'desc', edit: 'text'},
					{title:'提交版本', field:'git'},
					{title:'日期', field:'time', width:170},
					{title:'主版本', field:'cur', templet: '#switchCur', width:110},
					{title:'Android版本', field:'cur_android', templet: '#switchCurAndroid', width:110},
					{title:'iOS版本', field:'cur_ios', templet: '#switchCurIOS', width:110},
					{title:'操作', field:'right', toolbar:'#toolbar', align:'center', width:80}
				]],
				page:true,
				data:versions[name],
				unresize: false,
				limit: 15,
				limits: [15,30,60,90],
				text: {
				    none: '暂无相关数据'
				}
			});
			if(versions[name][0]){
				var cur = versions[name][0].version;
				var nums = cur.match(/\d+/g);
				nums[2] = Number(nums[2])+1;
				console.log(nums);
				$("#new_version").val(nums[0]+'.'+nums[1]+'.'+nums[2]);
			}
			form.on('switch(cur)', function(obj){
				// layer.tips(this.value + '：'+ obj.elem.checked, obj.othis);
				switch_version("cur", this.value);
			});
			form.on('switch(curAndroid)', function(obj){
				// layer.tips(this.value + '：'+ obj.elem.checked, obj.othis);
				switch_version("cur_android", this.value);
			});
			form.on('switch(curIOS)', function(obj){
				// layer.tips(this.value + '：'+ obj.elem.checked, obj.othis);
				switch_version("cur_ios", this.value);
			});
			form.render();
		})
	}

	form.on("submit(*)", function(data) {
		var field = data.field;
		session.call('/cms/update/client_update/wrapper', {
			version: field.version,
			desc: field.desc,
			wrapper: field.wrapper
		}, function(ret) {
			update_list();
			layer.open({
				title: "打包日志",
				maxWidth: 1000,
				content: '<textarea class="layui-textarea" style="width:900px;height:500px">'+ret.output+'</textarea>',
                success: function(){
                    $(".layui-textarea").scrollTop(500000);
                }
			});
		})
		return false;
	})

	form.on("select(wrapper_name)", function(data) {
		session.set('last_wrapper', data.value);
		update_list();
	})

	table.on("tool(list)", function(obj) {
        switch(obj.event){
            case "del":
                var index = layer.open({
                    title: '删除版本',
                    content: '确定删除版本'+obj.data.version+'?',
                    btn: ['确定'],
                    yes: function(){
                        layer.close(index);
                        session.call("/cms/update/client_update/remove", {
                            wrapper: $("#wrapper_name").val(),
                            version: obj.data.version
                        }, function(){
							update_list();
                        })
                    }
                });
                break;
        }
	})
    
    // table.on("radio(list)", function(obj) {
    //     var index = layer.open({
    //         title: '切换版本',
    //         content: '确定把当前版本切换到'+obj.data.version+'?',
    //         btn: ['确定'],
    //         yes: function() {
    //             layer.close(index);
    //             session.call("/cms/update/client_update/current", {
    //                 wrapper: $("#wrapper_name").val(),
    //                 version: obj.data.version
    //             }, function(){
    //                 update_list();
    //             });
    //         }
    //     });
    // })

    table.on("edit(list)", function(obj) {
    	session.call("/cms/update/client_update/desc", {
    		wrapper: $("#wrapper_name").val(),
            version: obj.data.version,
            desc: obj.data.desc
    	}, function() {
    		update_list();
    	})
    })


    update_list();


})
