
createTable()
createMap()
createScatter()

// create the first visualization: the map
function createMap() {
	// this visualization was partially copied from: http://bl.ocks.org/phil-pedruco/9344373 - All credits are due to the author
	// set the frame in which the map will be placed
    var width = 300,
        height = 300;
	
	// set a color-range for the map
    var colour = d3.scale.category20();
	
	// create the projector for the map
    var projection = d3.geo.mercator()
        .scale(1)
        .translate([0, 0]);
	
	// create the path using the projector
    var path = d3.geo.path()
        .projection(projection);
	
	// append the svg in which the map will be integrated
    var svg = d3.select("#Map").append("svg")
        .attr("width", width)
        .attr("height", height);
	
	// load the geodata
    d3.json("../data/nld.json", function(error, nld) {
		
		// set the projection formula
        var l = topojson.feature(nld, nld.objects.subunits).features[3],
            b = path.bounds(l),
            s = .2 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
		
		// scale the formula on the map
        projection
            .scale(s)
            .translate(t);
		
		// draw the map
        svg.selectAll("path")
            .data(topojson.feature(nld, nld.objects.subunits).features).enter()
            .append("path")
            .attr("d", path)
            .attr("fill", function(d, i) {
                return colour(i);
            })
            .attr("class", function(d, i) {
                return d.properties.name;
            });

        // Manually designate the points of the different cities
        Amsterdam = [170, 110, "Amsterdam"];
        Utrecht = [170, 135, "Utrecht"]
    	Rotterdam = [150, 150, "Rotterdam"];
		DenHaag = [135, 130, "DenHaag"];
		Groningen = [235, 50, "Groningen"]
		
		// add interactive icons on the map for each of the cities
		svg.selectAll(".mark")
			.data([Amsterdam,Rotterdam,Utrecht,DenHaag,Groningen])
			.enter()
			.append("image")
			.attr('class', 'mark')
			.attr('width', 20)
			.attr('height', 20)
			.attr("xlink:href", "http://www.freeiconspng.com/uploads/address-building-company-home-house-office-real-estate-icon--10.png" )
			.attr("x",function (d) { return d[0]; })
			.attr("y",function (d) { return d[1]; })
			.attr("id", function (d) { return ("logo-" + d[2])})
			.on("mouseover", function (d) { return onMouseOver(d[2]); }) 
			.on("mouseout", function (d) { return onMouseOut(d[2]); }) 
			.on("click", function (d) { return onClick(d[2]); });
     })
}

// create the second visualization: the scattergraph
function createScatter() {
	// this visualization was partially copied from: http://bl.ocks.org/weiglemc/6185069 - All credits are due to the author
	// I've left the notes of the author
	
	// set the frame in which the scattergraph will be integrated
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 300 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  /*
   * value accessor - returns the value to encode for a given data object.
   * scale - maps value to a visual display encoding, such as a pixel position.
   * map function - maps from data value to display value
   * axis - sets up axis
   */

	// setup x
	var xValue = function(d) { return d.oppervlakte;}, // data -> value
		xScale = d3.scale.linear().range([0, width]), // value -> display
		xMap = function(d) { return xScale(xValue(d));}, // data -> display
		xAxis = d3.svg.axis().scale(xScale).orient("bottom");

	// setup y
	var yValue = function(d) { return d.prijs;}, // data -> value
		yScale = d3.scale.linear().range([height, 0]), // value -> display
		yMap = function(d) { return yScale(yValue(d));}, // data -> display
		yAxis = d3.svg.axis().scale(yScale).orient("left");

	// setup fill color
	var cValue = function(d) { return d.stad;},
		color = d3.scale.category10();

	// add the graph canvas to the body of the webpage
	var svg = d3.select("#scattergraph").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// add the tooltip area to the webpage
	var tooltip = d3.select("body").append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	// load data
	d3.csv("../data/kamers.csv", function(error, data) {

		// change string (from CSV) into number format
		data.forEach(function(d) {
				d.oppervlakte = +d.oppervlakte;
				d.prijs = +d.prijs
		});

		// don't want dots overlapping axis, so add in buffer to data domain
		xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
		yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

		// x-axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
		  .append("text")
			.attr("class", "label")
			.attr("x", width)
			.attr("y", -6)
			.style("text-anchor", "end")
			.text("Oppervlakte (m2)");

		// y-axis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
		  .append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Prijs (euros)");

		// draw dots and add the interactive elements with the tooltip
		svg.selectAll(".dot")
			.data(data)
			.enter().append("circle")
			.attr("class", "dot")
			.attr("r", 1.5)
			.attr("cx", xMap)
			.attr("cy", yMap)
			.style("fill", function(d) { return color(cValue(d));})
			.attr("id", function(d) { return "Dot" + d.stad})
			.on("mouseover", function(d) {
			  tooltip.transition()
				   .duration(200)
				   .style("opacity", .9);
			  tooltip.html(d.straat + "("+ d.stad + ")" + ": (" +xValue(d)
				+ ", " + yValue(d) + ")")
				   .style("left", (d3.event.pageX + 5) + "px")
				   .style("top", (d3.event.pageY - 28) + "px");
			  onMouseOver(d.stad);
			})
			.on("mouseout", function(d) {
			  tooltip.transition()
				   .duration(500)
				   .style("opacity", 0);
			  onMouseOut(d.stad);
			})
			.on("click", function (d) { return onClick(d.straat); });
			})
}

// set the lower table with the required data
function createTable() {
	// set a bootstrap DataTable 
	$(document).ready(function() {
		$('#table').DataTable( {
			"ajax": {
			"url": '../data/kamers.json',
			// get JSON data from a plain array
			// rather than an array in an object
			"dataSrc": ""
			},
			"columns": [
				{ "data": "stad" },
				{ "data": "straat" },
				{ "data": "prijs" },
				{ "data": "oppervlakte" },
				{ "data": "website" },
				{ "data": "link",
					// render the link as a hyperlink
					"render": function ( data, type, full, meta ) {
						return '<a href="'+data+'">Ga naar kamer link</a>'; }
				}
			],
			// translate the english DataTable to dutch
			"language": {
				"decimal":        "",
				"emptyTable":     "Geen data",
				"info":           "_START_ tot _END_ van _TOTAL_ kamers",
				"infoEmpty":      "0 tot 0 van de 0 kamers",
				"infoFiltered":   "(gefiltered van _MAX_ kamers)",
				"infoPostFix":    "",
				"thousands":      ",",
				"lengthMenu":     "Laat _MENU_ kamers zien",
				"loadingRecords": "Aan het laden...",
				"processing":     "Aan het zoeken...",
				"search":         "Zoek:",
				"zeroRecords":    "Geen resultaten gevonden",
				"paginate": {
					"first":      "Eerste ",
					"last":       " Laatste",
					"next":       " Volgende",
					"previous":   "Vorige "
				},
				"aria": {
					"sortAscending":  ": van hoog naar laag sorteren",
					"sortDescending": ": van laag naar hoog sorteren"
				}
			}
			});
	});
}
