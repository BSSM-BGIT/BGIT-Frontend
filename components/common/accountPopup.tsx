import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { HttpMethod, useAjax } from '../../hooks/useAjax';
import { useModal } from '../../hooks/useModal';
import { useOverlay } from '../../hooks/useOverlay';
import { userState } from '../../store/user.store';
import styles from '../../styles/button.module.css';
import { UserType } from '../../types/user.type';
import { TextInput } from './inputs/textInput';
import Modal from "./modal";

export const AccountBoxWrap = () => {
    return (
        <>
            <LoginBox />
            <RankingAuthBox />
            <BojAuthBox />
        </>
    );
}

const LoginBox = () => {
    const title = (
        <>
            <img src="/logo/logo.png" alt="logo" className="logo" />
            <br/>
            <span>로그인</span>
        </>
    );

    return (
        <Modal type="main" id="login" title={title}>
            <a className={`button main ${styles.oauth_button} ${styles.bsm}`} href="https://bssm.kro.kr/oauth/login?clientId=4c81669f&redirectURI=http://localhost:3000/oauth/bsm">
                <img src="/icons/bsm-icon.png" alt="bsm-icon"/>
                <span>BSM 계정으로 계속</span>
            </a>
        </Modal>
    );
}

const RankingAuthBox = () => {
    const {openModal} = useModal();
    const [user] = useRecoilState(userState);
    const title = (
        <>
            <span>랭킹 등록</span>
        </>
    );
    
    return (
        <Modal type="main" id="ranking-auth" title={title}>
            <p className='gray'>랭킹에 등록하기 위해 계정 인증이 필요합니다</p>
            {
                user.githubAuth
                ? <button className={`button main ${styles.oauth_button} ${styles.git} inactive`}>
                    <img src="/icons/github.svg" alt="github-icon" />
                    <span>등록됨</span>
                </button>
                : <a className={`button main ${styles.oauth_button} ${styles.git}`} href="https://github.com/login/oauth/authorize?client_id=b87feaccd801817573ad&scope=id,name,email,avatar_url">
                    <img src="/icons/github.svg" alt="github-icon" />
                    <span>GitHub 등록</span>
                </a>
            }
            <button
                className={`button main ${styles.oauth_button} ${styles.solved_ac} ${user.bojAuth? 'inactive': ''}`}
                onClick={() => user.bojAuth? undefined: openModal('boj-code')}
            >
                <img src="/icons/solved_ac.svg" alt="github-icon" />
                <span>
                    {user.bojAuth? '등록됨': '등록'}
                </span>
            </button>
        </Modal>
    );
}

const BojAuthBox = () => {
    const {ajax} = useAjax();
    const {openModal, closeModal} = useModal();
    const {showAlert, showToast} = useOverlay();
    const [, setUser] = useRecoilState(userState);
    const [bojId, setBojId] = useState<string>('');
    const [authCode, setAuthCode] = useState<string>('');
    
    const getAuthCode = async () => {
        const [authCode, codeError] = await ajax<{code: string}>({
            url: 'boj/random',
            method: HttpMethod.GET,
            headers: {
                bojId
            }
        });
        if (codeError) {
            console.log(codeError);
            showAlert('Solved.ac 인증에 실패하였습니다');
            return;
        }
        setAuthCode(authCode.code);
        openModal('boj-auth');
        closeModal('boj-code');
    }
    
    const checkAuth = async () => {
        const [check, checkError] = await ajax<{result: boolean}>({
            url: `auth/boj`,
            method: HttpMethod.POST
        });
        if (checkError || !check.result) {
            console.log(checkError);
            showAlert('Solved.ac 인증에 실패하였습니다');
            return;
        }
        closeModal('boj-auth');

        const [userInfo, userInfoError] = await ajax<UserType>({
            method: HttpMethod.GET,
            url: 'user'
        });
        if (userInfoError) {
            console.log(userInfoError);
            showAlert('알 수 없는 에러가 발생하였습니다');
            return;
        }
        showToast('Solved.ac 인증에 성공하였습니다');
        setUser({
            ...userInfo,
            isLogin: true
        });
    }
    
    return (
        <>
            <Modal type="main" id="boj-code" title='Solved.ac 계정 등록'>
                <form
                    className='cols gap-1'
                    autoComplete='off'
                    onSubmit={e => {
                        e.preventDefault();
                        getAuthCode();
                    }}
                >
                    <TextInput
                        setCallback={setBojId}
                        placeholder='백준 ID'
                        full
                        required
                    />
                    <button type='submit' className={`button main ${styles.oauth_button} ${styles.solved_ac}`}>
                        <img src="/icons/solved_ac.svg" alt="github-icon" />
                        <span>등록</span>
                    </button>
                </form>
            </Modal>
            <Modal type="main" id="boj-auth" title='Solved.ac 계정 등록'>
                <form
                    className='cols gap-1'
                    autoComplete='off'
                    onSubmit={e => {
                        e.preventDefault();
                        checkAuth();
                    }}
                >
                    <p>
                        <span>해당 인증코드를 </span>
                        <a className='accent-text' href={`https://solved.ac`}>Solved.ac</a>
                        <span> 상태메시지에<br />입력후 인증해주세요.</span>
                    </p>
                    <h2>{authCode}</h2>
                    <button type='submit' className='button main accent'>인증</button>
                </form>
            </Modal>
        </>
    );
}
