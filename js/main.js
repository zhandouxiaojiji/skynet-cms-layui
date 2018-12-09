layui.use(['layer', 'element', 'session', 'skynet'], function(){
  	var $ = layui.jquery;
  	var skynet = layui.skynet;
  	var session = layui.session;
	var layer = layui.layer;
	layer.msg('Hello World');


    function add_item(data){
        let str = "";
        if(data.children) {
            str += '<li class="layui-nav-item layui-nav-itemed">';
            str += '<a class="" href="javascript:;">'+data.text+'</a>'
            str += '<dl class="layui-nav-child">';
            for (i in data.children) {
                str += add_item(data.children[i]);
            }
            str += '</dl></li>';
        } else {
            str += '<dd><a href="javascript:;">'+data.text+'</a></dd>';
        }
        console.log(str);
        return str;
    }
	session.call("/cms/view/menu", {}, function(data){
		console.log(data);
        let left = data.left;
        $("#leftMenu").empty();
        let str = "";
        for(i in left){
            str += add_item(left[i]);
        }
        $("#leftMenu").append(str);
        $("#leftMenu").append(str);
	});
});
