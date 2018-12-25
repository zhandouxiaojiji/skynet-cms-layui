layui.config({
  base : "../../js/"
})
layui.use(['form', 'jquery', 'session'], function(){
	var session = layui.session;
	var form = layui.form;
	var $ = layui.jquery;

	form.val("inject", {
		"addr":"0x8",
		"code":'print "hello world!"'
	})
	form.on("submit(run)",function(data){
		let field = data.field
		session.call("/cms/debug/inject", {
			addr:field.addr,
			code:field.code
		}, function(data){
			form.val("inject", {output:data.output});
		});
		return false;
	});
	$("#reset").click(function(){
		form.val("inject", {output:""});
		return false;
	})
})