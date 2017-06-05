  var StopSearch = function(options){
  this.type = options.type,
  this.self_defined_ethnicity = options.self_defined_ethnicity,
  this.datetime = options.datetime,
  this.gender = options.gender,
  this.object_of_search = options.object_of_search,
  this.operation_name = options.operation_name,
  this.age_range = options.age_range,
  this.legislation = options.legislation,
  this.lat = options.location.latitude,
  this.lng = options.location.longitude,
  this.officer_defined_ethnicity = options.officer_defined_ethnicity
}

StopSearch.prototype = {

          //OPTIONS AVAILABLE ON API CALL
         //
        //  "outcome_linked_to_object_of_search" : false,
        //  "type" : "Person search",
        //  "self_defined_ethnicity" : "White - White British (W1)",
        //  "datetime" : "2015-03-04T11:12:22",
        //  "operation" : false,
        //  "gender" : "Male",
        //  "object_of_search" : null,
        //  "operation_name" : null,
        //  "removal_of_more_than_outer_clothing" : false,
        //  "outcome" : false,
        //  "age_range" : "18-24",
        //  "legislation" : "Misuse of Drugs Act 1971 (section 23)",
        //  "involved_person" : true,
        //  "location" : {
        //      "street" : {
        //          "id" : 1141353,
        //          "name" : "On or near Ash Court"
        //      },
        //      "longitude" : "0.497939",
        //      "latitude" : "52.302760"
        //  },
        //  "officer_defined_ethnicity" : "White"
         //
}

module.exports = StopSearch;
