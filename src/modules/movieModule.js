import {
	ajaxCallError,
	beginAjaxCall
} from './ajaxModule';

import initialState from './initialState';
import movieApi from '../api/movie';

const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS';
const SEARCH_MOVIE_FAIL = 'SEARCH_MOVIE_FAIL';
const RESET_MOVIES = 'RESET_MOVIES';
const RESET_ERRORS = 'RESET_ERRORS';

export default function reducer(state = initialState.get('movieModule'), action) {
	switch (action.type) {
		case SEARCH_MOVIE_SUCCESS:
			{
				console.log(action);
				return state.set('movieList', [action.movieList]);
			}
		case RESET_MOVIES:
			{
				return state.set('movieList', []);
			}
		case RESET_ERRORS:
			{
				return state.set('movieErrors', {});
			}
		case SEARCH_MOVIE_FAIL:
			{
				return state.set('movieErrors', {
					type: 'search',
					error: action.error
				});
			}
		default:
			return state;
	}
}


export const searchMovie = (query) => {
	return async (dispatch) => {
		dispatch(beginAjaxCall());
		let movieData;
		try {
			movieData = await movieApi.search(query);
			dispatch({
				type: SEARCH_MOVIE_SUCCESS,
				movieList: movieData
			});
			return movieData;

		} catch (e) {
			console.log(e.message),
			dispatch({
				type: SEARCH_MOVIE_FAIL,
				error: e.message
			});
			dispatch(ajaxCallError(e.message));
		}
		

	};
};

export const resetMovies = () => {
	return (dispatch) => {
		dispatch({
			type: RESET_MOVIES
		});
	};
};

export const resetErrors = () => {
	return (dispatch) => {
		dispatch({
			type: RESET_ERRORS
		});
	};
};