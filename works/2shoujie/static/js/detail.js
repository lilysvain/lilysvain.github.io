(function(){
    var Slider = function() {
        var cur;
        var sphotos, bphotos,wrs;

        function index(a, b) {
            for(var i = 0; i < b.length; i++) {
                if(a === b[i])
                    return i;
            }
        }

        function _slideTo(toe) {
            var to = index( toe, wrs );
            if( to === cur ) return ;
            $(wrs[cur]).removeClass("cur");
            $(bphotos[cur]).removeClass("cur");
            cur = to;
            $(wrs[cur]).addClass("cur");
            $(bphotos[cur]).addClass("cur");
        }

        function dealEvent(e) {
            _slideTo(e.currentTarget);
        }

        function bindSliderEvent() {
            $(".ershou-photo-slide").on("mouseenter", ".ershou-photo", dealEvent);
        }

        function _init() {
            wrs = $(".ershou-photo");
            sphotos = $(".small");
            bphotos = $(".bigger");
            _slideTo(wrs[0]);
            bindSliderEvent();
        }

        return {
            init: _init
        }

    }();

    Slider.init();

    var Comment = function() {
        var isRpl = 0,
            inputPrefix = 0,
            contentBox = $(".comment-input").get(0),
            rplName,
            content;

        function rpl(value, name) {
            isRpl = value;
            rplName = name;
            inputPrefix = "回复 " + name + " ：";
            $(contentBox).val(inputPrefix);
            moveEnd(contentBox);
        }

        function moveEnd(obj){
            obj.focus();
            var len = obj.value.length;
            if (document.selection) {
                var sel = obj.createTextRange();
                sel.moveStart('character',len);
                sel.collapse();
                sel.select();
            } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
                obj.selectionStart = obj.selectionEnd = len;
            }
        }

        function _submit() {
            var goodsId = $("#goods_id").val(),
                comId = isRpl;
            content = $(contentBox).val();
            if(content.indexOf(inputPrefix) != 0) {
                comId = 0;
            } else {
                content =  content.replace(inputPrefix, "");
            }
            $.post("/comment/index",
                {
                    reply_comment_id: comId,
                    goods_id: goodsId,
                    comment:  content
                },
                _success
            );
        }

        function _addComment(data) {
            var wr = $(".comment-wr"),
                str = "";
            str = '<div class="comment"><div class="avatar"><img src="';
            str += data.data.user_avatar;
            str += '" alt="头像"/></div><div class="commentator">';
            str += data.data.user_nickname;
//            console.log(data.code == 0)
            if(isRpl != 0) {
                str += '<span class="rpy-to">';
                str += rplName;
                str += '</span>';
            }
            str += '</div><p class="comment">';
            str += content;
            str += '</p><div class="man"><a class="rpl" href="javascript:void(0);" onclick=\'reply('
                + data.data.comment_id + ',"' + data.data.user_nickname
                + '")\'>回复</a></div></div>';
            //$(str).appendTo(wr);
            $(str).insertBefore($(".post-comment"));
            $(contentBox).val("");
        }

        function _success(data, status) {
            var res = $.parseJSON(data);
            if(res.code != 0) {
                alert(res.msg);
            } else {
                // alert("评论成功！");
                _addComment(res);
            }
            isRpl = 0;
        }

        function _bind() {
            $(".sub-comment").on("click", _submit);
        }

        window.reply = rpl;

        return {
            bind: _bind
        };

    }();
    Comment.bind();
})();

function report()
{
    var goods_id = $("#goods_id").val();
    $.post('/goods/report', {goods_id:goods_id}, function(res){
        res = $.parseJSON(res);
        if (res.code != 0) {
            alert(res.msg);
        } else {
            alert('收到你的举报，我们会审查这件商品，非常感谢！');
        }
    });
}