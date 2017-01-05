
function Poster(props){
	return(
		<div className="col-sm-6 col-md-4 col-lg-3">
			<img src={props.poster} />
		</div>
	)
}


// ES5 way takes an object
var Movies = React.createClass({

	getInitialState: function() {
		return{
			moviesToShow: []
		}
	},

	componentDidMount: function() {
		var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=fec8b5ab27b292a68294261bb21b04a5";
		$.getJSON(url, function(movieData){
			var nowPlayingArray = [];
			for(let i = 0; i < movieData.results.length; i++){
				nowPlayingArray.push(movieData.results[i]);
			}
			this.setState({
				moviesToShow: nowPlayingArray
			});
		}.bind(this));
	},

	render: function(){
		var imagePath = "http://image.tmdb.org/t/p/w300"
		return(
			<div className="container">
				<div className="row">
					<div className="col-sm-12 text-center">
						<div className="th-wrapper">
							<button className="btn btn-primary">Reset Search</button>
						</div>
						<div className="movie-rows">
							{/* Movies go here! */}
							{this.state.moviesToShow.map(function(movie, index){
								var fullImagePath = imagePath + movie.poster_path
								return <Poster key={index} poster={fullImagePath} />
							})}
						</div>
					</div>
				</div>
			</div>
		)
	}
})

ReactDOM.render(
	<Movies />,
	document.getElementById('movie-gallery')
)