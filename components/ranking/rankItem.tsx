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
                <Image src={'githubId' in info? info.githubImg: profileSrc}  width='360px' height='360px' alt="" />
                <div className='cols gap-05'>
                    <div className='bold'>
                        <span className={styles.ranking}>[{ranking+1}] </span>
                        <a target='_blank' rel='noopener noreferrer' href={'githubId' in info? `https://github.com/${info.githubId}`: `https://www.acmicpc.net/user/${info.bojId}`}>{'githubId' in info? info.githubId: info.bojId}</a>
                    </div>
                    <div className={styles.student_info}>
                        {user.studentGrade}학년 {user.studentClassNo}반 {user.studentNo}번 {user.name}
                    </div>
                </div>
            </div>
            {
                'githubId' in info
                ? <>
                    <div className={styles.msg}>{info.githubMsg}</div>
                    <div className={styles.info}>{info.commits} commits</div>
                </>
                : tierInfo && <>
                    <div className={styles.msg}>{info.bojBio}</div>
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