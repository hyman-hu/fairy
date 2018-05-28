/**************************
 * echarts使用相关处理
 * 1. 实时网络状态折线图
 * 2. 实时CPU占用状态折线图
 * 3. 实时RAM占用状态折线图
 * 4. 终端用户状态饼图
 * 5. 终端用户列表
 * ***********************/

var charts_view_utils = (function () {
    // 定义变量
    var initVehicleSpeed, initCpuCharts, initEventCharts;

    /**
     * 初始化网络状态图
     * @param options
     *        options.upload_data
     *        options.download_data
     *        options.wrap_obj
     * */
    initVehicleSpeed = function (options) {
        // 1. 定义变量和初始化变量
        var network_chart,
            default_options = {
                wrap_obj: $("#vehicle_speed")[0]
            };
        // 2. 合并参数
        options = $.extend({}, default_options, options);
        // 3. 初始化echarts实例
        network_chart = echarts.init(options.wrap_obj);
        // 4. 配置图标参数
        var option = {
            // 网格的配置
            grid: {
                left: "11%",
                right: "4%",
                top: 40,
                bottom: 40
            },
            // 提示框组件的配置
            tooltip: {
                trigger: "axis",
                backgroundColor: "rgba(10, 36, 51, 0.8)",
                axisPointer: {
                    type: "cross",
                    lineStyle: {
                        color: "#d8d8d9",
                        width: 1,
                        type: "dashed"
                    }
                },
                textStyle: {
                    fontFamily: "'rutledgeregular', 'sans-serif'"
                }
            },
            // X轴线的配置
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: [],
                axisLine: { // 坐标轴轴线相关设置。
                    lineStyle: {
                        color: "7198bd",
                        width: 1
                    }
                },
                axisLabel: { // 坐标轴刻度标签的相关设置。
                    textStyle: {
                        fontFamily: "'rutledgeregular', sans-serif",
                        fontSize: 12,
                        color: "#7198bd"
                    }
                }
            },
            // Y轴线的配置
            yAxis: {
                type: "value",
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#7198bd",
                        width: 1,
                        type: "solid"
                    }
                },
                axisLabel: {
                    formatter: "{value}",
                    textStyle: {
                        fontFamily: "'rutledgeregular', sans-serif",
                        fontSize: 12,
                        color: "#7198bd"
                    }
                }
            },
            // 系列列表配置
            series: function () {
                var wrap = [],
                    highest_data = {},
                    lowest_data = {};
                // 图标标注
                var mark_point = {
                    symbolSize: 75,
                    label: {
                        normal: {
                            show: true,
                            formatter: "{c}"
                        }
                    }
                };
                highest_data.name = "High";
                highest_data.type = "line";
                //upload.areaStyle = {normal: {}};
                highest_data.markPoint = mark_point;
                highest_data.data = options.highest_data;
                highest_data.itemStyle = {
                    normal: {
                        color: "#626fee"
                    }
                };
                lowest_data.name = "Low";
                lowest_data.type = "line";
                //download.areaStyle = {normal: {}};
                lowest_data.markPoint = mark_point;
                lowest_data.data = options.lowest_data;
                lowest_data.itemStyle = {
                    normal: {
                        color: "#f8da69"
                    }
                };
                wrap.push(highest_data);
                wrap.push(lowest_data);
                return wrap;
            }()
        };
        // 使用指定的配置项和数据显示图表。
        network_chart.setOption(option);

        window.addEventListener("resize", function () {
            network_chart.resize();
        });
    };


    /**
     * 初始化CPU状态图
     * @param options
     *        options.wrap_obj
     *        options.cpu_usage
     * */


    initEventCharts = function (options) {
        // 1. 定义变量和初始化变量
        var my_chart,
            default_options = {
                wrap_obj: $("#events_statistic")[0]
            };
        // 2. 合并参数
        options = $.extend({}, default_options, options);

        // 3. 基于准备好的dom，初始化echarts实例
        my_chart = echarts.init(options.wrap_obj);

        // 4. 配置图标参数
        var option = {
            color: ["#15d5ee"],
            tooltip : {
                trigger: "axis",
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : "shadow"        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: "11%",
                right: "4%",
                top: 40,
                bottom: 40
            },
            xAxis : [
                {
                    type : "category",
                    data : options.date_data,
                    axisLine: { // 坐标轴轴线相关设置。
                        lineStyle: {
                            color: "#7198bd",
                            width: 1
                        }
                    },
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : "value",
                    splitLine: {
                        show: false
                    },
                    axisLine: { // 坐标轴轴线相关设置。
                        lineStyle: {
                            color: "#7198bd",
                            width: 1
                        }
                    }
                }
            ],
            series : [
                {
                    name:"Event",
                    type:"bar",
                    barWidth: "60%",
                    data:options.event_data
                }
            ]
        };
        // 5. 使用刚指定的配置项和数据显示图表。
        my_chart.setOption(option);

        window.addEventListener("resize", function () {
            my_chart.resize();
        });
    };





    return {
        initVehicleSpeed: initVehicleSpeed,
        initCpuCharts: initCpuCharts,
        initEventCharts: initEventCharts
    };

})();
