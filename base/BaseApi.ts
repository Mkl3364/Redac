import axios from "axios";
import Axios, { AxiosRequestConfig} from "axios";

class BaseApi {
    
    public readonly baseUrl : string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private config(header?: any): AxiosRequestConfig {
        return {
            'headers' : header ?? {},
        }
    }

    private url(target: string): string {
        return this.baseUrl + target
    }

    protected getRequest(target: string, header?: any) {
        return Axios.get(this.url(target), this.config(header));
    }

    protected postRequest(target: string, header?: any, data?: any) {
        return Axios.post(this.url(target), data, this.config(header));
    }
}

export default BaseApi;


export const config = (header? : any) => {
    return {
        'headers' : header ?? {}
    }
}

export const BaseUrl = {
    baseUrl : 'https://api.imgur.com/3'
}

export const data = (key: string, value: string) => {
    return {
        key: value
    }
}


export const retrieveBearerIfNeeded = async (): Promise<string> => {
    if(process.env.IMGUR_TOKEN !== null && process.env.IMGUR_TOKEN !== undefined) {
        return process.env.IMGUR_TOKEN
    }
    const body = {
        refresh_token: process.env.IMGUR_REFRESH_TOKEN,
        client_id: process.env.IMGUR_CLIENT_ID,
        client_secret: process.env.IMGUR_CLIENT_SECRET,
        grant_type : process.env.IMGUR_REFRESH_TOKEN,
    }
    const response = await axios.post('https://api.imgur.com/oauth2/token', body);
    const token = response.data['access_token'] as string;
    return token;
}

export const uploadImage = async (imageUrl: string) => {

    const body = data('image', imageUrl);
    const response = await axios.post(BaseUrl.baseUrl + '/upload', body, { headers: {'Authorization' : 'Client-ID' + process.env.IMGUR_CLIENT_ID!} })
    const link = response.data
    return link;
}

 