enum SchoolType {
    ROLE_BSSM = 'ROLE_BSSM',
    ROLE_GSM = 'ROLE_GSM',
    ROLE_DGSW = 'ROLE_DGSW',
    ROLE_DSM = 'ROLE_DSM'
}

export interface UserType {
    email: string,
    studentGrade: number,
    studentClassNo: number,
    studentNo: number,
    name: string,
    school: SchoolType,
    bojAuth: boolean,
    githubAuth: boolean
}