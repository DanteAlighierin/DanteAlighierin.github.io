var RCUserHandler;
(function (RCUserHandler) {
    RCUserHandler.Context = {
    };
    RCUserHandler.Context.cookies = {
    };
    RCUserHandler.Context.cookies.cookieName = "<$mt:UserSessionCookieName$>";
    RCUserHandler.Context.cookies.cookieDomain = "<$mt:UserSessionCookieDomain$>";
    RCUserHandler.Context.cookies.cookiePath = "<$mt:UserSessionCookiePath$>";
    RCUserHandler.Context.cookies.cookieTimeout = "<$mt:UserSessionCookieTimeout$>";
    RCUserHandler.Context.data = {
    };
    RCUserHandler.Context.data.signOutLink = "<$mt:SignOutLink$>";
    RCUserHandler.Context.data.signInLink = '<$mt:SignInLink$>';
    RCUserHandler.Context.data.blogURL = '<$mt:BlogURL encode_url="1"$>';
    RCUserHandler.Context.data.authorProfileLink = "<$mt:CGIPath$><$mt:CommentScript$>?__mode=edit_profile&blog_id=<mt:BlogID>&return_url=";
    RCUserHandler.Context.data.registerLink = "<$mt:CGIPath$><$mt:CommentScript$>?__mode=register&blog_id=<mt:BlogID>&return_url=";
    RCUserHandler.Context.data.authorEditEntryLink = "<$mt:AdminScript$>?__mode=view&amp;_type=entry&amp;id=";
    RCUserHandler.Context.data.captchaField = "<$mt:CaptchaFields$>";
    RCUserHandler.Context.data.checkLoggedIn = "<$mt:CGIPath$><$mt:CommentScript$>?__mode=userinfo&jsonp=mtSaveUserInfo&sid=";
    var User = (function () {
        function User(cookie) {
            User.MTCookie = cookie;
            return this;
        }
        User.prototype.getUserDisplayName = function () {
            return User.MTCookie.displayName;
        };
        User.prototype.getEmail = function () {
            return User.MTCookie.userEmail;
        };
        User.prototype.getProfileLink = function () {
            return User.MTCookie.userProfileLink;
        };
        User.prototype.getUserURL = function () {
            return User.MTCookie.userURL;
        };
        User.prototype.canComment = function () {
            return User.MTCookie.userCanComment;
        };
        User.prototype.canPost = function () {
            return User.MTCookie.userCanPost;
        };
        User.prototype.isAuthenticated = function () {
            return User.MTCookie.userIsAuthenticated;
        };
        User.prototype.isTrusted = function () {
            return User.MTCookie.userIsTrusted;
        };
        User.prototype.isAuthor = function () {
            return User.MTCookie.userIsAuthor;
        };
        User.prototype.getJSON = function () {
            return JSON.stringify(User.MTCookie);
        };
        return User;
    })();
    RCUserHandler.User = User;
    var MTCookieProvider = (function () {
        function MTCookieProvider() {
            var cookie = $.cookie('mt_blog_user');
            var splitSep = [];
            var parts = [];
            if(cookie == undefined) {
                this.userIsAuthenticated = false;
                this.userIsTrusted = false;
                return;
            }
            var cookie = cookie.split(';');
            for(var i = 0; i < cookie.length; i++) {
                splitSep = cookie[i].split(':');
                if(splitSep[1] == undefined) {
                    continue;
                }
                var value = splitSep[1].slice(1);
                value = value.slice(0, -1);
                if(value == "1") {
                    value = true;
                } else if(value == "0") {
                    value = "false";
                }
                parts[splitSep[0]] = value;
            }
            this.displayName = parts['name'];
            this.userCanComment = parts['can_comment'];
            this.sid = parts['sid'];
            this.userCanPost = parts['can_post'];
            this.userIsAuthenticated = parts['is_authenticated'];
            this.userIsTrusted = parts['is_trusted'];
            this.userIsAuthor = parts['is_author'];
            this.userIsBanned = parts['is_banned'];
            this.userProfileLink = parts['profile'];
            this.userURL = parts['url'];
        }
        return MTCookieProvider;
    })();
    RCUserHandler.MTCookieProvider = MTCookieProvider;
})(RCUserHandler || (RCUserHandler = {}));
//@ sourceMappingURL=BUH.js.map
