import rankStyles from '../../styles/ranking/rank-item.module.css';
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { GitRankItem, RankLayout } from "../../components/ranking/gitRankItem";
import { HttpMethod, useAjax } from "../../hooks/useAjax";
import { titleState } from "../../store/common.store";
import { RankingType } from "../../types/ranking.type";

const RankingPage: NextPage = () => {
    const {ajax} = useAjax();
    const [, setTitle] = useRecoilState(titleState);
    const [rankingList, setRankingList] = useState<RankingType | null>(null);

    useEffect(() => {
        setTitle('깃허브 랭킹');
        (async () => {
            const [rankingData, error] = await ajax<RankingType>({
                url: 'user/git',
                method: HttpMethod.GET
            });
            if (error) return;
            rankingData.data = rankingData.data.filter(value => value.githubId !== null);
            setRankingList(rankingData);
        })();
    }, []);

    return (
        <div className='container _100'>
            <ul className={rankStyles.top_ranking}>{
                rankingList &&
                rankingList?.data.filter((_, i) => i <= 2)
                .map((user, i) => <GitRankItem i={i} user={user} />)
            }</ul>
            <ul className={rankStyles.ranking}>{
                rankingList &&
                rankingList?.data.filter((_, i) => i >= 3)
                .map((user, i) => <GitRankItem i={i} user={user} />)
            }</ul>
        </div>
    );
}

export default RankingPage;