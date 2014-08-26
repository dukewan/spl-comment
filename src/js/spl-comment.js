(function($) {
    var defaults = {
        user: "",
        url: "",
        noItem: "还没有人留言，赶紧抢沙发吧~"
    }

    var opts;

    $.fn.splComment = function (options) {
        opts = $.extend({}, defaults, options || {});

        return this.each(function() {
            var $this = $(this);
            var methods = new Methods($this);

            if($this.hasClass('spl-comment')) {
                var replyArea = $('.spl-area', $this);
                var subBtn = $('.spl-submit', $this);

                opts.user && replyArea.attr('placeholder', opts.user + '，说点什么吧~');

                methods.checkList();

                subBtn.click(function () {
                    if(opts.user === '') {
                        methods.tip('请登录后再评论.');
                        return false;
                    }

                    if(opts.url === '') {
                        methods.tip('页面错误，请稍后重试.');
                        return false;
                    }

                    methods.onSubBtnClick({spl: $this, btn: subBtn, replyArea: replyArea, opts: opts});
                });


            }
        });
    };

    var Methods = function (spl) {
        var me = this;
        this.tip = function(msg) {
            msg && alert(msg);
        };

        this.checkList = function () {
            var list = $('.spl-list', spl);
            var items = $('.spl-item', list);

            if(items.length == 0) {
                list.prepend('<div class="spl-no-item">' +
                            opts.noItem +
                            '</div>');
            }
        }

        this.onSubBtnClick = function (obj) {
            var btn = obj.btn;
            var content = obj.replyArea.val();

            if(content) {
                btn.text('发布中...');

                $.ajax({
                    url: obj.opts.url,
                    data: {user: obj.opts.user, content: content},
                    type: 'post',
                    dataType: 'json',
                    success: function (data) {
                        data.state == 'error' && me.tip(data.msg);

                        setTimeout(function() {
                            if(data.state == 'success') {
                                me.addComment(data.spl, data.comment);
                            }
                            obj.replyArea.val("");
                            btn.text('发布');
                        }, 500);
                    },
                    error: function () {
                        me.tip('提交评论失败.');

                        btn.text('发布失败');
                        setTimeout(function () {
                            btn.text('发布');
                        }, 1000);
                    }
                });
            } else {
                me.tip('评论内容不能为空！');
                obj.replyArea.css('border-color', 'red');
                obj.replyArea.focus();
                setTimeout(function() {
                    obj.replyArea.css('border-color', '#000');
                }, 2000);
            }
        };

        this.addComment = function (spl, comment) {
            if(comment.user && comment.time && comment.content) {
                var list = $('.spl-list', spl);
                var noItem = $('.spl-no-item', spl);
                noItem && noItem.fadeOut();

                var tpl = '<div class="spl-item" style="display: none">'
                            +'<span class="spl-name">'+comment.user+'</span>'
                            +'<span class="spl-time">'+comment.time+'</span>'
                            +'<span class="spl-suffix">，说到</span>'
                            +'<div class="spl-content">'+comment.content+'</div>'
                            +'</div>';

                var co = $(tpl);

                co.prependTo(list);
                co.slideDown();
            }
        }
    }


})(jQuery);