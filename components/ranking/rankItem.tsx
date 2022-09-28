import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../../styles/ranking/rank-item.module.css';
import { BojRankType, BojTier, BojTierList, GitRankType } from '../../types/ranking.type';

interface RankItemProps {
    info: GitRankType | BojRankType,
    ranking: number
}

export const RankItem = ({
    info,
    ranking
}: RankItemProps) => {
    const {user} = info;
    const [tierInfo, setTierInfo] = useState<[BojTier, BojTier]>();
    useEffect(() => {
        if ('bojId' in info) {
            let idx = 0;
            BojTierList.some((tier, i) => {
                idx = i;
                return tier.rating >= info.rating;
            });
            setTierInfo([
                BojTierList[idx-1] ?? BojTierList[0],
                BojTierList[idx]]
            );
            if (info.bojImg) setProfileSrc(info.bojImg);
        } else {
            setTierInfo(undefined);
        }
    }, [info]);
    const [profileSrc, setProfileSrc] = useState<string>('https://static.solved.ac/misc/360x360/default_profile.png');

    return (
        <li className={`${styles.item} ${tierInfo? styles.boj: ''} ${tierInfo? styles[tierInfo[0].name.split(' ')[0].toLocaleLowerCase()]: ''}`}>
            <div className={styles.profile}>
                <Image src={'gitId' in info? info.githubImg: profileSrc}  width='360px' height='360px' alt="" />
                <div className='cols gap-05'>
                    <div>
                        <span className={styles.ranking}>[{ranking+1}] </span>
                        {
                            'gitId' in info
                            ? <a className='bold' href={`https://github.com/${info.gitId}`}>{info.gitId}</a>
                            : <a className='bold' href={`https://www.acmicpc.net/user/${info.bojId}`}>{info.bojId}</a>
                        }
                    </div>
                    <div className={styles.student_info}>
                        {user.studentGrade}학년 {user.studentClassNo}반 {user.studentNo}번 {user.name}
                    </div>
                </div>
            </div>
            {
                'gitId' in info
                ? <>
                    <div className={styles.msg}>{info.gitMsg}</div>
                    <div className={styles.info}>{info.commits} commits</div>
                </>
                : tierInfo && <>
                    <div className={styles.info}>{tierInfo[0].name}</div>
                    <div className={styles.exp_bar_wrap}>
                        <div
                            className={styles.exp_bar}
                            style={{width: `${
                                ((info.rating - tierInfo[0].rating) / (tierInfo[1].rating - tierInfo[0].rating)) * 100
                            }%`}}
                        />
                    </div>
                </>
            }
        </li>
    );
}