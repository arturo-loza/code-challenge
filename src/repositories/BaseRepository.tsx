import { AxiosResponse } from "axios";
import { HttpClient } from "../api/HttpClient";

export interface IBaseRepository<T> {
    getItemById(id: any, url: string): Promise<ApiResponse<T>>;
    getAllItems(baseUrl: string): Promise<ApiResponse<T>>;
}

export class ApiResponse<T> {
    data?: T;
    success?: boolean;
    errors?: any;
}

const transform = (response: AxiosResponse): Promise<ApiResponse<any>> => {
    const result: ApiResponse<any> = {
        data: response.data,
        success: response.status === 200 || response.status === 201,
        errors: response.data?.errors,
    };

    return new Promise((resolve, reject) => {
        if (result.success) {
            resolve(result);
        } else {
            reject(result);
        }
    });
};

export abstract class BaseRepository<T> extends HttpClient implements IBaseRepository<T> {
    // protected collection: string | undefined;

    public async getItemById(id: string, url: string): Promise<ApiResponse<T>> {
        const instance = this.createInstance();
        const result = await instance.get(url).then(transform);
        return result as ApiResponse<T>;
    }

    public async getAllItems(url: string): Promise<ApiResponse<T>> {
        const instance = this.createInstance();
        const result = await instance.get(url).then(transform);
        return result as ApiResponse<T>;
    }
}
