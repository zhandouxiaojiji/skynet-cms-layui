layui.define(function(exports){
	var $ = layui.jquery;
	var server;
	var authorization;
	function json_encode(data){
		return JSON.stringify(data);
	}
    var api={
    	get:function(k){
    		return layui.data('store')[k];
    	},
    	set:function(k, v){
    		layui.data('store', {
    			key:k,
    			value:v
    		});
    	},
    	getLastServerName:function(){
    		return layui.data('store').lastServer;
    	},
    	setLastServerName:function(last){
    		layui.data('store', {
			  key: 'lastServer',
			  value: last
			});
    	},
    	getCurServer:function(){
    		if (server){
	    		return server;
    		}
    		let name = api.getLastServerName();
    		for (i in window.serverlist){
				let s = window.serverlist[i];
				if (s.name == name){
					server = s;
					return server;
				}
			}
    	},
    	login:function(account, password){
    		server = api.getCurServer();
    		$.ajax({
    			type:"POST",
    			url:server.host+"/cms/user/login",
    			data:json_encode({
    				account:account,
    				password:password,
    			}),
    			dataType:"json",
    			success:function(data){
    				console.log(data);
    				if (data.err == 0) {
    					authorization = data.authorization;
    					console.log(api);
    					api.set("authorization", authorization);
    					window.location.href = "index.html";
    				}
    			}
    		});
    	},
    	call:function(api, data, cb){
    		if (!server) {
    			console.log("未登陆");
    			window.location.href = "login.html";
    		}
    		$.ajax({
    			type:"POST",
    			url:server.host + api,
    			data:json_encode(data),
    			dataType:"json",
    			beforeSend:function(xhr){
    				xhr.setRequestHeader('Authorization', authorization);
    			},
    			success:function(data){
    				if (data.err == 0) {
    					console.log("call "+api+", success:"+data);
    					cb(data);
    				} else if (data.err == 4) {
    					console.log("授权错误，回到登陆界面", authorization);
    					window.location.href = "login.html";
    				} else {
                        console.log("call "+api+", error:");
                        console.log(data);
    				}
    			}
    		});
    	}
    };
    server = api.getCurServer();
    authorization = api.get('authorization');
    exports('session', api);
});  
