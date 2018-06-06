/**
 *
 */
window.onload = function () {
    $("#fairyContent").show();
    $("#learnContent").hide();
    $("#moodContent").hide();
};
$(document).ready(function () {
    /**
     * 导航栏点击CSS改变
     */
    $("#fairyLi").click(function () {
        $("#fairyLi").addClass("active");
        $("#learnLi").removeClass("active");
        $("#moodLi").removeClass("active");
        $("#fairyContent").show();
        $("#learnContent").hide();
        $("#moodContent").hide();
    });
    /**
     * 导航栏点击CSS改变
     */
    $("#learnLi").click(function () {
        $("#fairyLi").removeClass("active");
        $("#learnLi").addClass("active");
        $("#moodLi").removeClass("active");
        $("#fairyContent").hide();
        $("#learnContent").show();
        $("#moodContent").hide();
    });
    /**
     * 导航栏点击CSS改变
     */
    $("#moodLi").click(function () {
        $("#fairyLi").removeClass("active");
        $("#learnLi").removeClass("active");
        $("#moodLi").addClass("active");
        $("#fairyContent").hide();
        $("#learnContent").hide();
        $("#moodContent").show();
    });
});

function goBlog(obj) {
    window.open("../fairy/page/"+obj+".html");
}