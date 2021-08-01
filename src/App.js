import React, { useState, useEffect, useCallback } from 'react';

import './App.css';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';



function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  //* The function was declared and bc of hoisting it could be used
  //* Has to be after the const has been initialized
  // useEffect(() => {
  //   fetchMoviesHandler();
  // }, [fetchMoviesHandler]);


  // async function fetchMoviesHandler() {
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try{
      // const response = await fetch('https://swapi.dev/api/films/');
      const response = await fetch('https://react-http-maxs-default-rtdb.firebaseio.com/movies.json');
      
      if (!response.ok) {
        throw new Error("Something went wrong!")
      };
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
    } catch(error) {
      setError(error.message);
    }
    setIsLoading(false);
  //};
  }, []);

  //* Once the const has been initialized
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  };

  let content = <p>There are no movies yet!</p>
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{ error }</p>
  }
  if (isLoading) {
    content = <p>Loading...</p>
  }


  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{ content }</section>
    </React.Fragment>
  );
}


export default App;
