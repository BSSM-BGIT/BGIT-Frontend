import { UserType } from "./user.type";

export enum RankingType {
    git = '깃허브',
    boj = '백준'
}

export interface RankingRes {
    count: number,
    data: (GitRankType | BojRankType)[]
}

export interface GitRankType {
    githubId: string,
    commits: number,
    githubMsg: string,
    githubImg: string,
    user: UserType
}

export interface BojRankType {
    bojId: string,
    rating: number,
    maxStreak: number,
    solvedCount: number,
    tier: number,
    bojBio: string,
    bojImg: string,
    user: UserType
}

export interface BojTier {
    rating: number,
    name: string
}

export const BojTierList = [
    {
        rating: 0,
        name: 'Unrated'
    },
    {
        rating: 30,
        name: 'Bronze V'
    },
    {
        rating: 60,
        name: 'Bronze IV',
    },
    {
        rating: 90,
        name: 'Bronze III',
    },
    {
        rating: 120,
        name: 'Bronze II',
    },
    {
        rating: 150,
        name: 'Bronze I',
    },
    {
        rating: 200,
        name: 'Silver V',
    },
    {
        rating: 300,
        name: 'Silver IV',
    },
    {
        rating: 400,
        name: 'Silver III',
    },
    {
        rating: 500,
        name: 'Silver II',
    },
    {
        rating: 650,
        name: 'Silver I',
    },
    {
        rating: 800,
        name: 'Gold V',
    },
    {
        rating: 950,
        name: 'Gold IV',
    },
    {
        rating: 1100,
        name: 'Gold III',
    },
    {
        rating: 1250,
        name: 'Gold II',
    },
    {
        rating: 1400,
        name: 'Gold I',
    },
    {
        rating: 1600,
        name: 'Platinum V',
    },
    {
        rating: 1750,
        name: 'Platinum IV',
    },
    {
        rating: 1900,
        name: 'Platinum III',
    },
    {
        rating: 2000,
        name: 'Platinum II',
    },
    {
        rating: 2100,
        name: 'Platinum I',
    },
    {
        rating: 2200,
        name: 'Diamond V',
    },
    {
        rating: 2300,
        name: 'Diamond IV',
    },
    {
        rating: 2400,
        name: 'Diamond III',
    },
    {
        rating: 2500,
        name: 'Diamond II',
    },
    {
        rating: 2600,
        name: 'Diamond I',
    },
    {
        rating: 2700,
        name: 'Ruby V',
    },
    {
        rating: 2800,
        name: 'Ruby IV',
    },
    {
        rating: 2850,
        name: 'Ruby III',
    },
    {
        rating: 2900,
        name: 'Ruby II',
    },
    {
        rating: 2950,
        name: 'Ruby I',
    },
    {
        rating: 3000,
        name: 'Master'
    },
];