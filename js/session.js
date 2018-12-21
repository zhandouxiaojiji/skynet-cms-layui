layui.define(['layer'], function(exports){
	var $ = layui.jquery;
    var layer = parent.layer === undefined ? layui.layer : top.layer;
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
            api.set("account", account);
            api.set("password", password);
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
    				}else{
                        layer.msg("login error:"+data.desc);
                    }
    			},
                error:function(data){
                    let url = window.location.href
                    if(url.indexOf("index.html")>0){
                        alert("无法连接到服务器");
                        parent.location.href = "login.html"
                    }else{
                        layer.msg("无法连接到服务器");
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
    				} else if (data.err == 4109) {
    					console.log("授权错误，回到登陆界面", authorization);
                        if(top.location!=self.location){
                            top.location.href = "login.html";
                        }else{
        					window.location.href = "login.html";
                        }
    				} else {
                        layer.msg("call "+api+", error:"+data.desc);
                        console.log(data);
    				}
    			},
                error:function(data){
                    layer.msg("无法连接到服务器");
                    // layer.msg(data);
                }
    		});
    	}
    };
    server = api.getCurServer();
    authorization = api.get('authorization');
    exports('session', api);
});  
