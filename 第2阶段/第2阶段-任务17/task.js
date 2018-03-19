/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2017-01-01");
    var datStr = '';
    for (var i = 1; i < 91; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};
function generyRandomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}
/**
 * 渲染图表
 */
function massage(node){
    //console.log(node);
    node.innerHTML="<p class='information'>"+'Aqi:  '+parseInt(node.style.height)+'<br>'+node.value+"</p>";

}
function out(node){
    //console.log(node);
    node.innerHTML="";
}
function renderChart(data_array) {
    var div = document.getElementById('aqi-chart-wrap');
    div.innerHTML = "";
    var left_dis = 0;
    var number = Object.getOwnPropertyNames(data_array).length;
    var aqi_width = (50/number).toString()+"%";
    //console.log(number);
    for(var day in data_array){
        var aqi = document.createElement("div");
        aqi.style.backgroundColor =  generyRandomColor();
        aqi.style.width = aqi_width;
        //console.log(data_array);
        aqi.value=day;
        aqi.style.height = data_array[day];
        aqi.style.left = left_dis.toString()+"%";
        left_dis+=(100/number);
        aqi.setAttribute("onmouseover","massage(this)");
        aqi.setAttribute("onmouseout","out(this)");
        aqi.setAttribute("class","aqi");
        div.appendChild(aqi);

    }
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(click_type) {
    // 确定是否选项发生了变化
    var array = {};
    // 设置对应数据
    if(click_type == "day"){
        array=chartData;
    }
    if(click_type == "week"){
        var week = 0,week_day = 0;

        var sum=0;
        for(var date in chartData){
            var week_date = new Date(Date.parse(date.replace(/\-/g,"/")));
            sum +=  chartData[date];
           // console.log(sum+ " "+" "+ chartData[date]);
            week_day++;
            if(week_date.getDay() == 6){
                array[("第 "+week+" 周").toString()] = parseInt(sum / week_day);
                sum=0;
                //console.log(week_array[week]);
                week_day = 0;
                week++;
            }
        }
       // console.log(week_array);
    }
    if(click_type == "month"){
        var month_sum= 0,month_count=0;
        var count = 0;
        for(var i in chartData){
            var months = Number(i.substring(5,7));
            var dates = Number(i.substring(8,10));
            month_sum+=chartData[i];
            count++;
            if(dates==31 || (dates==28&&months==2)){
                month_count++;
                var mon = "第 "+month_count+" 月";
                array[mon]=parseInt(month_sum / count);
                month_sum=0;
                count=0;
            }
        }
        console.log(array);
    }
    // 调用图表渲染函数
    renderChart(array);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(select_city) {
    // 确定是否选项发生了变化

    // 设置对应数据

    for(var city in aqiSourceData){
        if(city === select_city){
            chartData = aqiSourceData[select_city];
            console.log(chartData);
        }
    }
    // 调用图表渲染函数
    renderChart(chartData);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var date = document.getElementById("form-gra-time");
    var input = date.getElementsByTagName("input");

    length = input.length;
    var click_type = "";
    //console.log(input);

    input.change = function(){
        console.log(input);
        for(var i=0;i<length;i++){
            if(input[i].checked == "checked"){
                graTimeChange(input[i].value);
                click_type = input[i].value;
                console.log(input[i].value);
                return;
            }
        }
    };
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select = document.getElementById('city-select');
    for(var city in aqiSourceData){
        var option = document.createElement('option');
        option.innerText = city;
        select.appendChild(option);
    }
    chartData = aqiSourceData['北京'];
    renderChart(aqiSourceData['北京']);
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.onchange = function(){
        //console.log(select.value);
        citySelectChange(select.value);
    };
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();