# Leaflet Homework - Visualizing Data with Leaflet

In this repository I visualize earthquake data from the United States Geological Survey(USGS). 

### Part 1: Basic Visualization

My first task is to visualize an earthquake data set.

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. I visited the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and picked a data set to visualize.

After finding the dataset it was time to import and visualize the data.

I created a map using Leaflet that plots all of the earthquakes from my data set based on their longitude and latitude.

   * The data markers reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.

   * Next I included popups that provide additional information about the earthquake when a marker is clicked.

   * A legend was created to provide context for my map data.

   * My visualization looka something like the map below.

![2-BasicMap](Images/2-BasicMap.png)

### Part 2: More Advanced Data Visualizaton

For part 2, I plot a second data set on my map to illustrate the relationship between tectonic plates and seismic activity. I needed to pull in a second data set and visualize it along side my original set of data.

In this part I execute the following: 

* Plot a second data set on my map.

* Add a number of base maps to choose from as well as separate out two different data sets into overlays that can be turned on and off independently.

* Add layer controls to my map.

![5-Advanced](Images/5-Advanced.png)

- - -
© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
