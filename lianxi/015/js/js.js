$(function() {

    $.post('https://www.tianqiapi.com/api?version=epidemic&appid=66218431&appsecret=4EbBls7s', { async: false }, function(e) {
        yqinfo = e.data
        $('#quezhen').html(yqinfo.diagnosed)
        $('#death').html(yqinfo.death)
        console.log(e.data)
        map(yqinfo);
        echarts_1(yqinfo);
        echarts_2();
        echarts_4(yqinfo);
        echarts_31();
        echarts_32();
        echarts_33();
        echarts_5();
        echarts_6();
    })

    function echarts_1(yqinfo) {
        console.log('拿到数据')
        console.log(yqinfo)

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart1'));

        option = {
            //  backgroundColor: '#00265f',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '0%',
                top: '10px',
                right: '0%',
                bottom: '4%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['商超门店', '教育培训', '房地产', '生活服务', '汽车销售', '旅游酒店', '五金建材'],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                        width: 1,
                        type: "solid"
                    },
                },

                axisTick: {
                    show: false,
                },
                axisLabel: {
                    interval: 0,
                    // rotate:50,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    //formatter: '{value} %'
                    show: true,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1 )",
                        width: 1,
                        type: "solid"
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                    }
                }
            }],
            series: [{
                    type: 'bar',
                    data: [200, 300, 300, 900, 1500, 1200, 600],
                    barWidth: '35%', //柱子宽度
                    // barGap: 1, //柱子之间间距
                    itemStyle: {
                        normal: {
                            color: '#2f89cf',
                            opacity: 1,
                            barBorderRadius: 5,
                        }
                    }
                }

            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }

    // 生成地图
    function map_1(yqinfo) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map_1'));
        var data = [];

        for (var i = 0; i < yqinfo.area.length; i++) {
            for (var a = 0; a < yqinfo.area[i].cities.length; a++) {
                b = new Object()
                b.name = yqinfo.area[i].cities[a].cityName
                b.value = yqinfo.area[i].cities[a].confirmedCount
                data.push(b)
            }
            // data[i].confirmedCount = yqinfo.area[i].confirmedCount
            // data[i].curedCount = yqinfo.area[i].curedCount
            // data[i].deadCount = yqinfo.area[i].deadCount
        }
        console.log('地区数据')
        console.log(data)
        var geoCoordMap = {
            '海门': [121.15, 31.89],
            '鄂尔多斯': [109.781327, 39.608266],
            '招远': [120.38, 37.35],
            '舟山': [122.207216, 29.985295],
            '齐齐哈尔': [123.97, 47.33],
            '盐城': [120.13, 33.38],
            '赤峰': [118.87, 42.28],
            '青岛': [120.33, 36.07],
            '乳山': [121.52, 36.89],
            '金昌': [102.188043, 38.520089],
            '泉州': [118.58, 24.93],
            '莱西': [120.53, 36.86],
            '日照': [119.46, 35.42],
            '胶南': [119.97, 35.88],
            '南通': [121.05, 32.08],
            '拉萨': [91.11, 29.97],
            '云浮': [112.02, 22.93],
            '梅州': [116.1, 24.55],
            '文登': [122.05, 37.2],
            '上海': [121.48, 31.22],
            '攀枝花': [101.718637, 26.582347],
            '威海': [122.1, 37.5],
            '承德': [117.93, 40.97],
            '厦门': [118.1, 24.46],
            '汕尾': [115.375279, 22.786211],
            '潮州': [116.63, 23.68],
            '丹东': [124.37, 40.13],
            '太仓': [121.1, 31.45],
            '曲靖': [103.79, 25.51],
            '烟台': [121.39, 37.52],
            '福州': [119.3, 26.08],
            '瓦房店': [121.979603, 39.627114],
            '即墨': [120.45, 36.38],
            '抚顺': [123.97, 41.97],
            '玉溪': [102.52, 24.35],
            '张家口': [114.87, 40.82],
            '阳泉': [113.57, 37.85],
            '莱州': [119.942327, 37.177017],
            '湖州': [120.1, 30.86],
            '汕头': [116.69, 23.39],
            '昆山': [120.95, 31.39],
            '宁波': [121.56, 29.86],
            '湛江': [110.359377, 21.270708],
            '揭阳': [116.35, 23.55],
            '荣成': [122.41, 37.16],
            '连云港': [119.16, 34.59],
            '葫芦岛': [120.836932, 40.711052],
            '常熟': [120.74, 31.64],
            '东莞': [113.75, 23.04],
            '河源': [114.68, 23.73],
            '淮安': [119.15, 33.5],
            '泰州': [119.9, 32.49],
            '南宁': [108.33, 22.84],
            '营口': [122.18, 40.65],
            '惠州': [114.4, 23.09],
            '江阴': [120.26, 31.91],
            '蓬莱': [120.75, 37.8],
            '韶关': [113.62, 24.84],
            '嘉峪关': [98.289152, 39.77313],
            '广州': [113.23, 23.16],
            '延安': [109.47, 36.6],
            '太原': [112.53, 37.87],
            '清远': [113.01, 23.7],
            '中山': [113.38, 22.52],
            '昆明': [102.73, 25.04],
            '寿光': [118.73, 36.86],
            '盘锦': [122.070714, 41.119997],
            '长治': [113.08, 36.18],
            '深圳': [114.07, 22.62],
            '珠海': [113.52, 22.3],
            '宿迁': [118.3, 33.96],
            '咸阳': [108.72, 34.36],
            '铜川': [109.11, 35.09],
            '平度': [119.97, 36.77],
            '佛山': [113.11, 23.05],
            '海口': [110.35, 20.02],
            '江门': [113.06, 22.61],
            '章丘': [117.53, 36.72],
            '肇庆': [112.44, 23.05],
            '大连': [121.62, 38.92],
            '临汾': [111.5, 36.08],
            '吴江': [120.63, 31.16],
            '石嘴山': [106.39, 39.04],
            '沈阳': [123.38, 41.8],
            '苏州': [120.62, 31.32],
            '茂名': [110.88, 21.68],
            '嘉兴': [120.76, 30.77],
            '长春': [125.35, 43.88],
            '胶州': [120.03336, 36.264622],
            '银川': [106.27, 38.47],
            '张家港': [120.555821, 31.875428],
            '三门峡': [111.19, 34.76],
            '锦州': [121.15, 41.13],
            '南昌': [115.89, 28.68],
            '柳州': [109.4, 24.33],
            '三亚': [109.511909, 18.252847],
            '自贡': [104.778442, 29.33903],
            '吉林': [126.57, 43.87],
            '阳江': [111.95, 21.85],
            '泸州': [105.39, 28.91],
            '西宁': [101.74, 36.56],
            '宜宾': [104.56, 29.77],
            '呼和浩特': [111.65, 40.82],
            '成都': [104.06, 30.67],
            '大同': [113.3, 40.12],
            '镇江': [119.44, 32.2],
            '桂林': [110.28, 25.29],
            '张家界': [110.479191, 29.117096],
            '宜兴': [119.82, 31.36],
            '北海': [109.12, 21.49],
            '西安': [108.95, 34.27],
            '金坛': [119.56, 31.74],
            '东营': [118.49, 37.46],
            '牡丹江': [129.58, 44.6],
            '遵义': [106.9, 27.7],
            '绍兴': [120.58, 30.01],
            '扬州': [119.42, 32.39],
            '常州': [119.95, 31.79],
            '潍坊': [119.1, 36.62],
            '重庆': [106.54, 29.59],
            '台州': [121.420757, 28.656386],
            '南京': [118.78, 32.04],
            '滨州': [118.03, 37.36],
            '贵阳': [106.71, 26.57],
            '无锡': [120.29, 31.59],
            '本溪': [123.73, 41.3],
            '克拉玛依': [84.77, 45.59],
            '渭南': [109.5, 34.52],
            '马鞍山': [118.48, 31.56],
            '宝鸡': [107.15, 34.38],
            '焦作': [113.21, 35.24],
            '句容': [119.16, 31.95],
            '北京': [116.46, 39.92],
            '徐州': [117.2, 34.26],
            '衡水': [115.72, 37.72],
            '包头': [110, 40.58],
            '绵阳': [104.73, 31.48],
            '乌鲁木齐': [87.68, 43.77],
            '枣庄': [117.57, 34.86],
            '杭州': [120.19, 30.26],
            '淄博': [118.05, 36.78],
            '鞍山': [122.85, 41.12],
            '溧阳': [119.48, 31.43],
            '库尔勒': [86.06, 41.68],
            '安阳': [114.35, 36.1],
            '开封': [114.35, 34.79],
            '济南': [117, 36.65],
            '德阳': [104.37, 31.13],
            '温州': [120.65, 28.01],
            '九江': [115.97, 29.71],
            '邯郸': [114.47, 36.6],
            '临安': [119.72, 30.23],
            '兰州': [103.73, 36.03],
            '沧州': [116.83, 38.33],
            '临沂': [118.35, 35.05],
            '南充': [106.110698, 30.837793],
            '天津': [117.2, 39.13],
            '富阳': [119.95, 30.07],
            '泰安': [117.13, 36.18],
            '诸暨': [120.23, 29.71],
            '郑州': [113.65, 34.76],
            '哈尔滨': [126.63, 45.75],
            '聊城': [115.97, 36.45],
            '芜湖': [118.38, 31.33],
            '唐山': [118.02, 39.63],
            '平顶山': [113.29, 33.75],
            '邢台': [114.48, 37.05],
            '德州': [116.29, 37.45],
            '济宁': [116.59, 35.38],
            '荆州': [112.239741, 30.335165],
            '宜昌': [111.3, 30.7],
            '义乌': [120.06, 29.32],
            '丽水': [119.92, 28.45],
            '洛阳': [112.44, 34.7],
            '秦皇岛': [119.57, 39.95],
            '株洲': [113.16, 27.83],
            '石家庄': [114.48, 38.03],
            '莱芜': [117.67, 36.19],
            '常德': [111.69, 29.05],
            '保定': [115.48, 38.85],
            '湘潭': [112.91, 27.87],
            '金华': [119.64, 29.12],
            '岳阳': [113.09, 29.37],
            '长沙': [113, 28.21],
            '衢州': [118.88, 28.97],
            '廊坊': [116.7, 39.53],
            '菏泽': [115.480656, 35.23375],
            '合肥': [117.27, 31.86],
            '武汉': [114.31, 30.52],
            '大庆': [125.03, 46.58]
        };
        var convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            console.log('=====================')
            console.log(res)
            return res;
        };

        option = {
            // backgroundColor: '#404a59',
            title: {
                text: '全国疫情地图',
                // subtext: 'data from PM25.in',
                // sublink: 'http://www.pm25.in',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                // formatter: function(params) {
                //     if (typeof(params.value)[2] == "undefined") {
                //         return params.name + ' : ' + params.value;
                //     } else {
                //         return params.name + ' : ' + params.value[2];
                //     }
                // }
            },

            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: false, //禁止其放大缩小
                itemStyle: {
                    normal: {
                        areaColor: '#4c60ff',
                        borderColor: '#002097'
                    },
                    emphasis: {
                        areaColor: '#293fff'
                    }
                }
            },
            series: [{
                    name: '消费金额',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function(val) {
                        return val[2] / 100;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ffeb7b'
                        }
                    }
                }

                /**
                ,
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 6)),
                    symbolSize: function (val) {
                        return val[2] / 20;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ffd800',
                            shadowBlur: 10,
                            shadowColor: 'rgba(0,0,0,.3)'
                        }
                    },
                    zlevel: 1
                }
                **/
            ]
        };

        myChart.setOption(option);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }

    function echarts_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart2'));

        option = {
            //  backgroundColor: '#00265f',
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            grid: {
                left: '0%',
                top: '10px',
                right: '0%',
                bottom: '4%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['浙江', '上海', '江苏', '广东', '北京', '深圳', '安徽'],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                        width: 1,
                        type: "solid"
                    },
                },

                axisTick: {
                    show: false,
                },
                axisLabel: {
                    interval: 0,
                    // rotate:50,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    //formatter: '{value} %'
                    show: true,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1 )",
                        width: 1,
                        type: "solid"
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                    }
                }
            }],
            series: [{

                    type: 'bar',
                    data: [1500, 1200, 600, 200, 300, 300, 900],
                    barWidth: '35%', //柱子宽度
                    // barGap: 1, //柱子之间间距
                    itemStyle: {
                        normal: {
                            color: '#27d08a',
                            opacity: 1,
                            barBorderRadius: 5,
                        }
                    }
                }

            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }

    function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart5'));

        option = {
            //  backgroundColor: '#00265f',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },

            grid: {
                left: '0%',
                top: '10px',
                right: '0%',
                bottom: '2%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['浙江', '上海', '江苏', '广东', '北京', '深圳', '安徽', '四川'],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                        width: 1,
                        type: "solid"
                    },
                },

                axisTick: {
                    show: false,
                },
                axisLabel: {
                    interval: 0,
                    // rotate:50,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    //formatter: '{value} %'
                    show: true,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1 )",
                        width: 1,
                        type: "solid"
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                    }
                }
            }],
            series: [{
                type: 'bar',
                data: [2, 3, 3, 9, 15, 12, 6, 4, 6, 7, 4, 10],
                barWidth: '35%', //柱子宽度
                // barGap: 1, //柱子之间间距
                itemStyle: {
                    normal: {
                        color: '#2f89cf',
                        opacity: 1,
                        barBorderRadius: 5,
                    }
                }
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }

    function echarts_4(yqinfo) {
        // 获取时间序列
        var hisdate = []
        var deathinfo = []
        var curesinfo = []
        console.log('获取时间序列')
        for (var a = 0; a < yqinfo.history.length; a++) {
            hisdate[a] = yqinfo.history[a].date
            deathinfo[a] = yqinfo.history[a].deathsNum
            curesinfo[a] = yqinfo.history[a].curesNum
            // console.log(yqinfo.history[a])
        }
        console.log(deathinfo)
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart4'));

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#dddc6b'
                    }
                }
            },
            legend: {
                top: '0%',
                data: ['治愈', '死亡'],
                textStyle: {
                    color: 'rgba(255,255,255,.5)',
                    fontSize: '12',
                }
            },
            grid: {
                left: '10',
                top: '30',
                right: '10',
                bottom: '10',
                containLabel: true
            },

            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.2)'
                    }

                },

                data: hisdate.reverse()

            }, {

                axisPointer: { show: false },
                axisLine: { show: false },
                position: 'bottom',
                offset: 20,



            }],

            yAxis: [{
                type: 'value',
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12,
                    },
                },

                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                }
            }],
            series: [{
                    name: '死亡人数',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {

                        normal: {
                            color: '#0184d5',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(1, 132, 213, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(1, 132, 213, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#0184d5',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: deathinfo.reverse()

                },
                {
                    name: '治愈人数',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {

                        normal: {
                            color: '#00d887',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 216, 135, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 216, 135, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#00d887',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: curesinfo.reverse()

                },

            ]

        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }

    function echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart6'));

        var dataStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                //shadowBlur: 40,
                //shadowColor: 'rgba(40, 40, 40, 1)',
            }
        };
        var placeHolderStyle = {
            normal: {
                color: 'rgba(255,255,255,.05)',
                label: { show: false, },
                labelLine: { show: false }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };
        option = {
            color: ['#0f63d6', '#0f78d6', '#0f8cd6', '#0fa0d6', '#0fb4d6'],
            tooltip: {
                show: true,
                formatter: "{a} : {c} "
            },
            legend: {
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 12,
                bottom: '3%',

                data: ['浙江', '上海', '广东', '北京', '深圳'],
                textStyle: {
                    color: 'rgba(255,255,255,.6)',
                }
            },

            series: [{
                    name: '浙江',
                    type: 'pie',
                    clockWise: false,
                    center: ['50%', '42%'],
                    radius: ['59%', '70%'],
                    itemStyle: dataStyle,
                    hoverAnimation: false,
                    data: [{
                        value: 80,
                        name: '01'
                    }, {
                        value: 20,
                        name: 'invisible',
                        tooltip: { show: false },
                        itemStyle: placeHolderStyle
                    }]
                },
                {
                    name: '上海',
                    type: 'pie',
                    clockWise: false,
                    center: ['50%', '42%'],
                    radius: ['49%', '60%'],
                    itemStyle: dataStyle,
                    hoverAnimation: false,
                    data: [{
                        value: 70,
                        name: '02'
                    }, {
                        value: 30,
                        name: 'invisible',
                        tooltip: { show: false },
                        itemStyle: placeHolderStyle
                    }]
                },
                {
                    name: '广东',
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    center: ['50%', '42%'],
                    radius: ['39%', '50%'],
                    itemStyle: dataStyle,
                    data: [{
                        value: 65,
                        name: '03'
                    }, {
                        value: 35,
                        name: 'invisible',
                        tooltip: { show: false },
                        itemStyle: placeHolderStyle
                    }]
                },
                {
                    name: '北京',
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    center: ['50%', '42%'],
                    radius: ['29%', '40%'],
                    itemStyle: dataStyle,
                    data: [{
                        value: 60,
                        name: '04'
                    }, {
                        value: 40,
                        name: 'invisible',
                        tooltip: { show: false },
                        itemStyle: placeHolderStyle
                    }]
                },
                {
                    name: '深圳',
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    center: ['50%', '42%'],
                    radius: ['20%', '30%'],
                    itemStyle: dataStyle,
                    data: [{
                        value: 50,
                        name: '05'
                    }, {
                        value: 50,
                        name: 'invisible',
                        tooltip: { show: false },
                        itemStyle: placeHolderStyle
                    }]
                },
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }

    function echarts_31() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb1'));
        option = {

            title: [{
                text: '年龄分布',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: '16'
                }

            }],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                position: function(p) { //其中p为当前鼠标的位置
                    return [p[0] + 10, p[1] - 10];
                }
            },
            legend: {

                top: '70%',
                itemWidth: 10,
                itemHeight: 10,
                data: ['0岁以下', '20-29岁', '30-39岁', '40-49岁', '50岁以上'],
                textStyle: {
                    color: 'rgba(255,255,255,.5)',
                    fontSize: '12',
                }
            },
            series: [{
                name: '年龄分布',
                type: 'pie',
                center: ['50%', '42%'],
                radius: ['40%', '60%'],
                color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
                label: { show: false },
                labelLine: { show: false },
                data: [
                    { value: 1, name: '0岁以下' },
                    { value: 4, name: '20-29岁' },
                    { value: 2, name: '30-39岁' },
                    { value: 2, name: '40-49岁' },
                    { value: 1, name: '50岁以上' },
                ]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }

    function echarts_32() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb2'));
        option = {

            title: [{
                text: '职业分布',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: '16'
                }

            }],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                position: function(p) { //其中p为当前鼠标的位置
                    return [p[0] + 10, p[1] - 10];
                }
            },
            legend: {

                top: '70%',
                itemWidth: 10,
                itemHeight: 10,
                data: ['电子商务', '教育', 'IT/互联网', '金融', '学生', '其他'],
                textStyle: {
                    color: 'rgba(255,255,255,.5)',
                    fontSize: '12',
                }
            },
            series: [{
                name: '年龄分布',
                type: 'pie',
                center: ['50%', '42%'],
                radius: ['40%', '60%'],
                color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
                label: { show: false },
                labelLine: { show: false },
                data: [
                    { value: 5, name: '电子商务' },
                    { value: 1, name: '教育' },
                    { value: 6, name: 'IT/互联网' },
                    { value: 2, name: '金融' },
                    { value: 1, name: '学生' },
                    { value: 1, name: '其他' },
                ]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }

    function echarts_33() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb3'));
        option = {
            title: [{
                text: '兴趣分布',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: '16'
                }

            }],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                position: function(p) { //其中p为当前鼠标的位置
                    return [p[0] + 10, p[1] - 10];
                }
            },
            legend: {
                top: '70%',
                itemWidth: 10,
                itemHeight: 10,
                data: ['汽车', '旅游', '财经', '教育', '软件', '其他'],
                textStyle: {
                    color: 'rgba(255,255,255,.5)',
                    fontSize: '12',
                }
            },
            series: [{
                name: '兴趣分布',
                type: 'pie',
                center: ['50%', '42%'],
                radius: ['40%', '60%'],
                color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
                label: { show: false },
                labelLine: { show: false },
                data: [
                    { value: 2, name: '汽车' },
                    { value: 3, name: '旅游' },
                    { value: 1, name: '财经' },
                    { value: 4, name: '教育' },
                    { value: 8, name: '软件' },
                    { value: 1, name: '其他' },
                ]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }


    function map(yqinfo) {
        var data = []

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map'));

        var nameColor = " rgb(55, 75, 113)"
        var name_fontFamily = '宋体'
        var name_fontSize = 35
        var mapName = 'china'
        var data = []
        var geoCoordMap = {};
        var toolTipData = [];

        for (var i = 0; i < yqinfo.area.length; i++) {
            d = new Object()
            c = {}
            d.name = yqinfo.area[i].provinceName
            d.value = yqinfo.area[i].confirmedCount
            data.push(d)
            c.name = yqinfo.area[i].provinceName
            c.value = []
            c.value.push(d)
            toolTipData.push(c)
        }
        console.log(toolTipData)
        /*获取地图数据*/
        myChart.showLoading();
        var mapFeatures = echarts.getMap(mapName).geoJson.features;
        myChart.hideLoading();
        mapFeatures.forEach(function(v) {
            // 地区名称
            // console.log(v)
            var name = v.properties.name;
            console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]')
            // console.log(name)
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;
            // console.log(geoCoordMap)
            data.push({
                name: name,
                value: Math.round(Math.random() * 100 + 10)
            })
            var dd = {}

            // toolTipData.push({
            //     name: name,
            //     value: [{
            //             name: "车型一",
            //             value: Math.round(Math.random() * 100 + 10) + '辆'
            //         },
            //         {
            //             name: "车型二",
            //             value: Math.round(Math.random() * 100 + 10) + '辆'
            //         },
            //         {
            //             name: "车型三",
            //             value: Math.round(Math.random() * 100 + 10) + '辆'
            //         },
            //         {
            //             name: "车型四",
            //             value: Math.round(Math.random() * 100 + 10) + '辆'
            //         }
            //     ]
            // })
            
        });
console.log('工具栏')
            console.log(toolTipData)
        var max = 480,
            min = 9; // todo
        var maxSize4Pin = 50,
            minSize4Pin = 20;

        // var convertData = function(data) {
        //     var res = [];
        //     for (var i = 0; i < data.length; i++) {
        //         var geoCoord = geoCoordMap[data[i].name];
        //         if (geoCoord) {
        //             res.push({
        //                 name: data[i].name,
        //                 value: geoCoord.concat(data[i].value),
        //             });
        //         }
        //     }
        //     return res;
        // };
        // ------------
        var geoCoordMap = {
            '台湾': [121.5135, 25.0308],
            '黑龙江': [127.9688, 45.368],
            '内蒙古': [110.3467, 41.4899],
            "吉林": [125.8154, 44.2584],
            '北京市': [116.4551, 40.2539],
            "辽宁": [123.1238, 42.1216],
            "河北": [114.4995, 38.1006],
            "天津": [117.4219, 39.4189],
            "山西": [112.3352, 37.9413],
            "陕西": [109.1162, 34.2004],
            "甘肃": [103.5901, 36.3043],
            "宁夏": [106.3586, 38.1775],
            "青海": [101.4038, 36.8207],
            "新疆": [87.9236, 43.5883],
            "西藏": [91.11, 29.97],
            "四川": [103.9526, 30.7617],
            "重庆": [108.384366, 30.439702],
            "山东": [117.1582, 36.8701],
            "河南": [113.4668, 34.6234],
            "江苏": [118.8062, 31.9208],
            "安徽": [117.29, 32.0581],
            "湖北": [114.3896, 30.6628],
            "浙江": [119.5313, 29.8773],
            "福建": [119.4543, 25.9222],
            "江西": [116.0046, 28.6633],
            "湖南": [113.0823, 28.2568],
            "贵州": [106.6992, 26.7682],
            "云南": [102.9199, 25.4663],
            "广东": [113.12244, 23.009505],
            "广西": [108.479, 23.1152],
            "海南": [110.3893, 19.8516],
            '上海': [121.4648, 31.2891],
        };
        var convertData = function(data) {
            console.log('打印')
            // console.log(data)
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            
            return res;
        };
        // ============


        option = {
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    if (typeof(params.value)[2] == "undefined") {
                        var toolTiphtml = ''
                        for (var i = 0; i < toolTipData.length; i++) {
                            if (params.name == toolTipData[i].name) {
                                toolTiphtml += toolTipData[i].name + ':<br>'
                                for (var j = 0; j < toolTipData[i].value.length; j++) {
                                    toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                                }
                            }
                        }
                        // console.log(convertData(data))
                        return toolTiphtml;
                    } else {
                        var toolTiphtml = ''
                        for (var i = 0; i < toolTipData.length; i++) {
                            if (params.name == toolTipData[i].name) {
                                toolTiphtml += toolTipData[i].name + ':<br>'
                                for (var j = 0; j < toolTipData[i].value.length; j++) {
                                    toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                                }
                            }
                        }

                        return toolTiphtml;
                    }
                }
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                data: ['credit_pm2.5'],
                textStyle: {
                    color: '#fff'
                }
            },
            visualMap: {
                show: true,
                min: 0,
                max: 600,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                seriesIndex: [1],
                inRange: {
                    // color: ['#3B5077', '#031525'] // 蓝黑
                    // color: ['#ffc0cb', '#800080'] // 红紫
                    // color: ['#3C3B3F', '#605C3C'] // 黑绿
                    //  color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                    // color: ['#23074d', '#cc5333'] // 紫红
                    //   color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#1488CC', '#2B32B2'] // 浅蓝
                    // color: ['#00467F', '#A5CC82','#ffc0cb'] // 蓝绿红
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    color: ['#22e5e8', '#0035f9', '#22e5e8'] // 蓝绿

                }
            },
            /*工具按钮组*/
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {

                    dataView: {
                        readOnly: false
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            geo: {
                show: true,
                map: mapName,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#097bba'
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                }
            },
            series: [{
                    name: '散点',
                    type: 'map',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: [10,10],
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,255,0,0.8)'
                        }
                    }
                },
                {
                    type: 'map',
                    map: mapName,
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    animation: false,
                    data: data
                },
                {
                    name: '点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin', //气泡
                    symbolSize: function(val) {
                        var a = (maxSize4Pin - minSize4Pin) / (max - min);
                        var b = minSize4Pin - a * min;
                        b = maxSize4Pin - a * max;
                        return a * val[2] + b;
                    },
                    label: {

                        normal: {
                            show: false,
                            formatter: function(params) { return params.data.value[2] },
                            textStyle: {
                                color: '#fff',
                                fontSize: 9,
                            }
                        }
                    },
                    itemStyle: {

                        normal: {
                            color: 'rgba(255,255,0,0)', //标志颜色
                        }
                    },
                    zlevel: 6,
                    data: convertData(data),
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function(a, b) {
                        return b.value - a.value;
                    }).slice(0, 5)),
                    symbolSize: function(val) {
                        return val[2] / 1000000;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,255,0,0.8)',
                            shadowBlur: 10,
                            shadowColor: '#05C3F9'
                        }
                    },
                    zlevel: 1
                },

            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }


})