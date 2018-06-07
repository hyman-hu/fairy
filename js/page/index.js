/**
 *
 */
$(document).ready(function () {
    /**
     * 导航栏点击CSS改变
     */
    $("#fairyLi").click(function () {
        $("#fairyLi").addClass("active");
        $("#learnLi").removeClass("active");
        $("#moodLi").removeClass("active");
        $("#fairyContent").removeClass("hidden");
        $("#fairyContent").addClass("show");
        $("#learnContent").removeClass("show");
        $("#learnContent").addClass("hidden");
        $("#moodContent").removeClass("show");
        $("#moodContent").addClass("hidden");
    });
    /**
     * 导航栏点击CSS改变
     */
    $("#learnLi").click(function () {
        $("#fairyLi").removeClass("active");
        $("#learnLi").addClass("active");
        $("#moodLi").removeClass("active");
        $("#fairyContent").removeClass("show");
        $("#fairyContent").addClass("hidden");
        $("#learnContent").removeClass("hidden");
        $("#learnContent").addClass("show");
        $("#moodContent").removeClass("show");
        $("#moodContent").addClass("hidden");
    });
    /**
     * 导航栏点击CSS改变
     */
    $("#moodLi").click(function () {
        $("#fairyLi").removeClass("active");
        $("#learnLi").removeClass("active");
        $("#moodLi").addClass("active");
        $("#fairyContent").removeClass("show");
        $("#fairyContent").addClass("hidden");
        $("#learnContent").removeClass("show");
        $("#learnContent").addClass("hidden");
        $("#moodContent").removeClass("hidden");
        $("#moodContent").addClass("show");
    });
});

function goBlog(obj) {
    window.open("../fairy/page/"+obj+".html");
}