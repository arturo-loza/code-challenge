import apiService from '../../services/api.service';
import MovieItem from "./MovieItem";
import './Movies.css';

import { useEffect, useState } from 'react';

const Movies = () => {
    const [movieList, setMovieList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const apiKey = '1b501bbda107113acc653f328a2e935d';
        const language = 'en';
        apiService
            .getMovies({
                language,
                apiKey,
            })
            .then((response) => {
                setMovieList(response?.data?.results);
                setIsLoaded(true);
                console.log('Response', movieList);
            });
    }, []);

    // TODO: move Spinner to their own file
    const Spinner = () => (
      <div className={'spinner-container'}>
          <div className={'spinner'} />
      </div>
    );

    return (
        <div className={'movies-container'}>
            {isLoaded ? <MovieItem movieList={movieList} /> : <Spinner />}
        </div>
    )
}

export default Movies
