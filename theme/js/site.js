var Site;
(function (Site) {
    var RegisterHooks = (function () {
        function RegisterHooks() {
            this.Config = null;
        }
        RegisterHooks.prototype.Behavior = function () {
            var modifyWidthAttr = function (indexInArray, valueOfElement) {
                object = $(this);
                if(object.attr('width')) {
                    var objectWidth = parseInt(object.attr('width'));
                    if(Site.Config.layout == "with-sidebar") {
                        if(objectWidth > 620) {
                            object.attr('width', 620);
                        }
                    }
                }
            };
            $('.archive-list ul').each(function () {
                var node = $(this);
                if(node.has('ul')) {
                    node.children().toggle();
                }
                node.parent().click(function () {
                    if($(this).has('ul')) {
                        $(this).find('ul').children().slideToggle({
                            duration: 500,
                            easing: 'easeOutBounce'
                        });
                    }
                });
            });
            if(Site.Config.behavior.alterObjectWidthToTemplateDefault) {
                $('.entry-container object').each(modifyWidthAttr);
            }
            if(Site.Config.behavior.alterEmbedWidthToTemplateDefault) {
                $('.entry-container embed').each(modifyWidthAttr);
            }
            if(Site.Config.behavior.alterImgWidthToTemplateDefault) {
                $('.entry-container img').each(modifyWidthAttr);
            }
            var comment_active = false;
            $('.comment-form').on('keyup blur click', 'input, textarea', function () {
                if(!Site.Config.behavior.enableLivePreview) {
                    return;
                }
                var comment_author = $('.comment_author');
                var comment_body = $('.comment_body');
                var comment_url = $('.comment_url');
                var preview_author = $('.comment-preview-author');
                var preview_body = $('.comment-preview-body');
                if(comment_author.val().length <= 0 && comment_body.val().length <= 0) {
                    if(comment_active) {
                        $('.preview-hidden').toggle();
                        comment_active = false;
                    }
                    return;
                }
                if(!comment_active) {
                    $('.preview-hidden').toggle();
                    comment_active = true;
                } else {
                    if(!comment_active) {
                        return;
                    }
                }
                preview_author.text(comment_author.val());
                preview_body.html(comment_body.val().replace(/\n/g, '<br />'));
            });
            var provider = new RCUserHandler.MTCookieProvider();
            var user = new RCUserHandler.User(provider);
            if(Site.Config.behavior.inEntry) {
                var commentSection = $('#comment-section').html();
                var template = Handlebars.compile(commentSection);
                var templateHolder = $('.comment-form');
                user = JSON.parse(user.getJSON());
                user['Context'] = RCUserHandler.Context;
                templateHolder.html(template(user));
                $('.reply').click(function (e) {
                    e.preventDefault();
                    var commentID = $(this).attr('data-comment-id');
                    var commentFormTemplate = $("#comment-section").html();
                    var template = Handlebars.compile(commentFormTemplate);
                    var templateHolder = $('article[data-article-id="' + commentID + '"] .comment-form-holder');
                    user.Context.data.Comment = {
                    };
                    user.Context.data.Comment.ParentID = commentID;
                    templateHolder.html(template(user));
                    templateHolder.slideToggle({
                        duration: 1000,
                        easing: 'easeOutBounce'
                    });
                });
                $('body').on('click', '.postme', function (e) {
                    e.preventDefault();
                    var parent = $(this).parent().parent().parent().parent().parent();
                    var author = parent.find('.comment_author').val();
                    var email = parent.find('.comment_email').val();
                    var url = parent.find('.comment_url').val();
                    var cb = parent.find('.rememberme:checked');
                    var provider = user.getProvider();
                    provider.displayName = author;
                    provider.userEmail = email;
                    provider.userURL = url;
                    console.log(cb);
                    if(cb != undefined) {
                        user.saveProvider(provider);
                        user.saveUser(true);
                    }
                    parent.find('form').submit();
                });
            }
        };
        return RegisterHooks;
    })();
    Site.RegisterHooks = RegisterHooks;    
})(Site || (Site = {}));

$(function () {
    var site = new Site.RegisterHooks();
    site.Behavior();
});
//@ sourceMappingURL=site.js.map
