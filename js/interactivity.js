// interactivity element: if hovered upon
function onMouseOver(city) {
	// make the icon bigger on the map
	d3.select("#logo-" + city).attr({
	width: 40,
	height: 40
	})
	
	// change colours of all mentions of the city to the Roemie color
	d3.select("#regel-" + city).attr("bgcolor", "#0062b6");
	d3.select("#Barolddata" + city).style("fill", "#0062b6");
	d3.select("#Barnewdata" + city).style("fill", "#0062b6");
	d3.select("#BarolddataM2" + city).style("fill", "#0062b6");
	d3.select("#BarnewdataM2" + city).style("fill", "#0062b6");
	d3.selectAll("#Dot" + city).attr("r", 3)
}

// interactivity element: if hovered out
function onMouseOut(city) {
	// make the icon smaller on the map
	d3.select("#logo-" + city).attr({
	width: 20,
	height: 20
	})
	
	// change colours of all mentions of the city to its respective color
	d3.select("#regel-" + city).attr("bgcolor", "FFFFFF");
	d3.select("#Barolddata" + city).style("fill", colorCodeCity(city));
	d3.select("#Barnewdata" + city).style("fill", colorCodeCity(city));
	d3.select("#BarolddataM2" + city).style("fill", colorCodeCity(city));
	d3.select("#BarnewdataM2" + city).style("fill", colorCodeCity(city));
	d3.selectAll("#Dot" + city).attr("r", 1.5)
}

//interactivity element: if clicked upon
function onClick(city) {
	// select table and filter on city
	table = $('#table').DataTable()
	table.search(city).draw()
	
	// animated scroll to the table
	scrollTo()
}

// show elements: animated scrolling
function scrollTo() {
	// scroll slowly to the table
	$('html, body').animate({ scrollTop: $('#tabel').offset().top }, 'slow');
	return false;
 }