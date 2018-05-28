/**
 * 登录
 * Created by hyman on 2017/6/25.
 */
$(document).ready(function () {
    /**
     * 登录验证
     */
    $("#loginBut").click(function () {
        $(".err").html("");//错误提示信息清空
        //登录字段验证：当前只判断为空情况
        if ($("#userName").val().trim() == "") {
            $("#userName").next().html("用户名不能为空");
            return;
        }
        if ($("#password").val().trim() == "") {
            $("#password").next().html("密码不能为空");
            return;
        }
        $("#loginBut").button('loading');
        let user = {
            userName: $("#userName").val(),
            password: hex_md5($("#password").val())
        };
        if(verifyUse(user)){//验证用户是否是
            window.location.href = "index.html";
        }else{
            alert("密码验证失败");
            $("#loginBut").button('reset');
        }
    });
});
/**
 * 验证用户是否登录
 * @param user 用户
 */
function verifyUse(user) {
    if (user.userName == USERNAME && hex_md5(user.password) == hex_md5(hex_md5(PASSWORD))) {//验证用户通过
        //保存cookie
        let date = new Date();
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000); //设置date为当前时间+1天
        document.cookie = "userName=" + user.userName + ";expires=" + date.toGMTString();
        document.cookie = "password=" + hex_md5(user.password) + ";expires=" + date.toGMTString();
        return true;
    } else {
        return false;
    }
}
