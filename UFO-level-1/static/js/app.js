//PART 1: Automatic Table and Date Search
//Instructions: Write code that appends a table to your web page and then adds new rows of data for each UFO sighting.

//Create a data variable from data.js file
var tableData = data;

//Use d3 to get a reference to the table body
var tbody = d3.select("tbody");

//Loop through each ufo object in the data array using forEach
tableData.forEach((ufo) => {

	//Create a variable 'row' which is the resulst of appending one table row `tr` for each ufo object
	var row = tbody.append("tr");

	//Use object.entries and forEach to iterate through key and value pairs
	Object.entries(ufo).forEach(([key, value]) => {

		//Create a variable 'cell' which is the result of appending one cell/ufo object value (date, city, state, country, shape, duration, and comments)  
		var cell = row.append("td");
		cell.text(value);
	});
});

//Instructions: Use a date form in your HTML document and write JavaScript code that will listen for events and search through the date/time column to find rows that match user input.

//Create button variable by selecting the button
var button = d3.select("#filter-btn");

//Create form variable by selection form
var form = d3.select("form");

//Create event handler for the button
button.on("click", runEnter);

//Create event handler for the form
form.on("submit", runEnter);

//Create function for the event handler
function runEnter() {

  //Stop the page from auto-refreshing
  d3.event.preventDefault();

  //Get the raw HTML code by selecting the imput element
  var inputElement = d3.select(".form-control");

  //Get the value property of the input element
  var inputValue = inputElement.property("value");

  //Create a 'results' variable by filtering the data by datetime
	var results = tableData.filter(ufo => ufo.datetime === inputValue);
	
	//Clear the table content
	tbody.html("");

	//Create conditional to handle lack of matching results which includes the date imputted 
	if (results.length === 0) {
		tbody.text(`There were no ufo sightings on ${inputValue}. :()`);
	}

	//Second part of the conditional to handle matching results
	else {
		results.forEach((ufo) => {
			var row = tbody.append("tr");
			Object.entries(ufo).forEach(([key, value]) => {
				var cell = row.append("td");
				cell.text(value);
			});
		});
	};
};

