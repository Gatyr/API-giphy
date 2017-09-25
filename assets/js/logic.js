//known bugs:
	//displayGIFs() button click only accepts one click event before working

$(document).ready(function() {


	var buttonArray = ["Futurama", "Breaking Bad", "Game of Thrones", 
	"Westworld", "The Simpsons", "Pixar", "Disney", "Coffee", 
	"Jurassic Park", "James Bond", "Watchmen", "The Endocrine System", "No Results", 
	"Topic for which no GIFs exist", "Tumblr Gifs"];

	//create a button for every string in the buttonArray
	function displayButtons() {
		$("#buttons").empty();

		for (i=0; i<buttonArray.length; i++){
			var a = $("<button type='button' class='btn btn-info'>");
			var btnID = buttonArray[i].replace(/\s+/g, "+")
			a.attr("id", btnID);
			a.text(buttonArray[i]);
			$("#buttons").append(a);
		}
	}
	
	$("#addButton").on("click", function() {
		var newButton = $(".form-control").val();
		buttonArray.push(newButton);
		displayButtons();

	})
	
	function displayGIFs() {
		$(".btn-info").on("click", function() {
			$("#resultsContainer").empty();
			var subject = $(this).attr("id");
			var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=dc6zaTOxFJmzC";

			$.ajax({ url: giphyURL, method: "GET"}).done(function(res) {
				for (t=0; t<25; t++) {
					var rating = res.data[t].rating; 
					var image = $("<img>");

					var imgURLmoving = res.data[t].images.fixed_height.url;
					var imgURLstill = res.data[t].images.fixed_height_still.url;

					image.attr("src", imgURLstill);
					image.attr("data-still", imgURLstill);
					image.attr("data-moving", imgURLmoving);
					image.attr("data-state", "still")
					image.addClass("gif");

					$("#resultsContainer").append("<p>" + rating + "</p");
					$("#resultsContainer").append(image);
				}
			})
			$(document.body).on("click", ".gif", function() {
				var state = $(this).attr("data-state");
				if (state === "still") {
					$(this).attr("src", $(this).data("moving"));
					$(this).attr("data-state", "moving");
				} else {
					$(this).attr("src", $(this).data("still"));
	        		$(this).attr("data-state", "still");
				}
			})
		})
	}
	displayButtons();
	displayGIFs();
})