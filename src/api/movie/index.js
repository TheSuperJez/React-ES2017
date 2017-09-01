import {get, post} from 'axios';

//let path = 'http://api.themoviedb.org/3/search/movie?api_key=6508d423485f05cf96be7e159c8514d7';
let path = 'http://services.groupkt.com/country/get/iso2code/MX';
class MovieApi {
	
	static search(query) {
		return get(path + '&query=' + query);
	}
}

export default MovieApi;
