import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { HttpMethod, useAjax } from '../../hooks/useAjax';
import { useOverlay } from '../../hooks/useOverlay';
import { TokenRes, tokenState, userState } from '../../store/user.store';
import { UserType } from '../../types/user.type';

const BsmOAuth: NextPage = () => {
    const { ajax } = useAjax();
    const { showAlert, showToast } = useOverlay();
    const [, setUser] = useRecoilState(userState);
    const [, setToken] = useRecoilState(tokenState);
    const router = useRouter();
    const authCode = router.query.code;

    useEffect(() => {
        if (!authCode) return;
        (async () => {
            const [tokenRes, tokenError] = await ajax<TokenRes>({
                method: HttpMethod.POST,
                url: 'auth/oauth/bsm',
                headers: {
                    authCode
                },
                noToken: true
            });
            if (tokenError) {
                console.log(tokenError);
                showAlert('알 수 없는 에러가 발생하였습니다');
                return;
            }
            setToken({
                accessToken: tokenRes.accessToken.value,
                refreshToken: tokenRes.refreshToken.value
            });

            const [userInfo, userInfoError] = await ajax<UserType>({
                method: HttpMethod.GET,
                url: 'user',
                headers: {
                    'ACCESS-TOKEN': tokenRes.accessToken.value
                },
                noToken: true
            });
            if (userInfoError) {
                console.log(userInfoError);
                showAlert('알 수 없는 에러가 발생하였습니다');
                return;
            }
            showToast('로그인에 성공하였습니다');
            setUser({
                ...userInfo,
                isLogin: true
            });
            router.push('/');
        })();
    }, [authCode]);
    
    return (<></>)
}

export default BsmOAuth;
