import axios, { AxiosInstance, AxiosResponse } from "axios";

export abstract class HttpClient {
    protected instance?: AxiosInstance;

    protected createInstance(): AxiosInstance {
        this.instance = axios.create({
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.initializeInterceptor();
        return this.instance;
    }

    private initializeInterceptor = () => {
        this.instance?.interceptors.response.use(this.handleResponse, this.handleError);
        this.instance?.interceptors.request.use((config: any) => config);
    };

    private handleResponse = (data: AxiosResponse) => data;
    private handleError = (error: any) => Promise.reject(error);
}

 /* class HttpClient {
    getMovies({ language, apiKey, page = 1 }: { language: string; apiKey: string, page?: number }) {
        const category = 'popular'; // possible values: top_rated | upcoming | now_playing;
        const url = `https://api.themoviedb.org/3/movie/${category}?language=${language}&api_key=${apiKey}&page=${page}`;
        return axios.get(url);
    }
} */

export default new HttpClient();
