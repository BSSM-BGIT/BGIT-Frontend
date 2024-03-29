import axios, { AxiosError, AxiosPromise } from "axios";
import { useRecoilState, useResetRecoilState } from "recoil";
import { Token, TokenRes, tokenState, userState } from "../store/user.store";
import { useModal } from "./useModal";
import { useOverlay } from "./useOverlay";

const instance = axios.create({
    baseURL: '/api',
    headers: {
        Pragma: 'no-cache'
    },
    timeout: 30000
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
    headers?: any
    noToken?: boolean
}

export const useAjax = () => {
    const { loading, showAlert } = useOverlay();
    const { openModal } = useModal();
    const  [token, setToken] = useRecoilState(tokenState);
    const resetUser = useResetRecoilState(userState);

    const ajax = async <T>({
        url,
        method,
        payload,
        headers = {},
        noToken
    }: Ajax):Promise<[T, false] | [void, AxiosError | true]> => {
        loading(true);
        if (token.accessToken && !noToken) {
            headers['ACCESS-TOKEN'] = token.accessToken;
        }
    
        try {
            const rawRes = await ((): AxiosPromise<T> => {
                switch (method) {
                    case HttpMethod.GET: return instance.get(url, {headers});
                    case HttpMethod.POST: return instance.post(url, payload, {headers});
                    case HttpMethod.PUT: return instance.put(url, payload, {headers});
                    case HttpMethod.DELETE: return instance.delete(url, {headers});
                }
            })();
            loading(false);
            return [rawRes.data, false];
        } catch (err) {
            loading(false);
            if (!(err instanceof AxiosError) || !err.response?.status) {
                console.log(err);
                showAlert('알 수 없는 에러가 발생하였습니다');
                return [, true];
            };

            if (err.response?.status === 401) {
                if (!(token?.refreshToken)) {
                    loginAlert();
                    return [, err];
                }
                const [newToken, newTokenError] = await ajax<TokenRes>({
                    method: HttpMethod.PUT,
                    url: 'refresh',
                    headers: {
                        'REFRESH-TOKEN': token.refreshToken
                    },
                    noToken: true
                });
                if (newTokenError) {
                    loginAlert();
                    return [, newTokenError];
                }
                setToken(prev => ({
                    ...prev,
                    accessToken: newToken.accessToken.value
                }));
                return ajax({
                    url,
                    method,
                    payload,
                    headers: {...headers, 'ACCESS-TOKEN': newToken.accessToken.value},
                    noToken: true
                });
            }

            if (err.response.data?.message) {
                showAlert(err.response.data?.message);
            } else if (err.response.data?.error) {
                showAlert(err.response.data?.error);
            } else {
                showAlert(`HTTP ERROR ${err.response.status}`);
            }
            loading(false);
            return [, true];
        }
    }

    const loginAlert = () => {
        openModal('login');
        resetUser();
        showAlert('다시 로그인해주세요');
        loading(false);
    }

    return {
        ajax
    }
}