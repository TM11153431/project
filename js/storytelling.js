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
