var dateStart = "",
  dateEnd = "";
var page = {
  init: function () {
	var year = new Date().getFullYear();//默认当前年份  
    page.listen();
    page.queryData(year);
  },
  listen: function () {
    $("#year-type").change(function (event) {
      page.queryData($("option:selected").attr("value"))
      $("#years").html($("option:selected").attr("value"))
    })
  },
  queryData: function (years) {	 
    $.ajax({
      url: "../../light/mobile/gisshow/GetGisCountData2",
      type: "GET",
      dataType: "json",
      data: {
        year: years
      },
      success: function (data) {
    	  //console.log(data)
        if (data.success === true) {
          page.queryEcharts(data.result[0]);
          $("#areaname").html(data.areaname);
        }
      },
      error: function (err) {}
    });
  },
  queryEcharts: function (data) {
    var areaname = [],
      casehandling = [],
      handling = [],
      solved = [],
      suspending = [];
    for (const index in data) {
      areaname.push(data[index].areaname); //区域
      suspending.push(data[index].suspending); //未治理
      handling.push(data[index].handling); //治理中
      solved.push(data[index].solved); //已治理
      casehandling.push(data[index].casehandling); //已结案
    }

    var myChart = echarts.init(document.getElementById("main"));
    var seriesLabel = {
      normal: {
        show: true,
        textBorderColor: "#FFF",
        textStyle: {
          color: "#FFF"
        },
        textBorderWidth: 1,
        position: "",
        formatter: function (params) {
          if (params.value == 0) {
            return "";
          } else {
            return params.value;
          }
        }
      }
    };
    option = {
      title: {
        text: ""
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {
        data: ["未治理", "治理中", "已治理", "已结案"]
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [{
        type: "category",
        boundaryGap: false,
        data: areaname
      }],
      yAxis: [{
        type: "value"
      }],
      series: [{
          name: "未治理",
          type: "line",
          areaStyle: {
            normal: {}
          },
          stack: "总量",
          data: suspending,
          itemStyle:{
          	color:"#CC00FF"
		 }
        },
        {
          name: "治理中",
          type: "line",
          areaStyle: {
            normal: {}
          },
          stack: "总量",
          data: handling,
          itemStyle:{
          	color:"orange"
		  }
        },
        {
          name: "已治理",
          type: "line",
          areaStyle: {
            normal: {}
          },
          stack: "总量",
          data: solved,
          itemStyle:{
          	color:"yellow"
		  }
        },
        {
          name: "已结案",
          type: "line",
          areaStyle: {
            normal: {}
          },
          stack: "总量",
          data: casehandling,
          itemStyle:{
          	color:"green"
		  }
        }
      ]
    };
    myChart.setOption(option);
  }
};
page.init();

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
    $(document).on("click", "#search", function () {
      particularYear = $("#particularYear option:selected").val();
      quarter_dataId = $("#quarter option:selected").attr("data-id");
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
        $("#yearspc").html(
          "(" +particularYear+"年"+quarter+")"
        );
      }, 0);
    });
  },
  queryData: function (particularYear, quarter) {
    $.ajax({
      url: "../../light/mobile/gisshow/GetGisCountData5",
      type: "POST",
      dataType: "json",
      data: {
        year: particularYear,
        quarter: quarter
      },
      success: function (data) {
        if (data.success === true) {
          //设置默认区域名称
          $("#areanamepc").html(data.areaname);
          StatisticalTable.queryDate(data.result);
        }
      },
      error: function (err) {}
    });
  },
  queryDate: function (data) {
    var tbodyHtmlPc = "",
      sosuSum = 0,
      solvedSum = 0,
      suspendSum = 0;
    for (let i = 0; i < data.length; i++) {
      sosuSum += data[i].solved + data[i].suspend;
      solvedSum += data[i].solved;
      suspendSum += data[i].suspend;
      tbodyHtmlPc +=
        "<tr>" +
        "<td>" +
        data[i].areaname +
        "</td>" +
        "<td>" +
        (data[i].solved + data[i].suspend) +
        "</td>" +
        "<td>" +
        data[i].solved +
        "</td>" +
        "<td>" +
        data[i].suspend +
        "</td>" +
        "<td>" +
        data[i].percent +
        "</td>" +
        "</tr>";
    }
    tbodyHtmlPc +=
      "<tr>" +
      "<td>总计</td>" +
      "<td>" +
      sosuSum +
      "</td>" +
      "<td>" +
      solvedSum +
      "</td>" +
      "<td>" +
      suspendSum +
      "</td>" +
      "<td></td>";
    ("</tr>");
    var sum = sosuSum;
    $(".sum").html("共查询到" + sum + "个灾害点");
    $("#tbodyHtmlPc").html(tbodyHtmlPc);
    $("#tbodyHtmlPhone").html(tbodyHtmlPc);
  }
};
StatisticalTable.init();
$("#change").on("click", function () {
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