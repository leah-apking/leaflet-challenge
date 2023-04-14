# leaflet-challenge

### Description

For this challenge we mapped earthquakes using leaflet. I selected the GeoJSON dataset from the United States Geological Survey, USGS, website that contained data on all earthquake events in the last 30 days with a magnitude of 2.5+. The leaflet map need to contain a marker for each event with the radius representing the magnitude of the event, the color representing the depth, with greater depths represented by darker colors, with the color scale shown on a legend, and popups featuring additional information about that earthquake.

![image](https://user-images.githubusercontent.com/119013360/231924301-ff204b99-6ec4-4d99-9f25-6bcdbafddd93.png)


### Pulling Data & Markers

I began by fetching my dataset and logging it to the console. The features data was then inputted into a create features function. This function contained another function which added an informational popup to each marker. Next, my create marker function defined the appearance of each marker including size, color, and location. The geoJSON information returned by each of these functions was saved to variable which then was plugged into the create map function. Finally, the marker color function was defined which assigned each marker a color according to its depth.

### Legend

Next, I created my legend and assigned it a location on the map. I assigned div, labels, grades, and colors to the legend, and defined the title. To build the legend I looped through the grades and colors so they appeared on the legend and correctly corresponded with the function I used to define the makers and set the background style. Then the previous steps were joined to complete the legend.

### Add to Map

My last function was the create maps function which took the data saved from the geoJSON in the earlier step. I created three layers the street view, the topographical view, and the satellite view, which were assigned to the base maps so allow users to switch between them. The earthquake markers we assigned to their own layer. I then created my map and set the starting point, including the street and earthquake layers. Finally, I added the additional layer views and added the legend to the map.

