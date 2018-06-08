/**
 *
 */
$(document).ready(function () {
    /**
     * Fairy 数据 初始化
     */
    let tabFairy = $("#fairyTab tbody");//获取tab
    for (let i = 0; i < FairyBlog.length; i++) {
        tabFairy.append("<tr class='blogLink'><td><span class='text-primary' onclick='goBlog(this)'>" + FairyBlog[i].article + "</span></td>" +
            "<td>" + FairyBlog[i].content + "</td>" +
            "<td>" + FairyBlog[i].date + "</td></tr>");
    }
    $("#fairyTab").bootstrapTable({});
    /**
     * Learn 数据初始化
     */
    let tabLearn = $("#learnTab tbody");//获取Tab
    for (let i = 0; i < LearnBlog.length; i++) {
        tabLearn.append("<tr class='blogLink'><td><span class='text-primary' onclick='goBlog(this)'>" + LearnBlog[i].article + "</span></td>" +
            "<td>" + LearnBlog[i].content + "</td>" +
            "<td>" + LearnBlog[i].date + "</td></tr>");
    }
    $("#learnTab").bootstrapTable({});
    /**
     * mood 数据初始化
     */
    let tabMood = $("#moodTab tbody");//获取Tab
    for (let i = 0; i < MoodBlog.length; i++) {
        tabMood.append("<tr class='blogLink'><td><span class='text-primary' onclick='goBlog(this)'>" + MoodBlog[i].article + "</span></td>" +
            "<td>" + MoodBlog[i].content + "</td>" +
            "<td>" + MoodBlog[i].date + "</td></tr>");
    }
    $("#moodTab").bootstrapTable({});
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
    window.location.href = "../fairy/page/" + obj.innerHTML + ".html";
}