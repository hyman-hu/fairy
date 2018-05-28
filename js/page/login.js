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
        }
        // $.ajax({
        //     type: "POST",
        //     url: $("#loginURL").val(),
        //     dataType: 'json',
        //     contentType:"application/json",
        //     data: JSON.stringify(info),
        //     success: function (data) {
        //         $("#loginBut").button('reset');
        //         if(data.state){
        //             //验证通过：保存token到浏览器缓存中 跳转主页 主页每个请求去缓存中读取 token
        //             var date=new Date();
        //             date.setTime(date.getTime()+24*60*60*1000); //设置date为当前时间+1天
        //             document.cookie="avus_token="+data.token+";expires="+date.toGMTString();
        //             document.cookie="avus_userName="+data.userName+";expires="+date.toGMTString();
        //             window.location.href = "homepage.html";
        //         }else{
        //             //验证失败：给出提示信息
        //             alert("用户名和密码不匹配");
        //         }
        //     }
        // });
    });
});

