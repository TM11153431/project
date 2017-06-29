changeWidths()
setTotals()
createBarTotal("olddata", "2014")
createBarTotal("newdata", "2017")
createBarM2("olddata", "olddataM2", "2014") 
createBarM2("newdata", "newdataM2", "2017")


// designate a color for each city 
function colorCodeCity(city) {
	// blue for Amsterdam
	if (city == "Amsterdam") {
		return "#2196F3"
	}
	// red for Rotterdam
	else if (city == "Rotterdam") {
		return "#F44336"
	}
	// yellow/orange for Den Haag
	if (city == "DenHaag") {
		return "#9C27B0"
	}
	// green for Groningen
	else if (city == "Groningen") {
		return "#4CAF50"
	}
	// purple for Utrecht
	else if (city == "Utrecht") {
		return "#FF9800"
	}
}

// create the upper bar charts
function createBarTotal(identifier, year) {
	
	// set frame dimensions for the bar chart
	var margin = {top: 20, right: 20, bottom: 20, left: 40},
		width = 250 - margin.left - margin.right,
		height = 250 - margin.top - margin.bottom;
	
	// set the scale for the x-axis
	var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
	
	// set the scale for the y-axis
	var y = d3.scale.linear().range([height, 0]);
	
	// scale x-axis to the bottom
	var xAxis = d3.svg.axis()
	  .scale(x)
	  .orient("bottom")
	
	// scale x-axis to the left
	var yAxis = d3.svg.axis()
	  .scale(y)
	  .orient("left")
	  .ticks(10);

	
	// create the svg in which the bar chart is going to be drawn
	var svg = d3.select("#" + identifier).append("svg")
	  .attr("width", width + margin.left + margin.right)
	  .attr("height", height + margin.top + margin.bottom)
	.append("g")
	  .attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");
	
	// load data 
	d3.csv("../data/" + identifier + ".csv", function(error, data) {
		// load prices separately
		data.forEach(function(d) {
		  d.prijs = +d.prijs;
		});
	
	// set x-axis for the cities
	x.domain(data.map(function(d) { return d.stad; }));
	// set y-axis from 0 to 500
	y.domain([0, 500]);

	// set the title
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
	
	// create the bars for each city and append listeners
	svg.selectAll("bar")
		.data(data)
		.enter().append("rect")
		.style("fill", function(d) { return d.color} )
		.attr("id", function(d) { return ("Bar" + identifier + d.stad)})
		.attr("x", function(d) { return x(d.stad); })
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y(d.prijs); })
		.attr("height", function(d) { return height - y(d.prijs); })
	   .on("mouseover", function (d) { onMouseOver(d.stad); }) 
	   .on("mouseout", function(d) { onMouseOut(d.stad);
	  })
	.on("click", function (d) { return onClick(d.stad); });
	 });
}

// create the lower bar charts
function createBarM2(file, identifier, year) {
	
	// set frame dimensions for the bar chart
	var margin = {top: 20, right: 20, bottom: 20, left: 40},
		width = 250 - margin.left - margin.right,
		height = 250 - margin.top - margin.bottom;
	
	// set the scale for the x-axis
	var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
	
	// set the scale for the y-axis
	var y = d3.scale.linear().range([height, 0]);
	
	// scale x-axis to the bottom
	var xAxis = d3.svg.axis()
	  .scale(x)
	  .orient("bottom")
	
	// scale x-axis to the left
	var yAxis = d3.svg.axis()
	  .scale(y)
	  .orient("left")
	  .ticks(10);

	// create the svg in which the bar chart is going to be drawn
	var svg = d3.select("#" + identifier).append("svg")
	  .attr("width", width + margin.left + margin.right)
	  .attr("height", height + margin.top + margin.bottom)
	.append("g")
	  .attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	d3.csv("../data/" + file + ".csv", function(error, data) {
		// transform and load square meters separately
		data.forEach(function(d) {
		  d.m2 = parseInt(d.m2)
		  d.m2 = Math.round(d.m2);
	  });

	// set x-axis for the cities
	x.domain(data.map(function(d) { return d.stad; }));
	// set y-axis from 0 to 25
	y.domain([0, 25]);

	// set the title
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
	
	// create the bars for each city and append listeners
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
	// set a count variable
    var count = 0;
    for (var i = 0; i < json.length; i++) {
		// each time the city is in the data, add one to the count
        if (json[i].stad == city) {
            count++;
        }
    }
    if (city == "DenHaag") {
		city = "den-haag"
    }
	// create the string for the text and change the text in the HTML
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
	  // set a count variable
    var count = 0;
    for (var i = 0; i < json.length; i++) {
		// each time the city is in the data, add one to the count
        if (json[i].stad == city) {
            count++;
        }
    
	// create the string for the width and change it in the HTML
	newWidth = Math.round(count/10) + "%"
    d3.select("#colorBar-" + city).style("width", newWidth).style("fill", "#0062b6").text(count)
  }});
}

// call changeWidth() for each city
function changeWidths() {
  changeWidth("Amsterdam")
  changeWidth("Rotterdam")
  changeWidth("DenHaag")
  changeWidth("Utrecht")
  changeWidth("Groningen")
}
