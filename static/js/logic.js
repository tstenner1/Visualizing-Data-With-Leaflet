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

// Define function to create the circle radius based on the magnitude
function radiusSize(magnitude) {
    return magnitude * 20000;
  }

  // Define function to set the circle color based on the magnitude
  function circleColor(magnitude) {
    if (magnitude < 1) {
      return "#ccff33"
    }
    else if (magnitude < 2) {
      return "#ffff33"
    }
    else if (magnitude < 3) {
      return "#ffcc33"
    }
    else if (magnitude < 4) {
      return "#ff9933"
    }
    else if (magnitude < 5) {
      return "#ff6633"
    }
    else {
      return "#ff3333"
    }
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(earthquakeData, latlng) {
      return L.circle(latlng, {
        radius: radiusSize(earthquakeData.properties.mag),
        color: circleColor(earthquakeData.properties.mag),
        fillOpacity: 1
      });
    },
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

    // Define outdoormap, satellitemap, and grayscalemap layers
    var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.outdoors",
      accessToken: API_KEY
    });
  
    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
    });
  
    var grayscalemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
  
    // Create the faultline layer
    var faultLine = new L.LayerGroup();
    
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Outdoor Map": outdoorsmap,
      "Greyscale Map": grayscalemap,
      "Satellite Map": satellitemap
    };
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes,
      FaultLines: faultLine
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [outdoorsmap, earthquakes, faultLine]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);