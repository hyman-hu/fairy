/**
 * Created by Andy Lei on 2017/8/17.
 * e-mail:andy_lei@askey.com.tw
 */

var FormatData = (function () {
    "use strict";

    //定义私有方法名
    var priUserDataConstructor,
        priJsonSortUp,
        priJsonSortDown,
        priNodeDataConstructor,

        priDeviceDataConstructor;
    //定义公共方法名
    var formatUserTableData,
        formatNodeData,
        formatNodeTableData,
        formatToFixed,
        formatBytes,
        formatDataToMb,
        formatMinsToDate,
        sortKeyStatusData,
        sortDoorStatusData,
        sortTowEventData;

    sortKeyStatusData = function (json_data) {


        for (var i=0; i<json_data.length; i++) {
            var key_mark = json_data[i]["keyMark"];



        }
    };


    //提供给sreach user datatables的可用数据的 构造器函数
    priUserDataConstructor = function (no, name, phone, account, count, id) {
        this.no = no;
        this.name = name;
        this.phone = phone;
        this.account = account;
        this.count = count;
        this.id = id;
    };

    priDeviceDataConstructor = function (device_name, up_time, key_status, door, tow_event) {
        this.device_name = device_name;
        this.up_time = up_time;
        this.key_status = key_status;
        this.door = door;
        this.tow_event = tow_event;
    };


    //提供给node table的数据的 构造器函数
    priNodeDataConstructor = function (no, name, up_speed, down_speed, client_count, mac_addr, rssi, device_id) {
        this.no = no;
        this.name = name;
        this.up_speed = up_speed;
        this.down_speed = down_speed;
        this.client_count = client_count;
        this.mac_addr = mac_addr;
        this.rssi = rssi;
        this.device_id = device_id;
    }

    //对json数据按照某key值进行排序  升序
    priJsonSortUp = function (json, key) {
        if (!json) return;
        for (var j = 1, jl = json.length; j < jl; j++) {
            var temp = json[j],
                val = temp[key],
                i = j - 1;

            while (i >= 0 && json[i][key] > val) {
                json[i + 1] = json[i];
                i = i - 1;
            }
            json[i + 1] = temp;

        }
        return json;
    }

    //对json数据按照某key值进行排序  降序
    priJsonSortDown = function (json, key) {
        if (!json) return;
        for (var j = 1, jl = json.length; j < jl; j++) {
            var temp = json[j],
                val = temp[key],
                i = j - 1;

            while (i >= 0 && json[i][key] < val) {
                json[i + 1] = json[i];
                i = i - 1;
            }
            json[i + 1] = temp;

        }
        return json;
    }

    //格式化用户列表数据  格式化为 datatables可以用的数据
    formatUserTableData = function (data) {
        //按照注册日期排序
        var sorted_data = priJsonSortUp(data.userInfo, "createTime");
        //初始化数组
        var formatted_data = [];
        for (var x in sorted_data) {
            //提取本次循环的数据
            var cur_item = sorted_data[x];
            //首先保存可用的mesh信息
            Global.all_mesh_list.push({
                userName: cur_item.userName,
                userId: cur_item.userId,
                meshInfo: cur_item.meshInfo
            });
            //临时保存 本次数据
            var cur_data = new priUserDataConstructor(x * 1 + 1, cur_item.userName, cur_item.phone,
                cur_item.account, cur_item.meshInfo.length, x * 1);
            //格式化后 填充 到数组中
            formatted_data.push(cur_data);
        }
        //	formatted
        return formatted_data;
    }
    //格式化node数据  因为返回的node数据并没有按照主次 node排序。现在把主node放在第一位
    formatNodeData = function (data) {
        //对json数据进行降序
        var sorted_data = priJsonSortDown(data.node, "isMaster");
        //返回处理过的数据
        return sorted_data;
    }

    formatNodeTableData = function (data, old_data) {
        //todo phase 2 会改成前端计算， 目前改回后端计算 up down data
        //对json数据进行降序 主node放第一位
        var sorted_data = priJsonSortDown(data, "isMaster");
        //对老数据进行降序操作，保证一致
        var sorted_old_data = priJsonSortDown(old_data, "isMaster"),
            cur_item = "",
            cur_old_item = "",
            cur_data = "";
        //初始化数组
        var formatted_data = [];
        if ("" !== old_data) {
            //循环遍历处理数据
            for (var x in sorted_data) {
                //提取本次循环的数据
                cur_item = sorted_data[x];
                cur_old_item = sorted_old_data[x];
                //构造每次push的数据
                cur_data = new priNodeDataConstructor(x * 1 + 1, cur_item.nodeName,formatBytes(cur_item.upData,"",true)+"/S",
                    formatBytes(cur_item.downData,"",true)+"/S", cur_item.clientNum, cur_item.macAddress, cur_item.rssi, cur_item.deviceId);
                //格式化后 填充 到数组中
                formatted_data.push(cur_data);
            }
        } else {
            //循环遍历处理数据
            for (var x in sorted_data) {
                //提取本次循环的数据
                cur_item = sorted_data[x];
                //构造每次push的数据
                cur_data = new priNodeDataConstructor(x * 1 + 1, cur_item.nodeName, formatBytes(cur_item.upData,"",true)+"/S",
                    formatBytes(cur_item.downData,"",true)+"/S",cur_item.clientNum, cur_item.macAddress, cur_item.rssi,
                    cur_item.deviceId);
                //格式化后 填充 到数组中
                formatted_data.push(cur_data);
            }
        }

        return formatted_data;
    }


    /**
     * 取小数点后n位
     * */
    formatToFixed = function (val, n) {
        var num = new Number(val);
        return num.toFixed(n);
    };


    /**
     * 动态处理bytes
     * @param data 要处理的数据值
     * @param size 要保留的小数
     * @param suffix_flg 是否需要加上后缀
     * */
    formatBytes = function (data, size, suffix_flg) {
        var result_kb, result_mb, result_gb;

        // 获取以KB为单位的数据值
        result_kb = data / 1024;
        // 获取以MB为单位的数据值
        result_mb = result_kb / 1024;
        // 若该值小于1，则返回以KB为单位的数据
        if (result_mb < 1) {
            if (suffix_flg) {
                return formatToFixed(result_kb, 0) + "KB";
            } else {
                return formatToFixed(result_kb, 0);
            }
        }
        // 获取以GB为单位的数据值
        result_gb = result_mb / 1024;
        // 若该值小于1，则返回以MB为单位的数据
        if (result_gb < 1) {
            if (suffix_flg) {
                return formatToFixed(result_mb, 1) + "MB";
            } else {
                return formatToFixed(result_mb, 1);
            }
        }

        // 返回以GB为单位的数据
        if (suffix_flg) {
            return formatToFixed(result_gb, 1) + "GB";
        } else {
            return formatToFixed(result_gb, 1);
        }
    }

    /**
     * 将数据转化为MB为单位
     * @param data 要处理的数据
     * @param size 保留小数点后的位数
     * */
    formatDataToMb = function (data, size) {
        return formatToFixed(data / (1024 * 1024), size);
    };

    //转化秒为日期
    formatMinsToDate = function (s) {
        var t;
        if (s > -1) {
            var hour = Math.floor(s / 3600);
            var min = Math.floor(s / 60) % 60;
            var sec = s % 60;
            var day = parseInt(hour / 24);
            if (day > 0) {
                hour = hour - 24 * day;
                t = day + "day " + hour + ":";
            }
            else t = hour + ":";
            if (min < 10) {
                t += "0";
            }
            t += min + ":";
            if (sec < 10) {
                t += "0";
            }
            t += sec;
        }
        return t;
    };

    return {
        formatUserTableData: formatUserTableData,
        formatNodeData: formatNodeData,
        formatNodeTableData: formatNodeTableData,
        formatToFixed: formatToFixed,
        formatBytes: formatBytes,
        formatDataToMb: formatDataToMb,
        formatMinsToDate: formatMinsToDate
    }
})(jQuery);