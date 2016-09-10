$(document).ready(function() {
	// Array that holds animals
	var gifArray = ["dog", "cat", "whale", "birds", "turtles", "doge", "fish",
		"lions", "tigers", "bears"];

	
$("footer").hide();

	function buttonMake() {
		$('#buttonSpot').empty();

		// Uses array to make the buttons
		for(var i = 0; i < gifArray.length; i++) {
			$('#buttonSpot').append("<button id='animals' class='btn btn-default' data-animal=" + gifArray[i] + ">" + gifArray[i] + "</button>");
		}
	}

	// Puts Animal Gifs in location and makes them clickable
	function onClickanimals() {
	
		var animal = $(this).attr('data-animal');
		// Giphy URL link
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

		
		$('#gifArea').empty();

		$('#gifArea').append('<br><div class="text-center"><h3>Click the images to animate them</h3></div><br>');

$("footer").show();
		
		//Ajax call to get the information from the Giphy JSON
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

			var results = response.data;

			//Iterates through the results
            for (var i = 0; i < results.length; i++) {
            	//Creates a div for each gif in the results
                var gifDiv = $('<div class="gif">')

                //Capitalizes the rating and sets it to N/A if there is no rating
                var rating = results[i].rating.toUpperCase();
                if(rating == "") {
                	rating = "N/A";
                }

                //Creates Raiting Text with the Image
                var ratingText = $('<p>').text("Rating: " + rating);
                var animalImage = $('<img src=' + results[i].images.fixed_height_still.url + ' data-still=' +
                	results[i].images.fixed_height_still.url + ' data-animate=' +
                	results[i].images.fixed_height.url + ' data-state="still" class="animalImage">');

                //Appends the visuals to gifDiv
                gifDiv.append(ratingText);
                gifDiv.append(animalImage);

                //Places the Gifs
                $('#gifArea').append(gifDiv);

                $('#gifArea').append('<br>');
            }
            
		});
	}

	//How you add a button
	function addAnimal() {
		$('#addAnimal').on('click', function(){

			var typed = $('#animalInput').val().trim();

			gifArray.push(typed);

			buttonMake();

			return false;
		})
	}

	//Enables the user to click the images to have them pause or move
	function imageAnimal() {

		var state = $(this).attr('data-state');

		//Switches the source to the animate/still state
	    if(state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
	}
	$(document).on('click', '#animals', onClickanimals);
	$(document).on('click', '.animalImage', imageAnimal);

	//Sets up page and buttons
	buttonMake();
	addAnimal();


});
