setTotals()
changeWidths()
createTable()
createMap()
createScatter()
createBarTotal("olddata", "2014")
createBarTotal("newdata", "2017")
createBarM2("olddata", "olddataM2", "2014") 
createBarM2("newdata", "newdataM2", "2017")

// set a colorCode for each city
function colorCodeCity(city) {
	if (city == "Amsterdam") {
		return "#2196F3"
	}
	else if (city == "Rotterdam") {
		return "#F44336"
	}
	if (city == "DenHaag") {
		return "#9C27B0"
	}
	else if (city == "Groningen") {
		return "#4CAF50"
	}
	else if (city == "Utrecht") {
		return "#FF9800"
	}
}

// create the upper bar charts
function createBarTotal(identifier, year) {
  var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = 250 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

  var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

  var y = d3.scale.linear().range([height, 0]);
	
	var tooltip2 = d3.select("body").append("div")
      .attr("class", "tooltip2")
      .style("opacity", 0);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10);


  var svg = d3.select("#" + identifier).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("../data/" + identifier + ".csv", function(error, data) {

      data.forEach(function(d) {
          d.prijs = +d.prijs;
      });

    x.domain(data.map(function(d) { return d.stad; }));
    y.domain([0, 500]);


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
		.attr("x", 200)
        .attr("y", 0)
		.attr("font-size", "10px")
        .attr("dy", ".071em")
        .style("text-anchor", "end")
        .text("Gemiddele prijs in euros per stad in " + year);

    svg.selectAll("bar")
        .data(data)
      .enter().append("rect")
        .style("fill", function(d) { return d.color} )
        .attr("id", function(d) { return ("Bar" + identifier + d.stad)})
        .attr("x", function(d) { return x(d.stad); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.prijs); })
        .attr("height", function(d) { return height - y(d.prijs); })
       .on("mouseover", function (d) { tooltip2.transition()
               .duration(200)
			   .style("opacity", .9);
          tooltip2.html(d.stad)
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
			   onMouseOver(d.stad); }) 
       .on("mouseout", function(d) {
          tooltip2.transition()
               .duration(500)
               .style("opacity", 0);
		  onMouseOut(d.stad);
      })
  .on("click", function (d) { return onClick(d.stad); });
     });
}

// create the lower bar charts
function createBarM2(file, identifier, year) {
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 250 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

  var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10);


  var svg = d3.select("#" + identifier).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
	
  d3.csv("../data/" + file + ".csv", function(error, data) {
      data.forEach(function(d) {
		  d.m2 = parseInt(d.m2)
		  d.m2 = Math.round(d.m2);
		  console.log(d.m2)
      });

    x.domain(data.map(function(d) { return d.stad; }));
    y.domain([0, 25]);


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
		.attr("x", 210)
        .attr("y", 0)
		.attr("font-size", "10px")
        .attr("dy", ".071em")
        .style("text-anchor", "end")
        .text("Gemiddele prijs (€) per m2 per stad in " + year);

    svg.selectAll("bar")
        .data(data)
      .enter().append("rect")
        .style("fill", function(d) { return d.color; })
        .attr("id", function(d) { return ("Bar" + identifier + d.stad)})
        .attr("x", function(d) { return x(d.stad); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.m2); })
        .attr("height", function(d) { return height - y(d.m2); })
       .on("mouseover", function (d) { return onMouseOver(d.stad); }) 
       .on("mouseout", function (d) { return onMouseOut(d.stad); })
	   .on("click", function (d) { return onClick(d.stad); });

  });
}

// count the number of occurences in the dataset for each city
function changeTotal(city) {
  var json = $.getJSON("../data/kamers.json", function(json) {
    var count = 0;
    for (var i = 0; i < json.length; i++) {
        if (json[i].stad == city) {
            count++;
        }
    }
    if (city == "DenHaag") {
      city = "den-haag"
    }
    count = count + " kamers"
    $('#aantal-' + city).text(count)
  });
}

// call changeTotal() for each city
function setTotals() {
  changeTotal("Amsterdam")
  changeTotal("Rotterdam")
  changeTotal("DenHaag")
  changeTotal("Utrecht")
  changeTotal("Groningen")
}

