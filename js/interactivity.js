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