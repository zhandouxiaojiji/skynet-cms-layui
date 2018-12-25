layui.config({
  base : "../../js/"
})
layui.use(['form', 'jquery', 'session'], function(){
	var session = layui.session;
	var form = layui.form;
	var $ = layui.jquery;

	form.on("submit(run)",function(data){
		let old = data.field.output;
		session.call("/cms/user/gm", {gm:data.field.cmd}, function(data){
			form.val("gm", {output:old+data.output+'\n'});
		});
		return false;
	});
	$("#reset").click(function(){
		form.val("gm", {output:""});
		return false;
	})
})