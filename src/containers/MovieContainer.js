import React, { Component, PropTypes } from 'react';
import { resetErrors, resetMovies, searchMovie } from '../modules/movieModule';

import { connect } from 'react-redux';
import moment from 'moment';

class MovieContainer extends Component {
	constructor(props) {
		super(props);
		this.searchMovie = this.searchMovie.bind(this);
	}
	componentWillMount() {
		this.props.resetMovies();
		this.props.resetErrors();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.movieErrors &&
			nextProps.movieErrors.error) {
			console.log(nextProps.movieErrors);
			switch (nextProps.movieErrors.error.status) {
			case 401:
				alert('El api Key es incorrecto');
				break;
			case 404:
				alert('El api de the movie DB no se encuentra');
				break;
			case 500:
				alert('Ha ocurrido un error en el api');
				break;
			default:
				alert('Ocurrió un error desconocido');
				break;
			}
			this.props.resetErrors();
		}
	}
	searchMovie(event) {
		this.props.resetMovies();
		this.props.searchMovie('terminator');
	}

	render() {
		return (
			<div>
				{moment(new Date()).add(-1, 'month')
					.format('YYYY/MM/DD h:mm:ss a')}
				{console.log(
				moment('12-30/2016', 'MM-DD/YYYY').toDate())}
				<button onClick={this.searchMovie}>{'Search Terminator Movie'}</button>
				<br />
				{JSON.stringify(this.props.movieList)}
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		movieList: state.movieModule.get('movieList'),
		movieErrors: state.movieModule.get('movieErrors'),
	};
}


function mapDispatchToProps(dispatch) {
	return {
		searchMovie: (query) => dispatch(searchMovie(query)),
		resetMovies: () => dispatch(resetMovies()),
		resetErrors: () => dispatch(resetErrors()),
	};
}


MovieContainer.propTypes = {
	movieList: PropTypes.array,
	searchMovie: PropTypes.func,
	resetMovies: PropTypes.func,
	resetErrors: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);
