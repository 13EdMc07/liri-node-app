# Liri.js

Liri is a text based command processing tool. It's siri if you didn't have a mic.
It enables you to run a set of commands through the command line. 

## Technical Overview

Liri is a simple node app. It consists of a package.json, liri.js and a random.txt file that contains pre-set commands that program can choose from with the right command. 

## How to Run The App
After you download the repository or code base delete the node_module package-lock.json run npm install and then node liri.js <command>

### The Commands 
Liri can process any one of four commands.

#### spotify-this-song
Spotify this song command takes in one argument; the name of the song. If it cannot find the song it will pick a default song set in liri.js.
It will output the following information
Name
Album
Preview Link
Artist

The following is a screenshot of running this command

Refer to screenshot folder/pic1

spotify-this-song useses spotifys official api along with a spotify node module to retrieve the information.

#### concert-this 
concert-this uses axios to connect to the bandsintown API to retrieve all current concert information. It takes in one argument: the artists name. 
It displays the following information about each upcoming concert.

Name, location, date.

The following is a screenshot of running this command

Refer to screenshot folder/pic2

#### movie-this 
movie-this uses axios to connect to the omdbapi API. It takes in one argument: the name of the movie.
If it cannot find the movie it will retrieve information for a default movie title set in liri.js.
This command displays the following information about the movie.

Title, year, IMDB rating, Rotten Tomatoes Rating, Country, Language, Plot, Actors

Here is a screenshot of running this command

Refer to screenshot folder/pic3

#### do-what-it-says
do-what-it-says is the wild card of the commands. It picks a random command from a pre-set of commands in random.txt and runs it.
do-what-it-says does not take in an argument. So an example run of do-what-it-says would look like the following: node liri.js do-what-it-says 

Here is a screenshot of what a do-what-it-says command would look like

Refer to screenshot folder/pic4

## Link to App

https://github.com/13EdMc07/liri-node-app

## Technologies

Node with the following packages 

axios, dotenv, node-spotify-api

I have also used github to keep track of my changes. 

## My Role

I am the Sole Developer of the application. 











