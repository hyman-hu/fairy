/**
 * 公共部分
 * Created by hyman on 2017/7/5.
 */
(function (w, $) {
    //获取cookie中的token  判断权限
    if ($.cookie("userName") !== USERNAME || $.cookie("password") !== hex_md5(hex_md5(PASSWORD))) {
        alert("您还未登录；请先登录！");
        console.log(window.url);
        let url = window.location.href;
        if (url.indexOf("page") > 0) {
            window.location.href = "../login.html";
        } else {
            window.location.href = "./login.html";
        }
    }
})(window, jQuery);
/**
 * 页面跳转
 */
function goBack(){
    window.location.replace(document.referrer);
}