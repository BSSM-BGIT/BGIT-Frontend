import { useRecoilState } from 'recoil';
import { userState } from '../../store/user.store';
import styles from '../../styles/button.module.css';
import Modal from "./modal";

export const AccountBoxWrap = () => {
    return (
        <>
            <LoginBox />
            <GitAuthBox />
        </>
    )
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

const GitAuthBox = () => {
    const [user] = useRecoilState(userState);
    const title = (
        <>
            <span>랭킹 등록</span>
        </>
    );
    
    return (
        <Modal type="main" id="git-auth" title={title}>
            <p className='gray'>랭킹에 등록하기 위해 계정 인증이 필요합니다</p>
            <a className={`button main ${styles.oauth_button} ${styles.git} ${user.githubAuth? 'inactive': ''}`} href="https://github.com/login/oauth/authorize?client_id=b87feaccd801817573ad&scope=id,name,email,avatar_url">
                <img src="/icons/github.svg" alt="github-icon" />
                <span>
                    {user.githubAuth? '등록됨': 'GitHub 등록'}
                </span>
            </a>
            <a className={`button main ${styles.oauth_button} ${styles.solved_ac} ${user.bojAuth? 'inactive': ''}`} href="https://bssm.kro.kr/oauth/login?clientId=4c81669f&redirectURI=http://localhost:3000/oauth/bsm">
                <img src="/icons/solved_ac.svg" alt="github-icon" />
                <span>
                    {user.bojAuth? '등록됨': '등록'}
                </span>
            </a>
        </Modal>
    );
}