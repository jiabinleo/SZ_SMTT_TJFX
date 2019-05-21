
var particularYear = "",
  quarter_dataId = "",
  quarter = ""; //年份数字    季度数字   第X季度
var StatisticalTable = {
  init: function () {
    var year = new Date().getFullYear();
    var particularYearHtml = "";
    var years = new Date();
    $("#timer").html(
      "截止" +
      years.getFullYear() +
      "年" +
      (years.getMonth() + 1) +
      "月" +
      years.getDate() +
      "日"
    );
    $("#timerphone").html(
      "截止" +
      years.getFullYear() +
      "年" +
      (years.getMonth() + 1) +
      "月" +
      years.getDate() +
      "日"
    );
    StatisticalTable.queryData(particularYear, quarter_dataId);
    for (let i = year; i >= year - 10; i--) {
      particularYearHtml += "<option value=" + i + ">" + i + "年</option>";
    }
    $("#particularYear").html(particularYearHtml);
    $("#year-type").html(particularYearHtml)

    StatisticalTable.listen();

    //默认为当前年份，加载初始化一下
    $("#years").html(year);
  },
  listen: function () {
    //pc
    $("#search").on("click", function () {
      var particularYear = $("#particularYear option:selected").val();
      var quarter_dataId = $("#quarter option:selected").attr("data-id");
      var quarter = $("#quarter option:selected").val();
      StatisticalTable.queryData(particularYear, quarter_dataId);
      var quarter = "";
      switch (quarter_dataId) {
        case "1":
          quarter = "第一季度";
          break;
        case "2":
          quarter = "第二季度";
          break;
        case "3":
          quarter = "第三季度";
          break;
        case "4":
          quarter = "第四季度";
          break;
        case "0":
          quarter = "全年";
          break;
        default:
          break;
      }
      setTimeout(() => {
        $("#titlePc").html(
          particularYear + "年" + quarter + "灾害治理情况统计"
        );
      }, 0);
    });
  },
  queryData: function (particularYear, quarter) {
    $.ajax({
      url: "http://192.168.1.240:8098/dfbinterface/mobile/gisshow/GetGisCountData4",
      type: "POST",
      dataType: "jsonp",
      callback: "result",
      data: {
        year: particularYear,
        quarter: quarter
      },
      success: function (data) {
        console.log(data)

        if (data.success === "0") {
          var arr = [];
          for (const key in data.result[0]) {
            if (data.result[0].hasOwnProperty(key)) {
              arr.push(data.result[0][key]);
            }
          }
          //设置区域名称
          $("#areanamepc").html(data.areaname);
          //统计数据
          StatisticalTable.queryDate(arr);
        }
      },
      error: function (err) {
        alert("接口连接失败")
        var data = { "key": "", "msg": "数据接口访问成功", "result": [{ "160": { "datacount": 1004, "totalcount": 1293, "dataname": "燃气管线", "color": "#00A600", "datavalue": "160", "percent": "77.6%" }, "150": { "datacount": 12, "totalcount": 1293, "dataname": "暗渠化河道", "color": "#3CCC84", "datavalue": "150", "percent": "0.9%" }, "161": { "datacount": 3, "totalcount": 1293, "dataname": "荷载过大、重型车辆辗压", "color": "#1E90FF", "datavalue": "161", "percent": "0.2%" }, "151": { "datacount": 11, "totalcount": 1293, "dataname": "给水管道", "color": "#1455C0", "datavalue": "151", "percent": "0.9%" }, "163": { "datacount": 2, "totalcount": 1293, "dataname": "其他原因", "color": "#00FF00", "datavalue": "163", "percent": "0.2%" }, "152": { "datacount": 44, "totalcount": 1293, "dataname": "排水管道", "color": "#2884F7", "datavalue": "152", "percent": "3.4%" }, "153": { "datacount": 71, "totalcount": 1293, "dataname": "排污管道", "color": "#2BDCC9", "datavalue": "153", "percent": "5.5%" }, "164": { "datacount": 46, "totalcount": 1293, "dataname": "雨水管道、雨水冲刷", "color": "#00FF33", "datavalue": "164", "percent": "3.6%" }, "121": { "datacount": 1, "totalcount": 1293, "dataname": "其他", "datavalue": "121", "percent": "0.1%" }, "0": { "datacount": 1, "totalcount": 1293, "dataname": "其他", "datavalue": "0", "percent": "0.1%" }, "154": { "datacount": 3, "totalcount": 1293, "dataname": "地下空洞、废弃井、废弃管道、土体掏空", "color": "#FA4B70", "datavalue": "154", "percent": "0.2%" }, "155": { "datacount": 28, "totalcount": 1293, "dataname": "深基坑施工、软土沉降、路基沉降", "color": "#FD6D59", "datavalue": "155", "percent": "2.2%" }, "157": { "datacount": 57, "totalcount": 1293, "dataname": "回填土不密实、地铁轨道施工、施工不当", "color": "#F18C1F", "datavalue": "157", "percent": "4.4%" }, "158": { "datacount": 7, "totalcount": 1293, "dataname": "电力管线", "color": "#E9C687", "datavalue": "158", "percent": "0.5%" }, "159": { "datacount": 3, "totalcount": 1293, "dataname": "通讯管线", "color": "#A252D0", "datavalue": "159", "percent": "0.2%" } }], "success": "0" }
        var arr = [];
        for (const key in data.result[0]) {
          if (data.result[0].hasOwnProperty(key)) {
            arr.push(data.result[0][key]);
          }
        }
        //设置区域名称
        $("#areanamepc").html(data.areaname);
        //统计数据
        StatisticalTable.queryDate(arr);
      }
    });
  },
  queryDate: function (data) {
    var tbodyHtmlPc = "",
      datacountSum = 0;
    for (let i = 0; i < data.length; i++) {
      datacountSum += data[i].datacount;
      tbodyHtmlPc +=
        "<tr>" +
        "<td>" +
        (i + 1) +
        "</td>" +
        "<td>" +
        data[i].dataname +
        "</td>" +
        "<td>" +
        data[i].datavalue +
        "</td>" +
        "<td>" +
        data[i].datacount +
        "</td>" +
        "<td>" +
        data[i].percent +
        "</td>" +
        "</tr>";
    }
    tbodyHtmlPc +=
      "<tr>" +
      "<td colspan='2'>总计</td>" +
      "<td></td>" +
      "<td>" +
      datacountSum +
      "</td>" +
      "<td>100%</td>" +
      "</tr>";
    var sum = datacountSum;
    $(".sum").html("合计" + sum + "个发灾点");
    $("#tbodyHtmlPc").html(tbodyHtmlPc);
  }
};
StatisticalTable.init();
var page = {
  init: function () {
    var year = new Date().getFullYear();//默认当前年份  
    page.listen();
    page.querysxt(year)
  },
  listen: function () {
    $("#year-type").change(function (event) {
      page.querysxt($("option:selected").attr("value"))
      $("#years").html($("option:selected").attr("value"))
    })
  },
  querysxt: function (years) {
    console.log(years)
    //原因分析
    $.ajax({
      url: "http://192.168.1.240:8098/dfbinterface/mobile/gisshow/GetGisCountData4",
      type: "GET",
      dataType: "jsonp",
      callback: "result",
      data: {
        year: years
      },
      success: function (data) {
        console.log(data)
        // data = JSON.parse(data);
        page.myChart2(data.result[0]);
        //设置区域名称
        $("#areaname").html(data.areaname);
      },
      error: function (err) {
        console.log(err)
      }
    });
  },
  queryData: function (dateStart, dateEnd) {
    $.ajax({
      url: "http://192.168.1.240:8098/dfbinterface/mobile/gisshow/GetGisCountData2",
      type: "GET",
      dataType: "json",
      data: {
        dateStart: dateStart,
        dateEnd: dateEnd
      },
      success: function (data) {
        page.queryEcharts(data);
      },
      error: function (err) { }
    });
  },
  myChart2: function (data) {
    console.log(data)
    var datas = [];
    for (const key in data) {
      datas.unshift(data[key]);
    }
    var dataname = [],
      datacount = [];
    for (let i = 0; i < datas.length; i++) {
      dataname.push(datas[i].dataname);
      if (datas[i].color == undefined) {
        datas[i].color = "";
      }
      datacount.push({
        value: datas[i].datacount,
        name: datas[i].dataname,
        itemStyle: {
          color: datas[i].color
        }
      });
    }
    var myChart2 = echarts.init(document.getElementById("main2"));
    option2 = {
      title: {
        text: "",
        x: "center",
        textStyle: {
          verticalAlign: "bottom",
          fontWeight: "normal"
        }
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        textStyle: {}
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        right: "5%",
        top: "20%",
        bottom: "20%",
        data: dataname,
        itemWidth: 40,
        itemHeight: 26,
        itemGap: 30,
        textStyle: {
          color: "#000",
        }
      },
      series: [{
        name: "访问来源",
        type: "pie",
        radius: ["20%", "70%"],
        center: ["45%", "48%"],
        label: {
          normal: {
            position: "inner",
            formatter: "{d}%",
            textStyle: {
              color: "#FFF",
            }
          }
        },
        data: datacount,
        itemStyle: {
          emphasis: {
            shadowBlur: 50,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          },
          normal: {
            borderColor: "#fff",
            borderWidth: 2
          }
        }
      }]
    };
    myChart2.setOption(option2);
  }
};

//页面初始化一下
page.init();

$(document).on("click", "#change", function () {
  if ($(this).val() === "列表模式") {
    $(this).val("图表模式");
    $("#map").hide();
    $("#table").show();
  } else if ($(this).val() === "图表模式") {
    $(this).val("列表模式");
    $("#map").show();
    $("#table").hide();
  }
});

