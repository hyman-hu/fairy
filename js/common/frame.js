/**
 *
 */

var Frame = (function ($) {
    "use strict";
    //私有方法
    var priInitEvents,
        priInitData;

    //公共方法
    var init,
        loadPageContent,
        setPageHeightAuto;

    /**
     * 初始化页面框架的事件
     */
    priInitEvents = function () {
        // 绑定侧边菜单的切换按钮
        $(".collapse-left").on("click", function(){
            // 获取左边菜单元素
            var $menu_left = $("#menu_left");
            // 切换左边菜单，显示或隐藏
            classie.toggle(document.getElementById("menu_left"), "menu-close");
            // 判断当前的菜单是关闭还是展开状态，来改变小图标的放方向
            if($menu_left.hasClass("menu-close")) {
                $(".collapse-left span").removeClass("glyphicon-triangle-left").addClass("glyphicon-triangle-right");
            }else {
                $(".collapse-left span").removeClass("glyphicon-triangle-right").addClass("glyphicon-triangle-left");
            }
        });
        // 绑定左边菜单的点击事件
        $(".menu-list").on("click", "li", function(){
            // 获取当前被点击的元素
            var $this = $(this);
            // 先移除左边所有菜单项的Class active
            $(".menu-list li").removeClass("active");
            // 在向当前点击的元素添加Class
            $this.addClass("active");
            // 若当前点击的是设备列表项，则触发侧边菜单的切换按钮的点击事件，关闭侧边菜单
            if($this.attr("id") === "device_list") {
                //$(".collapse-left").trigger("click");
                $("#menu_left").addClass("menu-close");
                $(".collapse-left span").removeClass("glyphicon-triangle-left").addClass("glyphicon-triangle-right");
            }
            // 根据点击的内容加载相应的页面
            loadPageContent("page/" + $this.attr("attr-page") + ".html","#main_content");
        });

        // 绑定左边菜单的点击事件
        $(".js-nav-menu").on("click", "li", function(){
            $("#main_content").removeClass("hide");
            $("#single_content").addClass("hide");
            // 获取当前被点击的元素
            var $this = $(this);
            // 先移除左边所有菜单项的Class active
            $(".js-nav-menu li").removeClass("active");
            // 在向当前点击的元素添加Class
            $this.addClass("active");
            // 根据点击的内容加载相应的页面
            loadPageContent("page/" + $this.attr("attr-page") + ".html","#main_content");
        });

        $(".head-tab").on("click", "li", function () {
            var $this = $(this);
            // 先移除tab项的Class active
            $(".head-tab li").removeClass("active");
            // 在向当前点击的元素添加Class
            $this.addClass("active");
            // 根据点击的内容加载相应的页面
            loadPageContent("page/" + $this.attr("attr-page") + ".html","#tab_content");
        });

        // document.body.clientWidth大于768，用PC端点击方式加载，否则直接加载
        //if (Global.screen_width <= 768) {
        //    loadPageContent("page/status.html","#status_content");
        //    loadPageContent("page/history.html","#history_content");
        //}

        $("#device_list_link").on("click", function () {
            // 隐藏当前页面
            $("#single_content").addClass("hide");
            // 显示list页面
            $("#main_content").removeClass("hide");
            // 显示侧边菜单
            $("#menu_left").removeClass("hide");
            // 触发点击head-tab第一个li的事件
            // $(".head-tab li:eq(0)").trigger("click");
        });
        $(".nav-show").on("click", function () {
            var $this = $(this);

            if($this.hasClass("active")){
                $this.removeClass("active");
                $(".nav-menu").removeClass("active");
            }else {
                $this.addClass("active");
                $(".nav-menu").addClass("active");
            }
        });
        $(".nav-secondary-show, .icon-down").on("click", function () {
            var $this = $(this);

            if($this.hasClass("active")){
                $this.removeClass("active");
                $(".nav-secondary").addClass("hide");
            }else {
                $this.addClass("active");
                $(".nav-secondary").removeClass("hide");
            }
        });
    };

    /**
     * 初始化页面数据
     * @param callback
     */
    priInitData = function () {

    };

    /**
     * 加载内容区
     * @param url 加载的路径
     * @param content_id 要加载的容器
     * @param cb
     * */
    loadPageContent = function (url,content_id, cb) {
        //获取主要内容区的页面对象
        var $content = $(content_id);
        //清除子页面定时任务
        Global.page_task_pool.clear();
        //删除子页面计时器定时任务
        Global.page_task_pool.removeTimer();
        //清除子页面 setInterval任务
        Global.page_task_pool.clearInterval();
        //隐藏主要内容区
        //$content.hide();
        // 设置滚动条
        scrollTop();
        //加载页面到主要内容区
        $content.load(url, cb);
    };

    /**
     * 初始化页面框架
     * @param callback
     */
    init = function () {
        if(!getCookieValue("token")){
            //window.top.location.href = "login.html";
            return;
        }
        var Page = {
            main_label: "body",
            module: "main"
        };
        //初始化语言 请求common.js中的 全局方法
        window.setPageLang(Page);
        //初始化页面框架的事件
        priInitEvents();
        //初始化页面框架数据
        // priInitData();

        //默认第一次进界面显示landing page页面
        $(".js-nav-menu li:eq(0)").trigger("click");

        $(window).on("resize", Frame.setPageHeightAuto);

    };


    /**
     * 设置页面高度自适应 - 设置左侧菜单的最小高度
     */
    setPageHeightAuto = function () {
        // 1. 左侧菜单的最小高度 = 浏览器可视部分高度 - 页面顶部header的外部高度 - 页面顶部nav的外部高度
        var left_menu_min_height = $(window).height() - $("#main_header").outerHeight(true);
        // 2. 如果计算值小于0，设置为0
        if (left_menu_min_height < 0) {
            left_menu_min_height = 0;
        }
        // 3. 设置左侧菜单的最小高度（设置在ul标签上）
        $(".nav-menu > ul").css("minHeight", left_menu_min_height);

        // 3. 设置map的最小高度
        $("#map").css("height", left_menu_min_height);
    };

    return {
        init: init,
        loadPageContent: loadPageContent,
        setPageHeightAuto: setPageHeightAuto
    };
})(jQuery);