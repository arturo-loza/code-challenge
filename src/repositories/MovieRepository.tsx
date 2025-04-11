import { BaseRepository } from "./BaseRepository";
import { BASE_MOVIE_DB_URL } from '../constants/constants';

interface IMovieResponse {
    data: IMovieData,
    success: boolean,
    errors: any
}

interface IMovieData {
    page: number,
    results: any,
    total_pages: number
    total_results: number
}
export interface IMovie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
}

const getFormattedUrl = (params: any) => {
    const { category, apiKey, ...rest } = params;
    const queryString = new URLSearchParams(rest).toString();
    return `${BASE_MOVIE_DB_URL}/${category}?api_key=${apiKey}&${queryString}`;
}

class MovieRepository extends BaseRepository<IMovieData> {
    getMovieById(id: string, params: any) {
        return super.getItemById(id,  getFormattedUrl(params));
    }
    getAllMovies(params: any) {
        return super.getAllItems(getFormattedUrl(params));
    }
}

export default new MovieRepository();
