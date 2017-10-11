//known bugs:
	//displayGIFs() button click only accepts one click event before working

$(document).ready(function() {


	var buttonArray = ["Futurama", "Breaking Bad", "Game of Thrones", 
	"Westworld", "The Simpsons", "Pixar", "Disney", "Coffee", 
	"Jurassic Park", "James Bond", "Watchmen", "The Endocrine System", "No Results", 
	"Topic for which no GIFs exist", "Tumblr Gifs"];

	//create a button for every string in the buttonArray
	function displayButtons() {
		//for the sake of simplicity, empty the buttons div so that 
		//when a new button is added, the method to add a button is 
		//simplified. 
		$("#buttons").empty();
		for (i=0; i<buttonArray.length; i++){
			var a = $("<button type='button' class='btn btn-info'>");
			//set button ID-attribute to what is in the current index, 
			//replacing whitespace with a "+" sign for the API call
			var btnID = buttonArray[i].replace(/\s+/g, "+")
			a.attr("id", btnID);
			//set text inside button to text of array index
			a.text(buttonArray[i]);
			$("#buttons").append(a);
		}
	}
	
	//method to add button to the page
	$("#addButton").on("click", function() {
		//take what was in the text field
		var newButton = $(".form-control").val();
		//push that to the button array
		buttonArray.push(newButton);
		//render the buttons
		displayButtons();

	})
	
	function displayGIFs() {
		//when a button is pushed, empty the results container
		$(".btn-info").on("click", function() {
			$("#resultsContainer").empty();
			//set the subject for the URL in the API call
			var subject = $(this).attr("id");
			var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=dc6zaTOxFJmzC";

			$.ajax({ url: giphyURL, method: "GET"}).done(function(res) {
				for (t=0; t<25; t++) {
					// set variable to jQuery element
					var image = $("<img>");
					//set variables for result of API call
					var rating = res.data[t].rating; 
					var imgURLmoving = res.data[t].images.fixed_height.url;
					var imgURLstill = res.data[t].images.fixed_height_still.url;
					//set attributes for img element
					image.attr("src", imgURLstill);
					image.attr("data-still", imgURLstill);
					image.attr("data-moving", imgURLmoving);
					image.attr("data-state", "still")
					image.addClass("gif");
					//add rating and image to container
					$("#resultsContainer").append("<p>" + rating + "</p");
					$("#resultsContainer").append(image);
				}
			})
			//when an image is clicked
			$(document.body).on("click", ".gif", function() {
				//get the state of the image
				var state = $(this).attr("data-state");
				//if it is still, set src to what is in the moving
				//data attribute and change the state to moving
				if (state === "still") {
					$(this).attr("src", $(this).data("moving"));
					$(this).attr("data-state", "moving");
				} else {
					//if it's not still, do the opposite
					$(this).attr("src", $(this).data("still"));
	        		$(this).attr("data-state", "still");
				}
			})
		})
	}
	displayButtons();
	displayGIFs();
})