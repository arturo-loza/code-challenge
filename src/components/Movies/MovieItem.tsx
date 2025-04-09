import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import placeholder from '../../assets/placeholder.png'
import Spinner from "./Spinner";

const MovieItem = ({ movieList, getMoreMovies }) => {
    const [loaded, setLoaded] = useState(false)
    const baseImgUrl = 'https://image.tmdb.org/t/p/w500'

    const MovieMap = () => (
        movieList.map((movie, index) => {
            const itemClass = movie.className ? 'movie-item ' + movie.className : 'movie-item';
            return (
                <div key={movie.backdrop_path + index} className={itemClass}>
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
