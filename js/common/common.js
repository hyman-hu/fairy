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
/**
 * 验证用户是否登录
 * @param user 用户
 */
function verifyUse(user) {
    if (user.userName == USERNAME && user.password == hex_md5(PASSWORD)) {//验证用户通过
        //保存cookie
        let date = new Date();
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000); //设置date为当前时间+1天
        document.cookie = "userName=" + user.userName + ";expires=" + date.toGMTString();
        document.cookie = "password=" + user.password + ";expires=" + date.toGMTString();
        return true;
    }else{
        return false;
    }
}
$(function () {
    // //获取cookie中的token  判断权限
    // if (typeof(avus_token) == "undefined") {
    //     alert("您还未登录；请先登录！");
    //     window.location.href = "login.html";
    // }
});
