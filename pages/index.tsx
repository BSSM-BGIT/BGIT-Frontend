import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useModal } from '../hooks/useModal';
import { titleState } from '../store/common.store';
import { userState } from '../store/user.store';

const Home: NextPage = () => {
    const [, setTitle] = useRecoilState(titleState);
    const {openModal} = useModal();
    const [user] = useRecoilState(userState);
    const router = useRouter();

    useEffect(() => {
        setTitle('');
    }, []);

    useEffect(() => {
        if (!user.isLogin) {
            openModal('login');
            return;
        }
        if (!user.bojAuth || !user.githubAuth) {
            openModal('ranking-auth');
            return;
        }
        router.push('/ranking/git');
    }, [user]);
    

    return (
        <></>
    )
}

export default Home;
