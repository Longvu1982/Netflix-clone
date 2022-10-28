const API_KEY = "cd6bed5cd31fbcc0612b75078c38a5f1";

const requests = {
    fetchTrending: `/trending/all/day?api_key=${API_KEY}`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&language=en-US`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovie: `./discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `./discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `./discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `./discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentareis: `./discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchMovieDetails: (movieId)=> {
        return `/movie/${movieId}?api_key=${API_KEY}`
    }
}
export default requests