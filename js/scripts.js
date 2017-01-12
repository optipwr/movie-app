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
            		var releaseUrl = apiBaseUrl + 'movie/' + detailData.id + '/release_dates?api_key=' + apiKey    
                        // $.getJSON(releaseUrl, function(releaseData){
                            // var releaseDataArray = releaseData.results
                         //    var mpaa = ""
                         //    for(let i = 0; i<releaseData.results.length; i++){
                         //        if(releaseData.results[i].iso_3166_1 === "US"){
                         //            mpaa = releaseData.results[i].release_dates[0].certification
                         //    	}
                        	// }
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
			            	youTubeLink = 'https://www.youtube.com/embed/' + movieKey;
			            	if(i === 0){
			                nowPlayingHTML += '<div class="item active">'
				            }
				            else{
				                nowPlayingHTML += '<div class="item">'
				            }
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
	        	// });
            });
        }
    });

    var searchMovieUrl = apiBaseUrl + 'search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=';
    var searchInput = '';

    $('.movie-form').submit(function(){
    	$('.search-results').html('');
    	event.preventDefault();
    	searchInput = $('#movieSearch').val();
    	var fullSearch = searchMovieUrl + searchInput;
    	var searchedHTML = '';
    	$.getJSON(fullSearch, function(movieSearched){
    		console.log(movieSearched);
    		for(let i = 0; i < movieSearched.results.length; i++){
    			var posterSearched = imageBaseUrl + 'w300' + movieSearched.results[i].poster_path;
    			var searchTitle = movieSearched.results[i].title;
    			var searchDetails = movieSearched.results[i].overview;
                searchedHTML += '<button type="button" class="btn invisible-btn" data-toggle="modal" data-target="#exampleModalTV' + i + '" data-whatever="@' + i + '"><img src="' + posterSearched + '"></button>'
                searchedHTML += '<div class="modal fade" id="exampleModalTV' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"><div class="modal-dialog" role="document"><div class="modal-content">'
    			// searchedHTML += '<div class="searched-poster"><img src="' + posterSearched + '"></div>';
    			searchedHTML += '<div class="searched-title">Title: ' + searchTitle + '</div>';
				searchedHTML += '<div class="searched-overview">Overview: ' + searchDetails + '</div>';
                searchedHTML += '</div></div></div>'
    			if(movieSearched.results[i].poster_path.length > 1){
    				$('.search-results').html(searchedHTML);
    			}
    		}
    	})
    });

});





