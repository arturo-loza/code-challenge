import axios from 'axios';

class ApiService {
    getMovies({ language, apiKey }: { language: string; apiKey: string }) {
        const category = 'popular'; // possible values: top_rated | upcoming | now_playing;
        const url = `https://api.themoviedb.org/3/movie/${category}?language=${language}&api_key=${apiKey}`;
        return axios.get(url);
    }
}

export default new ApiService();
