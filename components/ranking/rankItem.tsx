import { userAgentFromString } from 'next/server';
import styles from '../../styles/ranking/rank-item.module.css';
import { GitRankType } from '../../types/ranking.type';
import { UserType } from '../../types/user.type';

export enum RankingType {
    'git',
    'boj'
}

interface RankItemProps {
    info: GitRankType
    i: number,
    type: RankingType
}

export const RankItem = ({
    info,
    i,
    type
}: RankItemProps) => {
    const {user} = info;

    return (
        <li className={styles.item} key={i}>
            <div className={styles.profile}>
                <img src={info.img} alt="" />
                <div className='cols gap-05'>
                    <a className='bold' href={`https://github.com/${info.gitId}`}>{info.gitId}</a>
                    <div className={styles.student_info}>
                        {user.studentGrade}학년 {user.studentClassNo}반 {user.studentNo}번 {user.name}
                    </div>
                </div>
            </div>
            {
                type === RankingType.git
                ? <div className={styles.info}>{info.commits} commits</div>
                : <div className={styles.info}>{info.commits}</div>
            }
        </li>
    );
}