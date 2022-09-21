import type { NextPage } from 'next'
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { HttpMethod, useAjax } from '../hooks/useAjax';
import { useModal } from '../hooks/useModal';
import { titleState } from '../store/common.store';
import { User } from '../store/user.store';

const Home: NextPage = () => {
    const [, setTitle] = useRecoilState(titleState);
    const {openModal} = useModal();
    const {ajax} = useAjax();

    useEffect(() => {
        setTitle('');
    }, []);

    const test = async () => {
        const [userInfo, userInfoError] = await ajax<User>({
            method: HttpMethod.GET,
            url: 'user'
        });
        console.log(userInfo)
    }

    return (
        <div>
            <button className='button accent' onClick={() => openModal('login')}>로그인</button>
            <button className='button accent' onClick={test}>테스트</button>
        </div>
    )
}

export default Home;
