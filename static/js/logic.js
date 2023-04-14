// M2.5+ Earthquakes in the past 30 days
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data.features);
    
    // Capture features data, input data into createFeatures function
    createFeatures(data.features);
});

// Define createFeatures function
function createFeatures(earthquakeData) {
    

    // Define each point from JSON to be represented on map
    function onEachFeature(feature, layer) {

        // Add informational popup to each event
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)} <br> Magnitude: ${feature.properties.mag}</p>`);
    };
    
    // Define marker appearace and call color function
    function createMarkers(feature, latlng) {
        let options = {
            opacity: 1,
            fillOpacity: 0.75,
            fillColor: markerColor(feature.geometry.coordinates[2]),
            color: markerColor(feature.geometry.coordinates[2]),
            radius: feature.properties.mag * 10000,
            weight: 3.5
        };
        return L.circle(latlng, options);
    };

    // Create geoJSON variable containing all marker info
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: createMarkers
    });

    // Add earthquake layer to map
    createMap(earthquakes);

    // Define color function to assign markers to color group based on depth
    function markerColor(depth) {
        switch (true) {
            case depth > 250:
              return "#6b14a6";
            case depth > 100:
              return "#a80081";
            case depth > 50:
              return "#dc266d";
            case depth > 25:
              return "#fc5c59";
            case depth > 0:
              return "#ff924a";
            default:
              return "#ffc74c";
        };
    };
};

// Create legend
let legend = L.control({position: 'bottomleft'});

// Add title, color, and values to each depth group
legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend');
    let grades = ["<0", 0, 25, 50, 100, 250];
    let labels = [];
    let colors = [
        "#ffc74c",
        "#ff924a",
        "#fc5c59",
        "#dc266d",
        "#a80081",
        "#6b14a6"
    ];
    let legendInfo = "<h4>M2.5+ Earthquakes over Past 30 Days<br />Depth of Event:</h4>" + "</div>";

    div.innerHTML = legendInfo

    // Loop through legend categories to push category info to legend
    for (let i = 0; i < grades.length; i++) {
          labels.push('<ul style="background-color:' + colors[i] + '"> <span>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + ' km' : ' km') + '</span></ul>');
        };

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    
    return div;
  };

// Create map with earthquake markers
function createMap(earthquakes) {

    // Create satellite layer, courtesy of https://gist.github.com/nitaku/047a77e256de17f25e72
    let mbAttr = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    let mbUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    let satellite = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr});

    // Create street layer
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    // Create topographical layer
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    
    // Assign each tile layer to base map
    let baseMaps = {
        "Street Map": street,
        "Topographical Map": topo,
        "Satellite View": satellite
    };

    // Assign earthquake marker data to map layer
    let earthquakeOverlay = {
        Earthquakes: earthquakes
    };

    // Create map, set starting point
    let myMap = L.map("map", {
        center: [
            35, -97
        ],
        zoom: 4,
        layers: [street, earthquakes]
    });

    // Add all layers to leaflet map
    L.control.layers(baseMaps, earthquakeOverlay, {
        collapsed: false
    }).addTo(myMap);
    // Add legend to map
    legend.addTo(myMap);  
};