var DateHelper = function(){
  this.months = { "Jan": "01",
                  "Feb": "02",
                  "Mar": "03",
                  "Apr": "04",
                  "May": "05",
                  "Jun": "06",
                  "Jul": "07",
                  "Aug": "08",
                  "Sep": "09",
                  "Oct": "10",
                  "Nov": "11",
                  "Dec": "12"
                }

  this.years = [2011, 2012, 2013, 2014, 2015, 2016, 2017]
}

DateHelper.prototype = {
  populateMonthDropDown: function(select){
    Object.keys(this.months).forEach(function(month){
      console.log(month)
      var option = document.createElement("option")
      option.innerText = month;
      option.value = this.months[month];
      select.appendChild(option);
    }.bind(this))

  },

  populateYearDropDown: function(select){
    this.years.forEach(function(year){
      var option = document.createElement("option")
      option.value = year;
      option.innerText = year;
      select.appendChild(option);
    }.bind(this))
  }
}

module.exports = DateHelper;
