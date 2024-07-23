import { useState,useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import serach from './search.svg'

// 4ef50550

// Create a Static Variable for the API URL
const API_URL = 'http://www.omdbapi.com?apikey=4ef50550';

const movies = {
    "Title": "Avengers: Infinity War",
    "Year": "2018",
    "imdbID": "tt4154756",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);

    const [serachTerm, setSerachTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        console.log(data.Search)
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies(serachTerm);
    }, [serachTerm]);

    return (
        <div className='app'>
            <h1>G-Movies</h1>
            <div className='search'>
                <input
                    placeholder='Search for a movie'
                    value={serachTerm}
                    onChange={(e) => setSerachTerm(e.target.value)}
                />
                <img
                    src={serach} // Adjust this line to the actual search icon source
                    alt='search'
                    onClick={() => searchMovies(serachTerm)}
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ): (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )}        
       </div>
    );
}

export default App;
