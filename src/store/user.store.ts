import { atom } from "recoil";
import { localStorageEffect } from "../utils/localStorage";

export interface User {
    isLogin: boolean,
    email: string,
    studentGrade: number,
    studentClassNo: number,
    studentNo: number,
    name: string,
    githubId: null | string,
    commits: number,
    bio: null | string,
    img: null | string
}

export const userState = atom<User>({
    key: 'user',
    default: {
        isLogin: false,
        email: '',
        studentGrade: 0,
        studentClassNo: 0,
        studentNo: 0,
        name: '',
        githubId: null,
        commits: 0,
        bio: null,
        img: null
    },
    effects: [localStorageEffect('user', 'json')]
});

export interface Token {
    accessToken: string | null,
    refreshToken: string | null
}

export const tokenState = atom<Token>({
    key: 'token',
    default: {
        accessToken: null,
        refreshToken: null
    },
    effects: [localStorageEffect('token', 'json')]
});