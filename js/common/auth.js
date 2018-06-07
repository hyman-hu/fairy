/**
 * 公共部分
 * Created by hyman on 2017/7/5.
 */
/**
 * 根据name获取cookie的值
 * @param objname
 */
function getcookie(objname) {//获取指定名称的cookie的值
    var arrstr = document.cookie.split(";");
    for (var i = 0; i < arrstr.length; i++) {
        var temp = arrstr[i].split("=");
        if (temp[0].trim() == objname) {
            return unescape(temp[1]);
        }
    }
}

$(function () {
    //获取cookie中的token  判断权限
    if (getcookie("userName") !== USERNAME || getcookie("password") !== hex_md5(hex_md5(PASSWORD))) {
        alert("您还未登录；请先登录！");
        console.log(window.url);
        let url = window.location.href;
        if (url.indexOf("page") > 0) {
            window.location.href = "../login.html";
        } else {
            window.location.href = "./login.html";
        }
    }
});