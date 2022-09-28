import rankStyles from '../../styles/ranking/rank-item.module.css';
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { RankItem } from "../../components/ranking/rankItem";
import { HttpMethod, useAjax } from "../../hooks/useAjax";
import { titleState } from "../../store/common.store";
import { RankingRes, RankingType } from "../../types/ranking.type";
import { useRouter } from 'next/router';
import { useOverlay } from '../../hooks/useOverlay';
import { userState } from '../../store/user.store';
import { useModal } from '../../hooks/useModal';
import Link from 'next/link';

const RankingPage: NextPage = () => {
    const [user] = useRecoilState(userState);
    const [, setTitle] = useRecoilState(titleState);
    const {ajax} = useAjax();
    const {openModal} = useModal();
    const {showAlert} = useOverlay();
    const router = useRouter();
    const {type: rankingType} = router.query;
    const [rankingList, setRankingList] = useState<RankingRes | null>(null);

    useEffect(() => {
        if (!user.isLogin) {
            openModal('login');
            return;
        }
        if (!user.bojAuth || !user.githubAuth) {
            openModal('ranking-auth');
            return;
        }
    }, [user]);

    useEffect(() => {
        if (typeof rankingType !== 'string') return;
        if (!(rankingType in RankingType)) {
            showAlert('랭킹 타입이 맞지않습니다');
            return;
        }

        switch (rankingType) {
            case RankingType.git: setTitle('깃허브 랭킹'); break;
            case RankingType.boj: setTitle('백준 랭킹'); break;
        }
        (async () => {
            const [rankingData, error] = await ajax<RankingRes>({
                url: `user/${rankingType}`,
                method: HttpMethod.GET
            });
            if (error) return;
            setRankingList(rankingData);
        })();
    }, [rankingType]);

    return (
        <div className='container _100'>
            <ul className={rankStyles.page}>{
                Object.entries(RankingType).map(
                    type => <li><Link href={`/ranking/${type[0]}`}>{type[1]}</Link></li>
                )
            }</ul>
            {
                (typeof rankingType === 'string' && rankingType in RankingType) &&
                <div>
                    <ul className={rankStyles.top_ranking}>{
                        rankingList &&
                        rankingList?.data.filter((_, i) => i <= 2)
                        .map((info, i) => <RankItem info={info} key={i} />)
                    }</ul>
                    <ul className={rankStyles.ranking}>{
                        rankingList &&
                        rankingList?.data.filter((_, i) => i >= 3)
                        .map((info, i) => <RankItem info={info} key={i} />)
                    }</ul>
                </div>
            }
        </div>
    );
}

export default RankingPage;