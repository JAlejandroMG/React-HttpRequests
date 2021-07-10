import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';




function App() {
  const [movies, setMovies] = useState([]);


  /* function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films/')
    .then(response => {
      return response.json();
    }).then(data => {
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl
        };
      });
      setMovies(transformedMovies)
    });
  }; */
  async function fetchMoviesHandler() {
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
    
    const transformedMovies = data.results.map(movieData => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        releaseDate: movieData.release_date,
        openingText: movieData.opening_crawl
      };
    });
    setMovies(transformedMovies)
  };


  return (
    <React.Fragment>
      <section>{/* 
        <button>Fetch Movies</button> */}
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* <MoviesList movies={dummyMovies} /> */}
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}


export default App;
