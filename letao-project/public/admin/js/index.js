$(function(){
    barChart();
    pieChart();
    
})

//封装柱状图
var barChart = function () {
var data = [
    {
        name:'一月',value:"200"
    },
    {
        name:'二月',value:"400"
    },
    {
        name:'三月',value:"300"
    },
    {
        name:'四月',value:"500"
    },
    {
        name:'五月',value:"100"
    }
]

 //拆解 data 数组
 var xData = [], yData = [];
 data.forEach(function (item,i) {
    xData.push(item.name)
    yData.push(item.value)
 })

 ///初始化 echarts对象
var myChart = echarts.init(document.getElementById('barChart'));
// 指定图表的配置项和数据
var option = {
    //标题
   title: {
       text: '2020 注册人数'
   },
   tooltip: {},
   legend: {
       data:['注册人数']
   },
   //x轴显示内容
   xAxis: {
       data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
   },
   //y轴显示内容
   yAxis: {},
   series: [{
       name: '注册人数',
       type: 'bar',
       data: [5, 20, 36, 10, 10, 20]
   }]
};

//将x轴显示内容 重新赋值
option.xAxis.data=xData
//将y轴显示内容 重新赋值
option.series[0].data=yData

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
}

var pieChart = function (){
     ///初始化 echarts对象
var myChart = echarts.init(document.getElementById('pieChart'));

option = {
    title: {
        text: '热门品牌销售',
        subtext: '2020年6月',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['361', '耐克', '安踏', '匡威', '李宁']
    },
    series: [
        {
            name: '数据',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '361'},
                {value: 310, name: '耐克'},
                {value: 234, name: '安踏'},
                {value: 135, name: '匡威'},
                {value: 1548, name: '李宁'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

}