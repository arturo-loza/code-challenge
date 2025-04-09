import apiService from '../../services/api.service';
import './Movies.css';

import { useEffect, useState } from 'react';

const Movies = () => {
    const [movieList, setMovieList] = useState([])
    // const _baseImgUrl = 'https://image.tmdb.org/t/p/w780';
    const baseImgUrl = 'https://image.tmdb.org/t/p/w500'

    useEffect(() => {
        const apiKey = '1b501bbda107113acc653f328a2e935d';
        const language = 'en';
        apiService
            .getMovies({
                language,
                apiKey,
            })
            .then((response) => {
                setMovieList(response?.data?.results)
                console.log('Response', response?.data?.results[0]);
            });
    }, []);

    const MovieItem = () => {
        if (movieList.length === 0) {
            return
        } else {
            return movieList.map(movie => (
                <div key={movie.id} className={'movie-item'}>
                    <img
                        className={'movie-poster'}
                        src={baseImgUrl + movie.poster_path}
                    />
                    <div className={'movie-details'}>
                        <span className={'movie-title'}>{movie.title?.toUpperCase()}</span>
                        <span className={'movie-year'}>{movie.release_date?.substring(0, 4)}</span>
                    </div>
                </div>
            ))
        }
    }

    return (
        <div className={'movies-container'}>
            <MovieItem />
        </div>
    )
}

export default Movies
