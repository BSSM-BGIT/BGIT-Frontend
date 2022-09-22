import { userAgentFromString } from 'next/server';
import styles from '../../styles/ranking/rank-item.module.css';
import { UserType } from '../../types/user.type';

interface GitRankItemProps {
    user: UserType
    i: number,
}

export const GitRankItem = ({
    user,
    i,
}: GitRankItemProps) => {

    return (
        <li className={styles.item} key={i}>
            <div className={styles.profile}>
                <img src={user.img ?? ''} alt="" />
                <div className='cols gap-05'>
                    <a className='bold' href={`https://github.com/${user.githubId}`}>{user.githubId}</a>
                    <div className={styles.student_info}>
                        {user.studentGrade}학년 {user.studentClassNo}반 {user.studentNo}번 {user.name}
                    </div>
                </div>
            </div>
            <div className={styles.info}>{user.commits} commits</div>
        </li>
    );
}