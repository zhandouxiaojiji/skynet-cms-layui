layui.use(['form', 'table', 'layer','jquery','session'], function(exports){
    var form = layui.form,
        table = layui.table,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        session = layui.session;
    var url = parent.curUrl || "/cms/view/main";
    session.call(url, {}, function(data){
        let content = data.content;
        $('.childrenBody').append(content);
        function parse_action(action){
            let a = action[0];
            let id = action[1];
            switch (a) {
                case "ALERT":
                    alert(action[1]);
                    break;
                case "CLICK":
                    var element = $("#"+id)
                    element.click(function(){
                        let args = action[2];
                        if (typeof(args[0]) == "object"){
                            for(let i in args){
                                parse_action(args[i]);
                            }
                        }else{
                            parse_action(args);
                        }
                        return false;
                    });
                    break;
                case "POST":
                    var param = {};
                    for (let i in action[2]){
                        let v = action[2][i];
                        param[v[1]] = parse_action(v);
                    }
                    console.log(param);
                    session.call(action[1], param, function(data){
                        let cb = data.cb;
                        if(typeof(cb[0])=="object"){
                            for(let i in cb){
                                parse_action(cb[i]);
                            }
                        }else{
                            parse_action(cb);
                        }
                    });
                    return false;
                case "GET_VAL":
                    var element = $("#"+id);
                    console.log("&&&&&& GET_VAL", id, element, element.val());
                    return element.val();
                case "SET_VAL":
                    var element = $("#"+id);
                    element.val(action[2]);
                    break;
                case "APPEND_VAL":
                    var element = $("#"+id);
                    element.val(element.val()+action[2]+'\n');
                    break;
                case "GET_TEXT":
                    var element = $("#"+id);
                    return element.text();
                case "SET_TEXT":
                    var element = $("#"+id);
                    element.text(action[2]);
                    break;
                case "SUBMIT":
                    break;
                case "OPEN":
                    layer.open(action[1]);
                    break;
            }
        }
        for(let i in data.tables){
            let v = data.tables[i];
            if(v.done){
                v.done = parse_action(v.done);
            }
            table.render(data.tables[i]);
        }
        for(let i in data.actions){
            parse_action(data.actions[i]);
        }
        if(data.table_on){
            for(let i in data.table_on){
                let v = data.table_on[i];
                table.on(v[0], function(obj) {
                    let action = v[1][obj.event];
                    if(action){
                        parse_action(action);
                    }
                })
            }
        }
       
    })
});