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

            if($this.hasClass('spl-comment')) {
                var spl = new SplComment($this);
                var replyArea = $('.spl-area', $this);
                var subBtn = $('.spl-submit', $this);

                opts.user && replyArea.attr('placeholder', opts.user + '，说点什么吧~');

                spl.checkList();

                subBtn.click(function () {
                    if(opts.user === '') {
                        spl.tip('请登录后再评论.');
                        return false;
                    }

                    if(opts.url === '') {
                        spl.tip('页面错误，请稍后重试.');
                        return false;
                    }

                    spl.onSubBtnClick();
                });
            }

        });
    };

    var SplComment = function (dom) {
        var me = this;

        this.replyArea = $('.spl-area', dom);
        this.btn = $('.spl-submit', dom);
        this.list = $('.spl-list', dom);
        this.items = $('.spl-item', dom);



        this.tip = function(msg) {
            msg && alert(msg);
        };

        this.checkList = function () {
            if(me.items.length == 0) {
                me.list.prepend('<div class="spl-no-item">' +
                            opts.noItem +
                            '</div>');
            }

            me.noItem = $('.spl-no-item', dom);
        }

        this.onSubBtnClick = function () {
            var content = me.replyArea.val();

            if(content) {
                me.btn.text('发布中...');

                $.ajax({
                    url: opts.url,
                    data: {user: opts.user, content: content},
                    type: 'post',
                    dataType: 'json',
                    success: function (data) {
                        data.state == 'error' && me.tip(data.msg);

                        setTimeout(function() {
                            if(data.state == 'success') {
                                me.addComment(data.comment);
                            }
                            me.replyArea.val("");
                            me.btn.text('发布');
                        }, 500);
                    },
                    error: function () {
                        me.tip('提交评论失败.');

                        me.btn.text('发布失败');
                        setTimeout(function () {
                            me.btn.text('发布');
                        }, 1000);
                    }
                });
            } else {
                me.replyArea.css('border-color', 'red');
                me.tip('评论内容不能为空！');
                me.replyArea.focus();
                setTimeout(function() {
                    me.replyArea.css('border-color', '#000');
                }, 2000);
            }
        };

        this.addComment = function (comment) {
            if(comment.user && comment.time && comment.content) {
                me.noItem && me.noItem.fadeOut();

                var tpl = '<div class="spl-item" style="display: none">'
                            +'<span class="spl-name">'+comment.user+'</span>'
                            +'<span class="spl-time">'+comment.time+'</span>'
                            +'<span class="spl-suffix">，说到</span>'
                            +'<div class="spl-content">'+comment.content+'</div>'
                            +'</div>';

                var co = $(tpl);

                co.prependTo(me.list);
                co.slideDown();
            }
        }
    }


})(jQuery);