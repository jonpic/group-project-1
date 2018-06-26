 // Initialize Firebase
var config = {
    apiKey: "AIzaSyBFolyg1FbHvFgQo71r_nypLHaAnBQq_3A",
    authDomain: "band-together-app.firebaseapp.com",
    databaseURL: "https://band-together-app.firebaseio.com",
    projectId: "band-together-app",
    storageBucket: "",
    messagingSenderId: "94818319032"
};

firebase.initializeApp(config);

function searchBandsInTownEvents(events) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=band_together";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);

      // Constructing HTML containing the artist information
    });
  }

function searchBandsInTown(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=band_together";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);

      // Constructing HTML containing the artist information
      var mainArtistDiv = $("<div class='bg-dark' id='main-artist-div'>")
      var artistName = $("<h1>").text(response.name);
      var artistURL = $("<a>").attr("href", response.url).append(artistName);
      var artistImage = $("<img>").attr("src", response.thumb_url);
      
      var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
      var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

      // Empty the contents of the artist-div, append the new artist content
      $("#main-container").empty();
      $("#main-container").append(mainArtistDiv);
      $(mainArtistDiv).append(artistURL, artistImage, upcomingEvents, goToArtist);
      
      if (response.upcoming_event_count > 0) {
          var newQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=band_together";
          $.ajax({
              url: newQueryURL,
              method: "GET"
          }).then(function(newResponse){
              for (var i = 0; i < 4; i++){
                  console.log(i)
                  console.log(newResponse[i])
                  console.log(newResponse[i].datetime)
                  var eventDate = $("<h3>").text(newResponse[i].datetime);
                  $(mainArtistDiv).append(eventDate);
              }
          })
      }
    });
  }

  // Event handler for user clicking the select-artist button
  $("#find-shows").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    
    var inputArtist = $("#artist-input").val().trim();

    // Running the searchBandsInTown function (passing in the artist as an argument)
    searchBandsInTown(inputArtist);
  });