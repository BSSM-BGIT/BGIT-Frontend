import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { titleState } from '../store/common.store';
import { userState } from '../store/user.store';

const Home: NextPage = () => {
    const [, setTitle] = useRecoilState(titleState);
    const [user] = useRecoilState(userState);
    const router = useRouter();

    useEffect(() => {
        setTitle('');
    }, []);

    useEffect(() => {
        router.push('/ranking/git');
    }, [user]);
    

    return (
        <></>
    );
}

export default Home;
