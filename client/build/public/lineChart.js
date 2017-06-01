var LineChart = function() {

  var container = document.getElementById("lineChart");

  var chart = new Highcharts.Chart({ 
    chart: {
      renderTo: container
    },
    title: { 
      text: "Number of Pokemon I Caught" 
    },
    series: [
      {
        name: "Water Pokemon",
        color: "#73b7ff",
        data: [2, 7, 10, 12, 14]
      },
      {
        name: "Fire Pokemon",
        color: "#ffac33",
        data: [4, 3, 5, 18, 11]
      }
    ],
    xAxis: { 
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    },
  });

};