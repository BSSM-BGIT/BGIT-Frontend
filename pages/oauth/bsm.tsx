import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { HttpMethod, useAjax } from '../../hooks/useAjax';
import { Token, tokenState, User, userState } from '../../store/user.store';

const BsmOAuth: NextPage = () => {
    const { ajax } = useAjax();
    const [, setUser] = useRecoilState(userState);
    const [, setToken] = useRecoilState(tokenState);
    const router = useRouter();
    const authCode = router.query.code;

    useEffect(() => {
        if (!authCode) return;
        (async () => {
            const [token, tokenError] = await ajax<Token>({
                method: HttpMethod.POST,
                url: 'auth/oauth/bsm',
                headers: {
                    authCode
                },
                noToken: true
            });
            if (tokenError || !token) {
                console.log(tokenError);
                alert('알 수 없는 에러가 발생하였습니다');
                return;
            }
            setToken(token);

            const [userInfo, userInfoError] = await ajax<User>({
                method: HttpMethod.GET,
                url: 'user',
                headers: {
                    'ACCESS-TOKEN': token.accessToken
                },
                noToken: true
            });
            if (userInfoError || !userInfo) {
                console.log(userInfoError);
                alert('알 수 없는 에러가 발생하였습니다');
                return;
            }
            setUser(userInfo);
            router.push('/');
        })();
    }, [authCode]);
    
    return (<></>)
}

export default BsmOAuth;
