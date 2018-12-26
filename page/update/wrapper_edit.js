layui.config({
  base : "../../js/"
})
layui.use(['form', 'layer', 'session'], function(){
    var form = layui.form;
    var layer = parent.layer === undefined ? layui.layer : top.layer;
    var session = layui.session;
    var $ = layui.jquery;
    function close() {
        layer.closeAll("iframe");
        parent.location.reload();
    }
    form.on("submit(ok)",function(data){
        var field = data.field;
        session.call("/cms/update/wrapper_settings/edit", {
            name: field.name,
            shell: field.shell,
            param: field.param,
            path: field.path,
        }, function() {
            close();
        })
        return false;
    })
    $("#close").click(function() {
        close();
    })
})