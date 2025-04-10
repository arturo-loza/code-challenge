import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import placeholder from '../../assets/placeholder.png'
import Spinner from "./Spinner";

interface Props {
    movieList: any[],
    getMoreMovies: () => void,
    handleMovieClick: (movie: any) => void
};

const MovieItem = (props: Props) => {
    const { movieList, getMoreMovies, handleMovieClick } = props;
    const [loaded, setLoaded] = useState(false)
    const baseImgUrl = 'https://image.tmdb.org/t/p/w500'

    const onMovieClick = (movie: any) => {
        handleMovieClick(movie);
    }

    const MovieMap = () => (
        movieList.map((movie: any) => {
            const itemClass = movie.className ? 'movie-item ' + movie.className : 'movie-item';
            return (
                <div
                    key={movie.id}
                    className={itemClass}
                    onClick={() => onMovieClick(movie)}
                    role={'button'}
                    tabIndex={0}
                >
                    {!loaded && (
                        <img
                            className={'placeholder'}
                            src={placeholder}
                            alt='placeholder'
                        />
                    )}
                    <img
                        alt={'movie poster'}
                        className={loaded ? 'movie-poster' : 'movie-poster-hidden'}
                        src={baseImgUrl + movie.poster_path}
                        loading="lazy"
                        onLoad={() => setLoaded(true)}
                    />
                    <div className={'movie-details'}>
                        <span className={'movie-title'}>{movie.title?.toUpperCase()}</span>
                        <span className={'movie-year'}>{movie.release_date?.substring(0, 4)}</span>
                    </div>
                </div>
            )
        })
    );

    if (movieList.length === 0) {
        return
    } else {
        return (
            <InfiniteScroll
                next={getMoreMovies}
                hasMore={movieList.length < 800}
                loader={<Spinner />}
                dataLength={movieList.length}
            >
                <MovieMap />
            </InfiniteScroll>
        )
    }
}

export default MovieItem
