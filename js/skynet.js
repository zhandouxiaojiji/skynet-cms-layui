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
            let id = action[0];
            let a = action[1];
            let element = $("#"+id)
            switch (a) {
                case "ALERT":
                    alert(action[2]);
                    break;
                case "CLICK":
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
                    element.click(function(){
                        var param = {};
                        for (let i in action[3]){
                            let v = action[3][i];
                            param[v[0]] = parse_action(v);
                        }
                        console.log(param);
                        session.call(action[2], param, function(data){
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
                    });
                    break;
                case "GET_VAL":
                    return element.val();
                case "SET_VAL":
                    element.val(action[2]);
                    break;
                case "APPEND_VAL":
                    element.val(element.val()+action[2]+'\n');
                    break;
                case "GET_TEXT":
                    return element.text();
                case "SET_TEXT":
                    element.text(action[2]);
                    break;
                case "SUBMIT":
                    break;
            }
        }
        for(let i in data.tables){
            console.log(data.tables[i]);
            table.render(data.tables[i]);
        }
        for(let i in data.actions){
            parse_action(data.actions[i])
        }
    })
});