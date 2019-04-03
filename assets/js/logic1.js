$(document).ready(function() {

    /*
    ===================================
    Array
    ===================================
    */
    
     let sitcoms = ['Fresh Prince', 'Martin', 'Family Matters', 'Kenan & Kel', 'Cosby Show'];

    /*
    ===================================
     Buttons
    ===================================
    */

function displayGifButtons() {
   $('#gif-buttons').empty(); //clear previous data 

    for(var i = 0; i < sitcoms.length; i++) {   /*looping through array */ 

    var favShows = $('<button>'); //create individual buttons for each sitcom in the array
        favShows.addClass('favShows'); //adding a class to the new sitcom button
        favShows.addClass('btn btn-primary mr-2 mb-2 mt-2'); // linking new sitcom button to bootstrap while setting margins
        favShows.attr("data-name", sitcoms[i]); //data attibute
        favShows.text(sitcoms[i]); //relays content to the DOM 

        //chaning Jquery 
        const button2 = $('<button>').addClass('sitcomButton')
                                .attr("data-name", sitcoms[i])
                                .text(sitcoms[i]);

        $('#gif-buttons').append(favShows);

    }
}



function addNewButton() {
$("#addGif").on("click", function(event){ 
    event.preventDefault();
    let search = $("#search-input").val().trim();

    sitcoms.push(search);
    displayGifButtons();

    });
}   

// function removeLastGif() {
//     $('#remove-gif').on('click', function() {
//         sitcoms.pop(search);
//        displayGifButtons();
        

//     });
// }

/*
==============================
AJAX
==============================
*/

function showGifs() {
    var show = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=B25gNTa0YyecfAelWZTAVoZWdgpi62KT&limit=8";
    console.log(queryURL);

    

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response){
        $('#gifsView').empty();
        var results = response.data;
        console.log(results[0].rating);

        for(let i = 0; i < results.length; i++){
            let newGifDiv = $('<div>');
        newGifDiv.addClass('gifDivTwo');

        let gifRating = $('<p>').text('Rating : ' + results[i].rating);
        newGifDiv.append(gifRating);

        let gifImage = $('<img>');

        gifImage.attr('src', results[i].images.fixed_height_small_still.url);
        gifImage.attr('data-still', results[i].images.fixed_height_small_still.url);
        gifImage.attr('data-animate', results[i].images.fixed_height_small_still.url);
        gifImage.attr('data-state', 'still');
        gifImage.addClass('image');

        newGifDiv.append(gifImage);

        $("#gifsView").prepend(newGifDiv);



        }
    });
}

displayGifButtons()
addNewButton()
// // removeLastGif()
// showGifs() 
    
   
$(document).on("click", ".favShows", showGifs);

    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state === 'still'){
            $(this).attr('src', $(this).attr('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).attr('still'));
            $(this).attr('data-state', 'still');
        }


     });
});











