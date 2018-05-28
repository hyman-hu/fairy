/**
 *
 */

var Page = function ($) {
    "use strict";

    // 私有方法
    var priInitEvents,          // 执行页面事件初始化
        priInitData;            // 执行页面数据初始化

    // 公有方法
    var init;                   // 主要内容区的页面初始化方法 - 参数为CurPage对象


    /**
     * 执行页面事件初始化
     * @param eventFuns 子页面事件相关方法集对象
     */
    priInitEvents = function (eventFuns) {
        for (var func_name in eventFuns) {
            // 循环调用子页面每一个事件方法
            eventFuns[func_name]();
        }
    };
    /**
     * 执行页面数据初始化
     * @param dataFuns 子页面数据相关方法集对象
     */
    priInitData = function (dataFuns) {
        for (var func_name in dataFuns) {
            // 循环调用子页面每一个数据方法
            dataFuns[func_name](function () {
                //显示主要内容区
            //    $(CurPage.main_label).show();
            //    $(".table").css("width","100%");
            });
        }
    };

    /**
     * 主要内容区的页面初始化方法
     * @param CurPage  子页面的CurPage对象
     *
     *
     */
    init = function (CurPage) {
        //设置页面多语言文字 调用common.js中全局
        window.setPageLang(CurPage);
        //执行页面事件初始化
        priInitEvents(CurPage.Event);
        //执行页面数据初始化
        priInitData(CurPage.Data);
    };

    return {
        init: init
    };
}(jQuery);