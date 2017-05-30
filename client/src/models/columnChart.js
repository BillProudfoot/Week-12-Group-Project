var ColumnChart = function(){
  var container = document.querySelector("#column-chart");

  var chart = new Highcharts.Chart({
    chart: {
     
      type: "column",
      renderTo: container
    },
    title: {
      text: "Our Favourite Programming Languages"
    },

    credits: {
                enabled: false
            },


    series: [
        {
        name: "Cohort 11",
        data: [1,2,3]
        },
        {
        name: "Cohort 12",
        data: [5,5,5]
        },
        {
        name: "Cohort 10",
        data: [10,10,10]
        }
      ],

     xAxis: {
      categories: ["Ruby", "Java", "JavaScript", "COBOL"]
     }
  })
}

module.exports = ColumnChart;
