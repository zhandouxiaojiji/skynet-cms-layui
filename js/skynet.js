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
                    return function(){
                        alert(action[2]);
                        return false;
                    }
                case "CLICK":
                    element.click(parse(action[2]));
                    break;
                case "POST":
                    element.click(function(){
                        console.log("&&&&& click", action)
                        session.call(action[2], {}, parse(action[4]))
                        return false;
                    });
                case "VALUE":
                    return element.val();
                case "SUBMIT":
                    break;
            }
        }
        for(let i in data.actions){
            parse(data.actions[i])
        }
    })
});