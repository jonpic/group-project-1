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

var database = firebase.database();

var playerURL = ""
var bandID = ""
var inputArtist = "tame%impala"
var queryURL = "https://api.spotify.com/v1/search?q=" + inputArtist + "&type=artist&market=us&limit=1";

//is the searchBandsInTownEvents function necessary? -carter

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
      //console.log(response);

      // Constructing HTML containing the artist information
      var mainArtistDiv = $("<div class='bg-dark' id='main-artist-div'>")
      var artistName = $("<h1>").text(response.name);
      var artistURL = $("<a>").attr("href", response.url).append(artistName);
      var artistImage = $("<img>").attr("src", response.thumb_url);
      
      var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
      var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

      //create object to push to firebase
      var recentSearch = {
        name: response.name,
        url: response.url,
        image: response.thumb_url,
        upcoming: response.upcoming_event_count
      };

      database.ref().push(recentSearch);

      // console.log(recentSearch.name);
      // console.log(recentSearch.url);
      // console.log(recentSearch.image);
      // console.log(recentSearch.upcoming);
      

      //Empty the contents of the artist-div, append the new artist content
      $("#main-container").empty();
      $("#main-container").append(mainArtistDiv);
      $(mainArtistDiv).append(artistURL, artistImage, upcomingEvents, goToArtist);
      
      if (response.upcoming_event_count > 0) {
          var newQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=band_together";
          $.ajax({
              url: newQueryURL,
              method: "GET"
          }).then(function(newResponse){
              for (var i = 0; i < 5; i++){
                  //console.log(i)
                  //console.log(newResponse[i])
                  //console.log(newResponse[i].datetime)
                  //console.log(newResponse[i].venue)
                  var eventDate = newResponse[i].datetime;
                  eventDate = moment(eventDate).format("MMMM DD YYYY, h:mm a");

                  //$(mainArtistDiv).append(eventDate);

                  var venue = newResponse[i].venue.name;


                  //console.log(newResponse[i].url)

                  var upcomingVenues = $("<a>").attr("href", newResponse[i].url).html("<h3>Playing in " + newResponse[i].venue.city + " at the " + venue + " on " + eventDate);


                  //<a href="url">link text</a>

                  $(mainArtistDiv).append(upcomingVenues);
                  //$(mainArtistDiv).wrap("<a href=" + newResponse[i].url +"></a>");
                  


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

  database.ref().on("child_added", function(childSnapshot) {
  
  console.log(childSnapshot.val());

  var recentName = childSnapshot.val().name;
  var recentURL = childSnapshot.val().url;
  var recentImage = childSnapshot.val().image;
  var recentUpcoming = childSnapshot.val().upcoming;

  var recentSearchDiv = $("<div class='bg-dark' id='recent-search-div'>")
  $("#main-container").append(recentSearchDiv);
  $(recentSearchDiv).append(recentName, recentURL, recentImage, recentUpcoming);

  
  });

var playerURL = ""
var bandID = ""
var inputArtist = "tame%impala"
var queryURL = "https://api.spotify.com/v1/search?q=tame%20impala&type=artist&market=us&limit=1";

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        bandID = response.artists.items[0].id;
        console.log(bandID)
        
        var queryURL2 = "https://api.spotify.com/v1/artists/5INjqkS1o8h1imAzPqGZBb/top-tracks?country=us";
        console.log(queryURL2)
        // Log the resulting object
        console.log(response);
        $.ajax({
            url: queryURL2,
            method: "GET"
          })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
      
              // Log the queryURL
              console.log(queryURL2);
      
              // Log the resulting object
              console.log(response.tracks[0].preview_url);
              playerURL = response.tracks[0].preview_url
              var video = $('<video />', {
                id: 'video',
                src: playerURL,
                type: 'video/mp4',
                controls: true
            });
            video.appendTo($("body"));
              
            });
      });


    // Here we run our AJAX call to the OpenWeatherMap API
    
      
      console.log(playerURL)
