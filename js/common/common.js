(function (win, $) {
    "use strict";
    /**
     * 是否打印log 使用Global.log 打印logo 可通过isLog开关
     * @param null
     * @returns
     */
    win.Global = {
        //confirm cannel funtion
        confirmCannelFunc: "",
        //是否打印log
        is_log: false,
        //是否为测试状态
        is_test: true,
        //本地测试时使用的URL
        test_url_prefix: "test/",
        //亚马逊URL
        url_amazon: VIG_API,
        //打印使用Global.log()方法
        log: function (str) {
            if (console && Global.is_log) {
                console.log(str);
            }
        },
        layout_map: {
            $content: $("#main_content")
        },
        cur_lang: lang_dic.cn,//這裡可以設置語言切換 目前寫死為繁體
        cur_device_name: "", // 当前选择的设备
        cur_device_id: "", // 当前选择的设备的id
        // 获取屏幕尺寸
        screen_width: document.body.clientWidth

    };

    // 根据是否是本地测试模式，设置接口请求目录
    Global.request_prefix = Global.is_test ? Global.test_url_prefix : Global.url_amazon;

    /**
     * 全局的Ajax执行方法。
     * @param url data传参 isLoading是否遮盖 callback数据处理,循环调用自己 timer直接传间隔时间 单位毫秒ms
     * @returns null
     */
    win.doAjax = function (url, data, callback, isLoading, errcallback, timer, type) {
        var form_data = data,
            token = getCookieValue("token"),
            request_type = "GET";
        //获取完整的URL
        var do_url = Global.request_prefix + url;
        //是否有loading
        if (isLoading) {
            //show loading
            win.openLoading();
        }
        //如果指定为post请求   修改请求类型  并把json对象转化为 字符串
        if ("post" === type) {
            request_type = "POST";
            //json对象转化为 字符串
            form_data = JSON.stringify(form_data);
        }

        $.ajax({
            url: do_url,
            type: request_type,
            /*headers:{
             "x-api-key":token
             },*/
            data: form_data,
            //contentType: "application/json",
            headers: {
                "x-api-key": CF_X_API_KEY
            },
            timeout: 30000,
            success: function (data) {

                //回调处理方法 如果返回为 json字符串   则格式化json字符串为  json对象
                if ("string" === typeof data) {
                    //格式化处理
                    data = JSON.parse(data);
                }
                //回调处理
                callback(data);
                if (isLoading) {
                    //hide loading
                    win.closeLoading();
                }

            },
            error: function (xhr) {
                //2016.9.21 判断是否有回调函数，默认弹出error
                if ("function" === typeof(errcallback)) {
                    errcallback(xhr);
                } else {
                    //写回调时，在开始判断是否是ERROR。
                //    showAlert(Global.cur_lang.err_msg["tx_connect_fail"]);
                }
                if (isLoading) {
                    //hide loading
                    parent.closeLoading();
                }

            },
            complete: function () {
                //循环调用自己
                if (timer) {
                    var task_id = setTimeout("doAjax(" + url + ")", timer);
                }
            }
        });
    };

    /**
     * 全局的Ajax执行方法。
     * @params options options
     * @returns null
     */
    win.newAjax = function (options) {
        // 定义$.ajax需要的参数对象
        var ajaxOptions = {};
        // 如果有传base_url，则用该base_url，否则用Global.url_amazon
        ajaxOptions.url = options.base_url ? options.base_url + options.url : Global.url_amazon + options.url;
        // 根据is_test判断是实际还是测试接口
        ajaxOptions.url = Global.is_test ? "test/" + options.url : ajaxOptions.url;
        // 获取type
        ajaxOptions.type = options.type;
        // 获取data
        if (options.data) {
            ajaxOptions.data = options.data;
        }
        //是否显示loading
        if (options.is_loading) {
            //show loading
            win.openLoading();
        }
        //如果指定为post请求   修改请求类型  并把json对象转化为 字符串
        if (ajaxOptions.type == "POST") {
            //json对象转化为 字符串
            if (ajaxOptions.data) {
                ajaxOptions.data = JSON.stringify(ajaxOptions.data);
            }
        }

        // 重组headers
        // 1. 获取当前时间戳
        var timeStamp = Math.round(new Date().getTime()/1000);
        // 2. 组装公共headers
        var common_headers = {
            "x-api-key": CF_X_API_KEY,
            "Authorization": "Bearer version=3&tstamp=" + timeStamp +
            "&access_token=" + getCookieValue("token"),
            "Content-type":"application/json;charset=utf-8"
        };
        ajaxOptions.headers = $.extend({},common_headers,options.headers);

        // 设置contentType
        //ajaxOptions.contentType = "application/json";
        // 设置timeout
        ajaxOptions.timeout = options.timeout ? options.timeout : 30000;
        // 请求成功回调函数
        ajaxOptions.success = function(data){
            //回调处理方法 如果返回为 json字符串,则格式化json字符串为json对象
            if ("string" === typeof data) {
                //格式化处理
                data = JSON.parse(data);
            }
            //回调处理
            options.successCallback(data);
            if (options.is_loading) {
                //hide loading
                win.closeLoading();
            }
        };
        // 请求失败回调函数
        ajaxOptions.error = function(xhr) {
            // 判断是否有回调函数，默认弹出error
            if ("function" === typeof(errorCallback)) {
                errorCallback(xhr);
            }
        };
        // 完成请求执行
        ajaxOptions.complete = function () {

        };
        // 将ajaxOptions放入$.ajax调用
        $.ajax(ajaxOptions);

    };

    // 页面级的重复请求对象池
    win.Global.page_task_pool = {
        // 请求任务池
        pool: [],
        interval_pool: [],
        timer_pool: [],
        // 加入单个请求任务（实际加入的是 setTimeout 的ID）
        add: function (task) {
            this.pool.push(task);
        },
        // 清空任务池
        clear: function () {
            // 循环处理
            for (var i = 0; i < this.pool.length; i++) {
                clearTimeout(this.pool[i]);
            }
            this.pool = [];
        },
        //加入任务
        addInterval: function (task) {
            this.interval_pool.push(task);
        },
        //清空任务
        clearInterval: function () {
            // 循环处理
            for (var i = 0; i < this.interval_pool.length; i++) {
                window.clearInterval(this.interval_pool[i]);
            }
            this.interval_pool = [];
        },
        // 加入计时请求任务
        addTimer: function (timer_id) {
            this.timer_pool.push(timer_id);
        },
        // 删除计时器
        removeTimer: function () {
            for (var i = 0; i < this.timer_pool.length; i++) {
                $("#" + this.timer_pool[i]).timer("remove");
            }
            this.timer_pool = [];
        }
    };
    /**
     * 关闭confirm框
     * @param val 待验证的值
     * @returns {String} 返回错误字串或true(验证通过)
     */
    /*$("#closeConfirm").on("click",function(){
     //隐藏确认框
     $('#confirmModal').modal("hide");
     if(typeof(Global.confirmCannelFunc) == "function"){
     Global.confirmCannelFunc();
     }
     });*/
    /**
     * confirm modal
     * @param modalOptions modalOptions
     */
    win.showConfirm = function (modalOptions) {
        // 修改confirm框的title显示
        $("#modal_title").html(modalOptions.title);
        //修改confirm框内容显示
        $("#modal_content").html(modalOptions.content);
        modalOptions.cancel && $("#closeConfirm").val(modalOptions.cancel);
        modalOptions.confirm && $("#confirmConfirm").val(modalOptions.confirm);
        //显示confirm框
        $("#confirmModal").modal("show");
        //绑定确认事件
        $("#confirmConfirm").unbind("click").on("click", function () {
        //    $("#closeConfirm").trigger("click");
            modalOptions.confirmFunc();
            $("#confirmModal").modal("hide");
        });
        //绑定取消事件
        if (modalOptions.concelFunc) {
            $("#closeConfirm").unbind("click").on("click", function () {
                $("#confirmModal").modal("hide");
                //modalOptions.concelFunc();
            });
        }
    };
    /**
     * alert框  modal
     * @param content 提示内容
     * @returns null
     */
    win.showAlert = function (content) {
        //修改内容显示
        $("#alertModal p").html(content);
        //显示alert框
        $("#alertModal").modal("show");
    };
    win.closeAlert = function (content) {
        //隐藏alert框
        $("#alertModal").modal("hide");
    };
    win.openLoading = function () {
        $("#loadingModal").modal("show");
    };
    win.closeLoading = function () {
        $("#loadingModal").modal("hide");
        $("#loadingModal").css("display", "none");
    };

    win.openContentModal = function (content_data) {
        $("#contentModal .content").html(content_data);
        $("#contentModal").modal("show");
    };
    win.closeContentModal = function () {
        $("#contentModal").modal("hide");
    };


    /**添加设置cookie**/
    win.addCookie = function (name, value, days, path) {
        var name = escape(name);
        var value = escape(value);
        var expires = new Date();
        expires.setTime(expires.getTime() + days * 3600000 * 24);
        //path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用
        path = path == "" ? "" : ";path=" + path;
        //GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是UTC
        //参数days只能是数字型
        var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();
        document.cookie = name + "=" + value + _expires + path;
    };

    /**根据cookie的键，删除cookie，其实就是设置其失效**/
    win.deleteCookie = function (cookie_name, path) {
        var name = escape(cookie_name);
        var expires = new Date(0);
        path = path == "" ? "" : ";path=" + path;
        document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
    };

    /**获取cookie的值，根据cookie的键获取值**/
    win.getCookieValue = function (cookie_name) {
        //用处理字符串的方式查找到key对应value
        var name = escape(cookie_name);
        //读cookie属性，这将返回文档的所有cookie
        var allcookies = document.cookie;
        //查找名为name的cookie的开始位置
        name += "=";
        var pos = allcookies.indexOf(name);
        //如果找到了具有该名字的cookie，那么提取并使用它的值
        if (pos != -1) {                                             //如果pos值为-1则说明搜索"version="失败
            var start = pos + name.length;                  //cookie值开始的位置
            var end = allcookies.indexOf(";", start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
            if (end == -1) {
                end = allcookies.length;
            }       //如果end值为-1说明cookie列表里只有一个cookie
            var value = allcookies.substring(start, end); //提取cookie的值
            return (value);                           //对它解码
        } else {
            //搜索失败，返回空字符串
            return "";
        }
    };

    //將時間轉換為時間戳 格式 dd MM yyyy - hh:ii
    win.getTimestamp = function (stringTime) {
        var timestamp2 = Date.parse(new Date(stringTime));
        timestamp2 = timestamp2 / 1000;
        console.log(stringTime + "的时间戳为：" + timestamp2);
        return timestamp2;

    };

    win.getDate = function (timestamp2) {
        var my_date = new Date(timestamp2 * 1000);
        var tt = my_date.getDate() + " " + (my_date.getMonth() + 1) + " " +
            my_date.getFullYear() + " - " +
            my_date.getHours() + ":" +
            my_date.getMinutes();
        return tt;
    };

    /**
     * 设置页面多语言文字
     * @param CurPage 子页面的CurPage对象
     *
     */
    win.setPageLang = function (CurPage) {
        var lang_select = "input[data-tx-lang]," +
            "span[data-tx-lang]," +
            "div[data-tx-lang]," +
            "p[data-tx-lang]," +
            "a[data-tx-lang]," +
            "h3[data-tx-lang]," +
            "button[data-tx-lang]," +
            "h4[data-tx-lang]," +
            "b[data-tx-lang]," +
            "th[data-tx-lang]";
        //保存需要 设置语言的容器
        var moduleSelector = CurPage.main_label;
        //确认
        var cur_page = CurPage.module;
        $(moduleSelector).find(lang_select).each(function () {
            // 保存当前元素
            var $this = $(this),
                cur_lang_attr = $this.attr("data-tx-lang"),
                this_val = lang_dic.cn[cur_page][cur_lang_attr];
            switch ($this[0].localName) {
            case "input":
                if ("button" === $this[0].type) {
                    $this.val(this_val);
                } else if ("" === $this[0].placeholder && "text" === $this[0].type) {
                    $this.attr("placeholder", this_val);
                }
                break;
            case "span":
                $this.html(this_val);
                break;
            case "div":
                $this.html(this_val);
                break;
            case "p":
                $this.html(this_val);
                break;
            case "button":
                $this.html(this_val);
                break;
            case "a":
                $this.html(this_val);
                break;
            case "h3":
                $this.html(this_val);
                break;
            case "h4":
                $this.html(this_val);
                break;
            case "b":
                $this.html(this_val);
                break;
            case "th":
                $this.html(this_val);
                break;
            default:
                break;
            }
        });
    };

    win.scrollTop = function () {
        // 考虑到浏览器兼容性，需要对html和body都进行处理
        if ($("html").scrollTop() > 0) {
            $("html").animate({
                "scrollTop": 0
            });
        } else {
            if ($("body").scrollTop() > 0) {
                $("body").animate({
                    "scrollTop": 0
                });
            }
        }
    };

})(window, jQuery);
