var PieChart = function() {

  var container = document.getElementById("pieChart");

  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    },
    title: { 
          text: "Pokemon Types I've Caught" 
       },
    series: [
      {
        name: "Type", 
          data: [{   
            name: "Fire", 
            y: 74,
            color: "#ffac33"
          },
          {
            name: "Water",
            y: 25,
            color: "#73b7ff",
            sliced: true
          },
          { 
            name: "Grass", 
            y: 1,
            color: "#00ba2f"
          }] 
      }
    ]
  });

};