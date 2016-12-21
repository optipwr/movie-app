$(document).ready(function(){
    var apiBaseUrl = 'http://api.themoviedb.org/3/'
    //entry point for all apis of this site    
    var imageBaseUrl = 'http://image.tmdb.org/t/p/'

    const nowPlayingUrl = apiBaseUrl + 'movie/now_playing?api_key=' + apiKey 
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
            		console.log(detailData);
            		var genre = '';
            		for(let i = 0; i < detailData.genres.length; i++){
            			if(i > 0){
            				genre = genre + ", " + detailData.genres[i].name;
            			}
            			else{
            				genre = detailData.genres[i].name;
            			}
            		}
            		var homepage = detailData.homepage;
            		var runtime = detailData.runtime;

            	
	            	var poster = imageBaseUrl + 'w300' + nowPlayingData.results[i].poster_path;
	            	var movieKey = targetMovieData.results[0].key;
	            	youTubeLink = 'https://www.youtube.com/watch?v=' + movieKey;
	            	if(i === 0){
	                nowPlayingHTML += '<div class="item active">'
		            }
		            else{
		                nowPlayingHTML += '<div class="item">'
		            }
		            nowPlayingHTML += '<div class="each-movie">';
		                nowPlayingHTML += '<div class="poster"><a href="' + youTubeLink + '"><img src="' + poster + '"></a></div>';
		                nowPlayingHTML += '<div class="right-box">';
		                    nowPlayingHTML += '<div class="title">Title: ' + nowPlayingData.results[i].title + '</div>';
		                    nowPlayingHTML += '<div class="overview">Overview: ' + nowPlayingData.results[i].overview + '</div>';
		                    nowPlayingHTML += '<div class="release-date">Release Date: ' + nowPlayingData.results[i].release_date + '</div>';
		                    nowPlayingHTML += '<div class="vote-average">Average Rating: ' + nowPlayingData.results[i].vote_average + '</div>';
		                    nowPlayingHTML += '<div class="genre">Genres: ' + genre + '</div>';
		                    if(homepage.length > 1){
		                    nowPlayingHTML += '<div class="homepage">Website: <a href="' + homepage + '">' + homepage + '</a></div>';}
		                    nowPlayingHTML += '<div class="runtime">Runtime: ' + runtime + ' Minutes</div>';
		                nowPlayingHTML += '</div>';          //right-box closing tag
		            nowPlayingHTML += '</div>';            //each-movie closing tag    
		            nowPlayingHTML += '</div>';            //item closing tag
		            $('.carousel-inner').html(nowPlayingHTML + 
		        	`<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
				    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
				    <span class="sr-only">Previous</span>
				  	</a>
				  	<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
				    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
				    <span class="sr-only">Next</span>
				  	</a>`);
	        	});
            });
        }
    });
});





