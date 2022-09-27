import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { HttpMethod, useAjax } from '../../hooks/useAjax';
import { useOverlay } from '../../hooks/useOverlay';
import { Token, tokenState, userState } from '../../store/user.store';
import { UserType } from '../../types/user.type';

const GitOAuth: NextPage = () => {
    const { ajax } = useAjax();
    const { showAlert, showToast } = useOverlay();
    const [, setUser] = useRecoilState(userState);
    const router = useRouter();
    const {code} = router.query;

    useEffect(() => {
        if (typeof code !== 'string') return;
        (async () => {
            const [_, authError] = await ajax<Token>({
                method: HttpMethod.POST,
                url: 'auth/oauth/github',
                headers: {
                    code
                }
            });
            if (authError) {
                console.log(authError);
                showAlert('깃허브 인증에 실패하였습니다');
                return;
            }

            const [userInfo, userInfoError] = await ajax<UserType>({
                method: HttpMethod.GET,
                url: 'user'
            });
            if (userInfoError) {
                console.log(userInfoError);
                showAlert('알 수 없는 에러가 발생하였습니다');
                return;
            }
            showToast('깃허브 인증에 성공하였습니다');
            setUser({
                ...userInfo,
                isLogin: true
            });
            router.push('/');
        })();
    }, [code]);
    
    return (<></>)
}

export default GitOAuth;
