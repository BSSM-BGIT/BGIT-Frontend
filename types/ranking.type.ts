import { UserType } from "./user.type";

export interface RankingRes {
    count: number,
    data: GitRankType[]
}

export interface GitRankType {
    gitId: string,
    commits: number,
    gitMsg: string,
    img: string,
    user: UserType
}

export interface BojRankType {
    bojId: string,
    exp: number,
    maxStreak: number,
    solvedCount: number,
    tier: number,
    user: UserType
}