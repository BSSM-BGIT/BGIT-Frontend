import { atom } from "recoil";
import { UserType } from "../types/user.type";
import { localStorageEffect } from "../utils/localStorage";

export interface UserStateType extends UserType {
    isLogin: boolean
}

export const userState = atom<UserStateType>({
    key: 'user',
    default: {
        userId: 0,
        isLogin: false,
        email: '',
        studentGrade: 0,
        studentClassNo: 0,
        studentNo: 0,
        name: '',
        school: null,
        bojAuth: false,
        githubAuth: false
    },
    effects: [localStorageEffect('user', 'json')]
});

export interface Token {
    accessToken: string | null,
    refreshToken: string | null
}

export interface TokenRes {
    accessToken: {
        value: string
    },
    refreshToken: {
        value: string
    }
}

export const tokenState = atom<Token>({
    key: 'token',
    default: {
        accessToken: null,
        refreshToken: null
    },
    effects: [localStorageEffect('token', 'json')]
});