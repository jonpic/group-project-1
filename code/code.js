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


//is the searchBandsInTownEvents function necessary? -carter

function searchBandsInTownEvents(events) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=band_together";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      //console.log(response);

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

      // Constructing HTML containing the artist information
      var mainArtistDiv = $("<div class='bg-dark' id='main-artist-div'>")
      var mainArtistLink = $( ".main-artist-div" ).wrap( "<a href></a>" );

      

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
                  
                  var eventDate = newResponse[i].datetime;
                  
                  eventDate = moment(eventDate).format("MMMM DD YYYY, h:mm a");
                  
                  var venue = newResponse[i].venue.name;


                  //console.log(newResponse[i].url)

                  var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

                  
                  var upcomingVenues = $("<a>").attr("href", newResponse[i].url).html("<h3>playing in " + newResponse[i].venue.city + " at the " + venue + " on " + eventDate);
                  

                  

                  $(mainArtistDiv).append(upcomingVenues);
                  


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

  database.ref().on("value", function(childSnapshot) {
  
  //console.log(childSnapshot.val());
  console.log(Object.values(childSnapshot.val()), "populating")
  console.log(Object.values(childSnapshot.val())[0].name)
  recentSearchArray = Object.values(childSnapshot.val())
  console.log(recentSearchArray[0].name + " array working")

  //console.log(Object.values(childSnapshot.val())[0].name)
  if (recentSearchArray.length > 3){
    for (var i=recentSearchArray.length-1; i>(recentSearchArray.length-4); i--){
      console.log(recentSearchArray[i].name)

      var recentName = $("<h3>").text(recentSearchArray[i].name);
      var recentURL = $("<a>").attr("href", recentSearchArray[i].url).append(recentName);
      var recentImage = $("<img>").attr("src", recentSearchArray[i].image);
      var recentUpcoming =  $("<h2>").text(recentSearchArray[i].upcoming + " upcoming events");

      var recentSearchDiv = $("<div class='bg-dark' id='recent-search-div'>")
      $("#main-container").append(recentSearchDiv);
      $(recentSearchDiv).append(recentName, recentURL, recentImage, recentUpcoming);
    }

    //avoiding duplicates in the recent searches - in progress

    // var counter = 0;
    // var bandA = "";
    // var bandB = "";
    // var bandC = "";

    // function printBandA(){
    //   var i = recentSearchArray.length-1;
    //   var recentName = $("<h3>").text(recentSearchArray[i].name);
    //   var recentURL = $("<a>").attr("href", recentSearchArray[i].url).append(recentName);
    //   var recentImage = $("<img>").attr("src", recentSearchArray[i].image);
    //   var recentUpcoming =  $("<h2>").text(recentSearchArray[i].upcoming + " upcoming events");

    //   var recentSearchDiv = $("<div class='bg-dark' id='recent-search-div'>")
    //   $("#main-container").append(recentSearchDiv);
    //   $(recentSearchDiv).append(recentName, recentURL, recentImage, recentUpcoming);

    // }

    // printBandA();






  }

  



  
  });