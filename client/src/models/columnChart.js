var ColumnChart = function(catKeys, catValues){
  var container = document.querySelector("#lightbox-content");

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
          name: "Crime",
        data: catValues
        },
      ],

     xAxis: {
      categories: catKeys
     }
  })
}

module.exports = ColumnChart;
