require("dotenv").config();
const axios = require('axios');
const fs = require('fs');

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
let default_song = "California Love";
let default_movie = "Mr. Nobody";


function spotify_this_song(song){
    // Make Spotify API Call
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
      });
       
      spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    //    Save results to spotify_search_results
      let spotify_search_results = data.tracks.items;
    //   console.log(spotify_search_results);
    
    // Make sure there is at least one song
      if(spotify_search_results.length > 0){
          console.log("Spotify Results found!");
        //   Assuming that the first song in a list of songs is the one we want
          let song = spotify_search_results[0];
        //  Extract all info from the song
          let artist = song.artists[0].name;
          let name = song.name;
          let link = song.preview_url;
          let album = song.album.name;
    // Print out the info we just extracted
         console.log("=============== Printing Song Info Now ====================");
         console.log("Artist: " + artist);
         console.log("Song Name: " + name);
         console.log("Preview Link: " + link);
         console.log("Album: " + album);
         console.log("=============== END Printing Song Info  ====================");
      }else {
        //   If no song found, search and then show default song information
        console.log("No Results Found. Showing Default Song Info");
        spotify.search({ type: 'track', query: default_song }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
            let spotify_search_results = data.tracks.items;
            let song = spotify_search_results[0];
            let artist = song.artists[0].name;
            let name = song.name;
            let link = song.preview_url;
            let album = song.album.name;
    
            console.log("=============== Printing Song Info Now ====================");
            console.log("Artist: " + artist);
            console.log("Song Name: " + name);
            console.log("Preview Link: " + link);
            console.log("Album: " + album);
            console.log("=============== END Printing Song Info  ====================");
      });
    }
      });
}

function concert_this(artist){
    // Use axios to do a get api call to retrieve concert info for given artist
    axios.get('https://rest.bandsintown.com/artists/' + artist.trim() + '/events?app_id=codingbootcamp')
  .then(function (response) {
    // handle success
    // console.log(response);
    let data = response.data;
    // console.log(data);
//      Name of the venue
//      Venue location
//      Date of the Event (use moment to format this as “MM/DD/YYYY”)
// Make sure that there is at least one concert available 
    if (data === undefined || data.length == 0 || data == '\n{warn=Not found}\n'){
        console.log("Sorry, could not find concerts for " + artist.trim())
    }else {
        // If there is at least one concert, show info
        let name_venue;
        let venue_location;
        let date_concert;
        // Iterate over the concerts and print out each concert
        data.forEach(function(concert) {
            name_venue = concert.venue.name;
            venue_location = concert.venue.city;
            date_concert = concert.datetime;
            console.log("-------------- Concert Info --------------------");
            console.log("Name: " + name_venue);
            console.log("Location: " + venue_location);
            console.log("Date: " + date_concert);
            console.log(" ");
        });
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}

function movie_this(movie){
    if(movie == null){
        movie = default_movie;
    }
let movie_key = keys.movie.key;
// Make API call using axios
axios.get('http://www.omdbapi.com/?apikey=' + movie_key + '&t=' + movie)
  .then(function (response) {
    // handle success
    // console.log(response);
    let data = response.data;
    // Check if we get any results back
    if(data.Response && data.Response == 'False'){
        console.log("Movie not found, picking default title...");   
        movie_this(default_movie);
    }else {
        // If there are results being returned then extract and print results
        // * Title of the movie.
        //   * Year the movie came out.
        //   * IMDB Rating of the movie.
        //   * Rotten Tomatoes Rating of the movie.
        //   * Country where the movie was produced.
        //   * Language of the movie.
        //   * Plot of the movie.
        //   * Actors in the movie.
        let title = data.Title;
        let year = data.Year;
        let IMDB_rating = "";
        let rotten_tomatoes = "";
        // Assuming the first Ratings item is IMDB and second one is Rotten Tomatoes
        if(data.Ratings && data.Ratings.length > 0){
            IMDB_rating = data.Ratings[0].Value;
        }
        if(data.Ratings && data.Ratings.length > 1){
            rotten_tomatoes = data.Ratings[1].Value;
        }
        let country = data.Country;
        let language = data.Language;
        let plot = data.Plot;
        let actors = data.Actors

        console.log("-------------- Movie Info --------------------");
        console.log("Title: " + title);
        console.log("Year: " + year);
        console.log("IMDB: " + IMDB_rating);
        console.log("Rotten Tomatoes: " + rotten_tomatoes);
        console.log("Country: " + country);
        console.log("Langauge: " + language);
        console.log("Plot: " + plot);
        console.log("Actors: " + actors);
        console.log(" ");
    }
    
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });



}

function do_what_it_says(){
    // Open up file 
    fs.readFile('random.txt', (err, data) => {
        if(err) throw err;
        // Convert to file data to string
        let text = data.toString();
        // Split string by new line and save to array text_array
        let text_array = text.split("\n");
        let random_int = -1;
        // Pick randon int, keep trying if random int is not valid
        while(random_int < 0 || random_int > text_array.length - 1){
            random_int = Math.floor(Math.random() * text_array.length - 1 );
        }
        // Use random int to select command from random text file
        let command_picked = text_array[random_int];
        // Now actually run the command
        runCommand(command_picked);          
    })
}

function runCommand(command){
    // Split command by empty spaces
    let command_split = command.split(" ");
    // Extract the name of artist/song/movie title
    let name = command_split.splice(1).join(" ");
    // Now check command to see what method to run 
    if(command_split[0] == 'concert-this'){
        concert_this(name);
    }
    if(command_split[0] == 'movie-this'){
        movie_this(name);
    }
    if(command_split[0] == 'spotify-this-song'){
        spotify_this_song(name);
    }
}

function start_program(){
    // Get name/arguments after command e.g. movie-this matrix --> it will be matrix 
    let arguments = "";
    for(let i = 3; i < process.argv.length; i++){
        arguments = "" + arguments + " " + process.argv[i];
    }
    // Check the command itself e.g.  concert-this, movie-this etc.
    if(process.argv[2] == "concert-this"){
        concert_this(arguments);
    }
    if(process.argv[2] == "movie-this"){
        movie_this(arguments);
    }
    if(process.argv[2] == "spotify-this-song"){
        spotify_this_song(arguments);
    }
    if(process.argv[2] == "do-what-it-says"){
        do_what_it_says();
    }
}
// spotify_this_song("Can't hold us");
// concert_this("Rob Thomas");
// movie_this();

start_program();