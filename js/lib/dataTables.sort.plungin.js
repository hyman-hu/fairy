/**
 * Created by Cassie on 2017/10/26.
 */

jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "html-key-desc": function (a, b) {                //正序排序引用方法
        var x, y;
        a = String(a).replace(/<[\s\S]*?>/g, "");    //去除html标记
        a = a.replace(/&amp;nbsp;/ig, "");                   //去除空格
        b = String(b).replace(/<[\s\S]*?>/g, "");    //去除html标记
        b = b.replace(/&amp;nbsp;/ig, "");                   //去除空格

        if (a == "On/Start") {
            x = 6;
        }
        if (b == "On/Start") {
            y = 6;
        }
        if (a == "ACC") {
            x = 5;
        }
        if (b == "ACC") {
            y = 5;
        }
        if (a == "OFF") {
            x = 4;
        }
        if (b == "OFF") {
            y = 4;
        }
        if (a == "IGN") {
            x = 3;
        }
        if (b == "IGN") {
            y = 3;
        }
        if (a == "-") {
            x = 2;
        }
        if (b == "-") {
            y = 2;
        }
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    },

    "html-key-asc": function (a, b) {                //倒序排序引用方法
        var x, y;
        a = String(a).replace(/<[\s\S]*?>/g, "");    //去除html标记
        a = a.replace(/&amp;nbsp;/ig, "");                   //去除空格
        b = String(b).replace(/<[\s\S]*?>/g, "");    //去除html标记
        b = b.replace(/&amp;nbsp;/ig, "");                   //去除空格

        if (a == "On/Start") {
            x = 6;
        }
        if (b == "On/Start") {
            y = 6;
        }
        if (a == "ACC") {
            x = 5;
        }
        if (b == "ACC") {
            y = 5;
        }
        if (a == "OFF") {
            x = 4;
        }
        if (b == "OFF") {
            y = 4;
        }
        if (a == "IGN") {
            x = 3;
        }
        if (b == "IGN") {
            y = 3;
        }
        if (a == "-") {
            x = 2;
        }
        if (b == "-") {
            y = 2;
        }
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }
});

jQuery.fn.dataTableExt.aTypes.push(function (sData) {
    if (sData) {
        return "html-key";
    }
    return null;
});