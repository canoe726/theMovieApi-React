const BASE_MOVIE_URL = 'https://yts.mx/api/v2/';
const GET_TITLE = 'list_movies.json?sort=title&page=3&limit=10';
const GET_RATING = 'list_movies.json?sort=rating&page=4&limit=10';
const GET_ID = 'movie_details.json?movie_id=';

let whileFetching = false;
let abortController;

const request = async url => {
    try {
        if(whileFetching) abortController.abort();

        abortController = new AbortController();
        whileFetching = true;

        const response = await fetch(url, {
            signal: abortController.signal
        });

        if(response.ok) {
            const result = await response.json();
            whileFetching = false;
            return result;
        } else {
            const err = await response.json();
            throw err;
        }
    } catch(e) {
        if(e.name === 'AbortError') {
            return {
                status: 'FetchAbort'
            }
        } else {
            return {
                message: e.message,
                status: e.status
            }
        }
    }
};

const getResponse = async url => {
    try {
        const response = await request(url);
        return {
            isError: false,
            data: response
        }
    } catch(e) {
        return {
            isError: true,
            data: e
        }
    }
}

const api = {
    getMoviesByTitle: () => getResponse(BASE_MOVIE_URL + GET_TITLE),
    getMoviesByRating: () => getResponse(BASE_MOVIE_URL + GET_RATING),
    getMovieById: movieId => getResponse(BASE_MOVIE_URL + GET_ID + movieId)
};

export { api };