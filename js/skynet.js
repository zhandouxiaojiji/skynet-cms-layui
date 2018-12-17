layui.use(['form','layer','jquery','session'], function(exports){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        session = layui.session;
    console.log(parent.curUrl);
    // $('.childrenBody').append(parent.curUrl);
    var url = parent.curUrl;
    session.call(url, {}, function(data){
        let content = data.content;
        console.log(data);
        $('.childrenBody').append(content);
        function parse(action){
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
                                parse(args[i]);
                            }
                        }else{
                            parse(args);
                        }
                        return false;
                    });
                    break;
                case "POST":
                    element.click(function(){
                        var param = {};
                        for (let i in action[3]){
                            let v = action[3][i];
                            param[v[0]] = parse(v);
                        }
                        console.log(param);
                        session.call(action[2], param, function(data){
                            let cb = data.cb;
                            if(typeof(cb[0])=="object"){
                                for(let i in cb){
                                    parse(cb[i]);
                                }
                            }else{
                                parse(cb);
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
                case "SUBMIT":
                    break;
            }
        }
        for(let i in data.actions){
            parse(data.actions[i])
        }
    })
});