import apiService from '../../api/HttpClient';

// Components
import MovieItem from "./MovieItem";
import Spinner from "./Spinner";
import Modal from "../Modal/Modal";
import OptionSelector from '../OptionSelector/OptionSelector'
import  type { IMovie } from "../../repositories/MovieRepository";
import MovieRepository from "../../repositories/MovieRepository";
import { MOVIE_DB_APIKEY } from '../../constants/constants';

import { useEffect, useState, useMemo } from 'react';

import './Movies.css';

interface Props {
    handleLanguageChange: (ev: any) => void
}

const Movies = (props: Props) => {
    const { handleLanguageChange } = props;
    const [movieList, setMovieList] = useState<any[]>([]);
    const [originalMovieList, setOriginalMovieList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [language, setLanguage] = useState('en');
    const [rule, setRule] = useState('');
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});
    const [category, setCategory] = useState('popular')

    const getParams = (category: string, language: string, page?: number): object => ({
        category,
        language,
        page,
        apiKey: MOVIE_DB_APIKEY,
    })

    useEffect((): void => {
        MovieRepository
            .getAllMovies(getParams(category, language, page))
            .then((response) => {
                setOriginalMovieList(response?.data?.results);
                setMovieList(response?.data?.results);
                setIsLoaded(true);
            });
    }, []);

    const oddMovies: any[] = useMemo(
        () => {
            const sortedMovies: any[] = [];
            originalMovieList.forEach((movie: object, index: number) => {
                sortedMovies.push({
                    ...movie,
                    className: (index % 2 === 0) ? 'even-movie' : 'odd-movie'
                })
            })
            return sortedMovies;
        },
        [originalMovieList]
    )

    const primeMovies: any[] = useMemo(
        () => {
            const sortedMovies: any[] = [];
            originalMovieList.forEach((movie: object, index: number) => {
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

    const fibonacci = (length: number) => {
        let fibo = [0, 1];
        while (fibo[fibo.length - 1] < length) {
            const nextFibo = fibo[fibo.length - 1] + fibo[fibo.length - 2];
            fibo.push(nextFibo);
        }
        return fibo.slice(0, -1);
    };

    const fiboMovies: any[] = useMemo(
        () => {
            const sortedMovies: any[] = [];
            const fibo = fibonacci(movieList.length);
            movieList.forEach((movie: object, index: number) => {
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
        page > 1 && rule === 'odd' && setMovieList(oddMovies);
    }, [oddMovies]);

    useEffect(() => {
        page > 1 && rule === 'prime' && setMovieList(primeMovies);
    }, [primeMovies]);

    useEffect(() => {
        page > 1 && rule === 'fibo' && setMovieList(fiboMovies);
    }, [fiboMovies]);

    const toggleModal = (toggle: boolean) => {
        setIsModalOpen(toggle);
    }

    const handleRules = (ev: any) => {
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

    const handleLanguage = (ev: any) => {
        const language = ev.value;
        setIsLoaded(false);
        setLanguage(language);
        setPage(1);
        handleLanguageChange(ev.value);
        MovieRepository
            .getAllMovies(getParams(category, language, 1))
            .then((response) => {
                setOriginalMovieList(response?.data?.results);
                setMovieList(response?.data?.results);
                setIsLoaded(true);
            });
    }

    const handleCategory = (ev: any) => {
        const category = ev.value;
        setIsLoaded(false);
        setCategory(category);
        setPage(1);
        MovieRepository
            .getAllMovies(getParams(category, language, 1))
            .then((response) => {
                setOriginalMovieList(response?.data?.results);
                setMovieList(response?.data?.results);
                setIsLoaded(true);
            });
    }

    const getMoreMovies = (): void => {
        if (movieList.length < 800) {
            setPage(page + 1);
            MovieRepository
                .getAllMovies(getParams(category, language, page + 1 ))
                .then((response) => {
                    setOriginalMovieList(originalMovieList.concat(response?.data?.results));
                    setMovieList(movieList.concat(response?.data?.results));
                    setIsLoaded(true);
                });
        }
    }

    const handleMovieClick = (movie: any) => {
        setMovieSelected(movie)
        toggleModal(true);
    }

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                toggleModal={toggleModal}
                movie={movieSelected}
            />
            <OptionSelector
                handleRules={handleRules}
                handleLanguage={handleLanguage}
                handleCategory={handleCategory}
            />
            <div className={'movies-container'}>
                {isLoaded
                   ? <MovieItem
                        movieList={movieList}
                        getMoreMovies={getMoreMovies}
                        handleMovieClick={handleMovieClick}
                    />
                   : <Spinner />
                }
            </div>
        </>
    )
}

export default Movies
