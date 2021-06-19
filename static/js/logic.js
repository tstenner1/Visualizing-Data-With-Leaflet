// Store API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Following response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  console.log(data.features)
});

function createFeatures(earthquakeData) {

    // Define a function we want to run ONCE for each feature in the features array
    
    // Give each feature a popup describing the place and time of the earthquake
    
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }