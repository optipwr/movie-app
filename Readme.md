#Movie App

##About:
---
This is a Movie App that makes API calls to The Movie Database and returns data that I use to build the page. Everything you see in the carousel is current data that is generated on page load. The top section displays "currently playing movies" and the bottom section is a simple movie search.

The "Currently Playing Movies" section makes multiple AJAX calls and returns the data into the carousel. If you click on the image inside of the carousel it will take you to youtube.com to show you the trailer of the movie.

The "Search" section is basic and will return any movie in the entire database depending on the search. If you click on the picture returned, you will get a summary of what the movie is in a modal.

##Technology Used:
---
- HTML5
- CSS3
- Bootstrap
- JavaScript
- jQuery
- AJAX

##Challenges:
---
1. Using the JSON returned from the AJAX call in a presentable format.
2. Looping through the JSON to use all of the data returned.
3. Nesting the AJAX calls and not having it interfere with the webpage in negative ways.

##Code Examples:
---
Nested AJAX with loop.

```javascript
$.getJSON(nowPlayingUrl, function(nowPlayingData){
    console.log(nowPlayingData)
    var nowPlayingHTML = ''
    for(let i = 0; i < nowPlayingData.results.length; i++){
        var movieId = nowPlayingData.results[i].id;
        var trailerUrl = apiBaseUrl + 'movie/' + movieId + '/videos?api_key=' + apiKey;
        var youTubeLink = '';
        // var detailUrl = apiBaseUrl + 'movie/' + movieId + '?api_key=' + apiKey;
        $.getJSON(trailerUrl, function(targetMovieData){
        	//targeted "targetMovieData.id" instead of "movieId" because of the Asynchronous nature of JS looping through movieId
        	//too fast for the inner JSON call to use it
        	var detailUrl = apiBaseUrl + 'movie/' + targetMovieData.id + '?api_key=' + apiKey;
        	$.getJSON(detailUrl, function(detailData){
        		var releaseUrl = apiBaseUrl + 'movie/' + detailData.id + '/release_dates?api_key=' + apiKey
```

Building the HTML DOM with all the returned JSON.

```javascript
nowPlayingHTML += '<div class="each-movie">';
    nowPlayingHTML += '<div class="poster"><a href="' + youTubeLink + '"target="_blank"><img src="' + poster + '"></a></div>';
    nowPlayingHTML += '<div class="right-box">';
        nowPlayingHTML += '<div class="title">Title: ' + nowPlayingData.results[i].title + '</div>';
        // nowPlayingHTML += '<div class="rating">Rating: ' + mpaa + '</div>';
        nowPlayingHTML += '<div class="overview">Overview: ' + nowPlayingData.results[i].overview + '</div>';
        nowPlayingHTML += '<div class="release-date">Release Date: ' + nowPlayingData.results[i].release_date + '</div>';
        nowPlayingHTML += '<div class="vote-average">Average Rating: ' + nowPlayingData.results[i].vote_average + '</div>';
        nowPlayingHTML += '<div class="genre">Genres: ' + genre + '</div>';
        if(homepage.length > 1){
        nowPlayingHTML += '<div class="homepage">Website: <a href="' + homepage + '"target="_blank">' + homepage + '</a></div>';}
        nowPlayingHTML += '<div class="runtime">Runtime: ' + runtime + ' Minutes</div>';
    nowPlayingHTML += '</div>';          //right-box closing tag
nowPlayingHTML += '</div>';            //each-movie closing tag    
nowPlayingHTML += '</div>';            //item closing tag
```

##Screenshots:
---

