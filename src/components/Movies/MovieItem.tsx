import {useState} from "react";
import placeholder from '../../assets/placeholder.png'
const MovieItem = ({ movieList }) => {
    const [loaded, setLoaded] = useState(false)
    const baseImgUrl = 'https://image.tmdb.org/t/p/w500'

    if (movieList.length === 0) {
        return
    } else {
        return movieList.map(movie => {
            const itemClass = movie.className ? 'movie-item ' + movie.className : 'movie-item';
            return (
                <div key={movie.id} className={itemClass}>
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
    }
}

export default MovieItem
