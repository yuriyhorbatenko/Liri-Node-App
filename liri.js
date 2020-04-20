require("dotenv").config(); 
var keys =  require("./keys.js")
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv.slice(3).join(" ");


switch (action) {

case "concert-this":
  concert();
  break;

case "movie-this":
  movie();
  break;

case "spotify-this-song":
  spotifySong();
  break;

case "do-what-it-says":
  doWhat();
  break;
  
}


  function concert() {

    if (value === "") {

      axios.get("https://rest.bandsintown.com/artists/rammstein/events?app_id=codingbootcamp").then(
      
      function(response) {

        console.log("---------------Recomended Concert:------------");
        console.log("Artist: " + response.data[0].artist.name);
        console.log("*");
        console.log("Venue: " + response.data[0].venue.name);
        console.log("*");
        console.log("Country: " + response.data[0].venue.country);
        console.log("*");
        console.log("City: " + response.data[0].venue.city);
        console.log("*");
        console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        console.log("----------------------------------------------");

      });
    }

    else { 

      axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp").then(
      
      function(response) {

        var name = response.data[0].venue.name;
        var country = response.data[0].venue.country;
        var city = response.data[0].venue.city;
        var date = moment(response.data[0].datetime).format("MM/DD/YYYY")

        console.log("----------Your Search Results is here:--------");
        console.log("Venue: " + name);
        console.log("*");
        console.log("Country: " + country);
        console.log("*");
        console.log("City: " + city);
        console.log("*");
        console.log("Date: " + date);
        console.log("----------------------------------------------");
      
      });
    }
  };


  function movie() {

    if (value === "") {

      axios.get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=d1874160").then(

        function(response) {

        console.log("---------------Recomended Movie:--------------");
        console.log("Movie: " + response.data.Title);
        console.log("*");
        console.log("Year: " + response.data.Year);
        console.log("*");
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("*");
        console.log("Actors: " + response.data.Actors);
        console.log("----------------------------------------------");

      });
    }
    
    else {

      axios.get("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=d1874160").then(

      function(response) {

        var title = response.data.Title;
        var year = response.data.Year;
        var country = response.data.Country;
        var language = response.data.Language;
        var imdbRating = response.data.imdbRating;
        var ratings = response.data.Ratings[1].Value;
        var actors = response.data.Actors;
        var plot = response.data.Plot;

        console.log("----------Your Search Results is here:--------");
        console.log("Movie: " + title);
        console.log("*");
        console.log("Year: " + year);
        console.log("*");
        console.log("Country: " + country);
        console.log("*");
        console.log("Language: " + language);
        console.log("*");
        console.log("IMDB Rating: " + imdbRating);
        console.log("*");
        console.log("Rotten Tomatoes: " + ratings);
        console.log("*");
        console.log("Actors: " + actors);
        console.log("*");
        console.log("Plot: " + plot);
        console.log("----------------------------------------------");

      });
    }
  };


  function spotifySong() {

    if (value === "") {

      spotify.search({ type: "track", query: "Ace of Base The Sign" }, function(err, response) {

        if (err) {
         return console.log('Error occurred: ' + err);
        }

        console.log("---------------Recomended Song:---------------");
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("*");
        console.log("Song: " + response.tracks.items[0].name);
        console.log("*");
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log("*");
        console.log("URL: " + response.tracks.items[0].preview_url);
        console.log("----------------------------------------------");

      });
    }
    
    
  else {

    spotify.search({ type: "track", query: value, limit: 10 }, function(err, response) {
     
      if (err) {
        return console.log('Error occurred: ' + err);
      }

        for (var i=0; i < response.tracks.items.length; i++) {

          var artist = response.tracks.items[i].artists[0].name;
          var song = response.tracks.items[i].name;
          var album = response.tracks.items[i].album.name;
          var url = response.tracks.items[i].preview_url;

          console.log("----------Your Search Results is here:--------");
          console.log("----------------------------------------------");
          console.log("Artist: " + artist);
          console.log("*");
          console.log("Song: " + song);
          console.log("*");
          console.log("Album: " + album);
          console.log("*");
          console.log("URL: " + url);
          console.log("----------------------------------------------");

        }
      })
    }
  };



  

  

  
