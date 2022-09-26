import rankStyles from '../../styles/ranking/rank-item.module.css';
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { RankingType, RankItem } from "../../components/ranking/rankItem";
import { HttpMethod, useAjax } from "../../hooks/useAjax";
import { titleState } from "../../store/common.store";
import { RankingRes } from "../../types/ranking.type";
import { useRouter } from 'next/router';
import { useOverlay } from '../../hooks/useOverlay';

const RankingPage: NextPage = () => {
    const [, setTitle] = useRecoilState(titleState);
    const {ajax} = useAjax();
    const {showAlert} = useOverlay();
    const router = useRouter();
    const {type: rankingType} = router.query;
    const [rankingList, setRankingList] = useState<RankingRes | null>(null);

    useEffect(() => {
        setTitle('깃허브 랭킹');
        (async () => {
            const [rankingData, error] = await ajax<RankingRes>({
                url: 'user/git',
                method: HttpMethod.GET
            });
            if (error) return;
            setRankingList(rankingData);
        })();
    }, []);

    useEffect(() => {
        if (typeof rankingType !== 'string') return;
        if (!(rankingType in RankingType)) {
            showAlert('랭킹 타입이 맞지않습니다');
        }
    }, [rankingType]);

    return (
        <div className='container _100'>{
            (typeof rankingType === 'string' && rankingType in RankingType) &&
            <div>
                <ul className={rankStyles.top_ranking}>{
                    rankingList &&
                    rankingList?.data.filter((_, i) => i <= 2)
                    .map((info, i) => <RankItem i={i} info={info} type={RankingType[rankingType as keyof typeof RankingType]} />)
                }</ul>
                <ul className={rankStyles.ranking}>{
                    rankingList &&
                    rankingList?.data.filter((_, i) => i >= 3)
                    .map((info, i) => <RankItem i={i} info={info} type={RankingType[rankingType as keyof typeof RankingType]} />)
                }</ul>
            </div>
        }</div>
    );
}

export default RankingPage;