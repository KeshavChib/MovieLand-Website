import React, { useEffect, useState } from "react";
import './App.css';
import MovieCard from './MovieCard';
import searchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com/?apikey=' + process.env.REACT_APP_API_KEY;

function App() { 
    const [movies, setMovies] = useState(null);
    const [title, setTitle] = useState('');
    const [searchTitle, setSearchTitle] = useState('');

    const searchMovies = async (title) => {
        const responce = await fetch(`${API_URL}&s=${title}`);
        const data = await responce.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies(searchTitle);
    },[searchTitle]);

    return (<div className="app">
        <h1>MovieLand</h1>
        <div className="search">
            <input
                placeholder="Search for Movies"
                value={title}
                onChange={(ev) => { setTitle(ev.target.value) }}
            />
            <img
                src={searchIcon}
                alt="search"
                onClick={() => {setSearchTitle(title)}}
            />
        </div>
        <div className="container">
            {/* <MovieCard movie1={movie1}/> */}
            {(movies? (movies.map((movie) => 
                <div key={movie.imdbID}>
                    <MovieCard movie1={movie} />
                </div>
            ) ) : (
                <h1>No Movies Found.</h1>
            ) )}
        </div>
    </div>)
}

export default App;