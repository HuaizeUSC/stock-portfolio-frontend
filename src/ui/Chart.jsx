import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

function Chart({ data }) {
  const seriesData = data.map((item) => [item.timestamp, parseFloat(item.openprice), parseFloat(item.highprice), parseFloat(item.lowprice), parseFloat(item.closeprice)]);
  // 创建Highcharts配置
  seriesData.sort((a, b) => a[0] - b[0]);
  const options = {
    chart: {
      height: 500,
    },

    plotOptions: {
      candlestick: {
        groupPadding: 0.1, // 设置两个组之间的间距
        pointPadding: 0.1, // 设置每个组内部点之间的间距
        color: "#4bd92b", // 默认的上涨颜色
        upColor: "#fd5344", // 默认的下跌颜色
        lineColor: "#4bd92b",
        upLineColor: "#fd5344",
      },
    },
    series: [
      {
        type: "candlestick",
        name: "Stock Price",
        data: seriesData,
      },
    ],
    xAxis: {
      type: "datetime",
      tickLength: 0, // 调整刻度标签的长度
    },
    yAxis: {
      title: {
        text: null, // 不显示标题
      },
      opposite: true, // 将 yAxis 放在图表右侧
      labels: {
        align: "left", // 标签左对齐
        x: 5, // 标签水平偏移量
      },
    },
  };
  return (
    <div className="px-5 pb-5">
      <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} />
    </div>
  );
}

export default Chart;
