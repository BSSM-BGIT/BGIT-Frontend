import axios, { AxiosError, AxiosPromise } from "axios"
import { Token, tokenState } from "../store/user.store";
import { useRecoilState } from "recoil";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Pragma: 'no-cache'
    },
    timeout: 5000,
});

export enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE
}

interface Ajax {
    url: string,
    method: HttpMethod,
    payload?: any,
    headers?: any,
    token?: Token | {}
}

export const useAjax = () => {
    const  [token, setToken] = useRecoilState(tokenState);

    const ajax = async <T> ({
        url,
        method,
        payload,
        headers = {},
        token = {}
    }: Ajax):Promise<[T | void, AxiosError | boolean]> => {
        try {
            const rawRes = ((): AxiosPromise<T> => {
                switch (method) {
                    case HttpMethod.GET: return instance.get(url, {headers: {...token, ...headers}});
                    case HttpMethod.POST: return instance.post(url, payload, {headers: {...token, ...headers}});
                    case HttpMethod.PUT: return instance.put(url, payload, {headers: {...token, ...headers}});
                    case HttpMethod.DELETE: return instance.delete(url, {headers: {...token, ...headers}});
                }
            })();
            return [(await rawRes).data, false];
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    if (!('refreshToken' in token)) return [, error];
                    const [data1, error1] = await ajax<Token>({
                        method: HttpMethod.POST,
                        url: 'auth/oauth/bsm',
                        headers: {
                            'REFRESH-TOKEN': token.refreshToken
                        }
                    });
                    if (error1 || !data1) {
                        return [, error1];
                    }
                    setToken(data1);
                }
                return [, error];
            }
            return [, true];
        }
    }

    return {
        ajax
    }
}