//VARIABLES
var topics = ["Dark Souls", "Uncharted", "Halo", "Super Smash Bros", "Legend of Zelda", "Mass Effect", "God of War"];
var gifs = [];

//FUNCTIONS

//Render the buttons for each video game in the topics array
function renderButtons(){
    $("#video-game-buttons").html("");
    
    $.each(topics, function(index){
        var button = $("<button>");
        button.addClass("video-game-button");
        button.attr("data-name", topics[index]);
        button.html(topics[index]);
        $("#video-game-buttons").append(button);
    });
}

//Render the gifs that are returned by the GIPHY API call
function renderGIFs(){
    var videoGame = $(this).attr("data-name") + " video game";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + videoGame + "&api_key=dc6zaTOxFJmzC&limit=10";
    $("#video-games").html("");
    gifs = [];

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        var results = response.data;

        $.each(results, function(index){
            gifs.push(results[index]);
            var videoGameDiv = $("<div>");
            $(videoGameDiv).addClass("video-game-gif");
            $(videoGameDiv).attr("data-index", index);
            $(videoGameDiv).attr("data-state", "still");
            var p = $("<p>");
            var videoGameImage = $("<img>");

            $(p).html(results[index].rating);
            $(videoGameImage).attr("src", results[index].images.fixed_height_still.url);
            

            $(videoGameDiv).append(p);
            $(videoGameDiv).append(videoGameImage);
            $("#video-games").prepend(videoGameDiv);
        }); 
    });
}

//Change a gif from playing to paused
function changeState(){
    if($(this).attr("data-state") == "still"){
        var index = Number($(this).attr("data-index"));
        $(this).find("img").attr("src", gifs[index].images.fixed_height.url);
        $(this).attr("data-state", "playing");
    }
    else if($(this).attr("data-state") == "playing"){
        var index = Number($(this).attr("data-index"));
        $(this).find("img").attr("src", gifs[index].images.fixed_height_still.url);
        $(this).attr("data-state", "still");
    }
}


//APPLICATION
$(document).ready(function(){
    
    //add a new video game button to the topics array, and re-render the buttons
    $("#add-video-game").on("click", function(event){
        event.preventDefault();

        if($("#video-game-input").val().trim() !== ""){
            topics.push($("#video-game-input").val().trim());
        }
        
        document.getElementById("video-game-form").reset();
        renderButtons();
    });

    $("#video-game-buttons").on("click", ".video-game-button", renderGIFs);

    $("#video-games").on("click", ".video-game-gif", changeState);

    renderButtons();
});