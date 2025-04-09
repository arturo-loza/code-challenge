import axios from 'axios';

class ApiService {
    getMovies({ language, apiKey, page = 1 }: { language: string; apiKey: string, page?: number }) {
        const category = 'popular'; // possible values: top_rated | upcoming | now_playing;
        const url = `https://api.themoviedb.org/3/movie/${category}?language=${language}&api_key=${apiKey}&page=${page}`;
        return axios.get(url);
    }
}

export default new ApiService();
