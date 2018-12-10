layui.use(['form','layer','jquery','session'], function(exports){
   	var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        session = layui.session;
   	console.log(parent.curUrl);
   	$('.childrenBody').append(parent.curUrl);
   	var url = parent.curUrl;
   	session.call(url, {}, function(data){
   		let content = data.content;
   		console.log(data);
   		$('.childrenBody').append(content);
   	})
});