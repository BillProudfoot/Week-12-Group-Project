var ColumnChart = function(catKeys, catValues){
  var container = document.querySelector("#column-chart");

  var chart = new Highcharts.Chart({
    chart: {
     
      type: "column",
      renderTo: container
    },
    title: {
      text: "Most popular crimes along your walk"
    },

    credits: {
                enabled: false
            },
    series: [
        {
        // name: "Cohort 11",
        data: catValues
        },
      ],

     xAxis: {
      categories: catKeys
     }
  })
}

module.exports = ColumnChart;
