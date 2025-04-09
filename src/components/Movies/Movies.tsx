import apiService from '../../services/api.service';

// Components
import MovieItem from "./MovieItem";
import OptionSelector from '../OptionSelector/OptionSelector'

import { useEffect, useState, useMemo } from 'react';

import './Movies.css';

const Movies = () => {
    const [movieList, setMovieList] = useState([]);
    const [originalMovieList, setOriginalMovieList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [language, setLanguage] = useState('en');
    const [rule, setRule] = useState('');

    const oddMovies = useMemo(
        () => {
            const sortedMovies = [];
            originalMovieList.forEach((movie, index) => {
                sortedMovies.push({
                    ...movie,
                    className: (index % 2 === 0) ? 'even-movie' : 'odd-movie'
                })
            })
            return sortedMovies;
        },
        [originalMovieList]
    )

    const primeMovies = useMemo(
        () => {
            const sortedMovies = [];
            originalMovieList.forEach((movie, index) => {
                let isPrime = index > 1;
                for (let i = 2, s = Math.sqrt(index); i <= s; i++) {
                    if (index % i === 0) {
                        isPrime = false;
                    }
                }
                sortedMovies.push({
                    ...movie,
                    className: isPrime ? 'special-movie' : 'normal-movie'
                })
            })
            return sortedMovies;
        },
        [originalMovieList]
    )

    const fibonacci = length => {
        let fibo = [0, 1];
        while (fibo[fibo.length - 1] < length) {
            const nextFibo = fibo[fibo.length - 1] + fibo[fibo.length - 2];
            fibo.push(nextFibo);
        }
        return fibo.slice(0, -1);
    };

    const fiboMovies = useMemo(
        () => {
            const sortedMovies = [];
            const fibo = fibonacci(movieList.length);
            movieList.forEach((movie, index) => {
                sortedMovies.push({
                    ...movie,
                    className: fibo.includes(index) ? 'special-movie' : 'normal-movie'
                })
            })
            return sortedMovies;
        },
        [originalMovieList]
    )


    useEffect(() => {
        const apiKey = '1b501bbda107113acc653f328a2e935d';
        const language = 'en';
        apiService
            .getMovies({
                language,
                apiKey,
            })
            .then((response) => {
                setOriginalMovieList(response?.data?.results);
                setMovieList(response?.data?.results);
                setIsLoaded(true);
            });
    }, []);

    const handleRules = ev => {
        setRule(ev.value)
        switch (ev.value) {
            case 'odd':
                setMovieList(oddMovies);
                break;
            case 'prime':
                setMovieList(primeMovies);
                break;
            case 'fibo':
                setMovieList(fiboMovies);
                break;
            default:
                setMovieList(originalMovieList);
        }
    }

    const handleLanguage = ev => {
        setLanguage(ev.value)
        console.log('handleLanguage', ev)
    }

    const Spinner = () => (
      <div className={'spinner-container'}>
          <div className={'spinner'} />
      </div>
    );

    return (
        <>
            <OptionSelector
                handleRules={handleRules}
                handleLanguage={handleLanguage}
                rule={rule}
                language={language}
            />
            <div className={'movies-container'}>
                {isLoaded ? <MovieItem movieList={movieList} /> : <Spinner />}
            </div>
        </>
    )
}

export default Movies