// set the width of the total bar for each city 
function changeWidth(city) {

  var json = $.getJSON("../data/kamers.json", function(json) {
    var count = 0;
    for (var i = 0; i < json.length; i++) {
        if (json[i].stad == city) {
            count++;
        }
    }
	newWidth = Math.round(count/10) + "%"
    d3.select("#colorBar-" + city).style("width", newWidth).style("fill", "#0062b6").text(count)
  });
}

// call changeWidth() for each city
function changeWidths() {
  changeWidth("Amsterdam")
  changeWidth("Rotterdam")
  changeWidth("DenHaag")
  changeWidth("Utrecht")
  changeWidth("Groningen")
}

// create the first visualization: the map
function createMap() {

    var width = 300,
        height = 300;
	
    var colour = d3.scale.category20();

    var projection = d3.geo.mercator()
        .scale(1)
        .translate([0, 0]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#Map").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("../data/nld.json", function(error, nld) {

        var l = topojson.feature(nld, nld.objects.subunits).features[3],
            b = path.bounds(l),
            s = .2 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        projection
            .scale(s)
            .translate(t);

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

        // points
        Amsterdam = [170, 110, "Amsterdam"];
        Utrecht = [170, 135, "Utrecht"]
    	Rotterdam = [150, 150, "Rotterdam"];
      DenHaag = [135, 130, "DenHaag"];
      Groningen = [235, 50, "Groningen"]
      // add circles to svg
      svg.selectAll(".mark")//adding mark in the group
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

// set the lower table with the required data
function createTable() {
  $(document).ready(function() {
  $('#table').DataTable( {
    "ajax": {
          "url": '../data/kamers.json',
          // Get JSON data from a plain array
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
			"render": function ( data, type, full, meta ) {
			  return '<a href="'+data+'">Ga naar kamer link</a>'; }
		}
      ],
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
  } );
  $('#table tbody').on( 'click', function () {
        var data = $('#table').DataTable().row( $(this).parents('tr') ).data();
        alert( data[ 5 ] );
    } );
  } );
}

// create the second visualization: the scattergraph
function createScatter() {
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
        .text("Oppervlakte");

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

  // draw dots
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

// interactivity element: if hovered upon
function onMouseOver(city) {
  d3.select("#logo-" + city).attr({
    width: 40,
    height: 40
  })
  d3.select("#regel-" + city).attr("bgcolor", "#0062b6");
  d3.select("#Barolddata" + city).style("fill", "#0062b6");
  d3.select("#Barnewdata" + city).style("fill", "#0062b6");
  d3.select("#BarolddataM2" + city).style("fill", "#0062b6");
  d3.select("#BarnewdataM2" + city).style("fill", "#0062b6");
  d3.selectAll("#Dot" + city).attr("r", 3)
}

// interactivity element: if hovered out
function onMouseOut(city) {
	d3.select("#logo-" + city).attr({
	width: 20,
	height: 20
	})
	d3.select("#regel-" + city).attr("bgcolor", "FFFFFF");
	d3.select("#Barolddata" + city).style("fill", colorCodeCity(city));
	d3.select("#Barnewdata" + city).style("fill", colorCodeCity(city));
	d3.select("#BarolddataM2" + city).style("fill", colorCodeCity(city));
	d3.select("#BarnewdataM2" + city).style("fill", colorCodeCity(city));
	d3.selectAll("#Dot" + city).attr("r", 1.5)
}

//interactivity element: if clicked upon
function onClick(city) {
	table = $('#table').DataTable()
	table.search(city).draw()
	scrollTo()
	d3.select("#logo-" + city).attr({
    width: 40,
    height: 40
  })
  d3.select("#regel-" + city).attr("bgcolor", "#0062b6");
  d3.select("#Barolddata" + city).style("fill", "#0062b6");
  d3.select("#Barnewdata" + city).style("fill", "#0062b6");
  d3.select("#BarolddataM2" + city).style("fill", "#0062b6");
  d3.select("#BarnewdataM2" + city).style("fill", "#0062b6");
  d3.selectAll("#Dot" + city).attr("r", 3)
}

// show elements: animated scrolling
function scrollTo() {
            $('html, body').animate({ scrollTop: $('#tabel').offset().top }, 'slow');
            return false;
 }