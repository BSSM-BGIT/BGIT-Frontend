import QueryString from "qs";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Token, tokenState, User, userState } from "../../store/user.store";
import { HttpMethod, useAjax } from "../../hooks/useAjax";

const BsmOAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const authCode = QueryString.parse(location.search, {ignoreQueryPrefix:true}).code;
    const [, setUser] = useRecoilState(userState);
    const [, setToken] = useRecoilState(tokenState);
    const {ajax} = useAjax();

    useEffect(() => {
        if (!authCode) return;
        (async () => {
            const [data1, error1] = await ajax<Token>({
                method: HttpMethod.POST,
                url: 'auth/oauth/bsm',
                headers: {
                    authCode
                }
            });
            if (error1 || !data1) {
                console.log(error1);
                alert('알 수 없는 에러가 발생하였습니다');
                return;
            }
            setToken(data1);

            const [data2, error2] = await ajax<User>({
                method: HttpMethod.GET,
                url: 'user',
                headers: {
                    'ACCESS-TOKEN': data1.accessToken
                }
            });
            if (error2 || !data2) {
                console.log(error2);
                alert('알 수 없는 에러가 발생하였습니다');
                return;
            }
            setUser(data2);
            navigate('/');
        })();
    }, [authCode]);

    return (<></>);
}

export default BsmOAuth;