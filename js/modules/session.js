layui.define(function(exports){
    var api={
    	hello:function(){
    		alert("hello");
    	},
    	getLastServer:function(){
    		return layui.data('global').lastServer;
    	},
    	setLastServer:function(last){
    		layui.data('global', {
			  key: 'lastServer'
			  ,value: last
			});
    	}
    };
    exports('session', api);
});  
