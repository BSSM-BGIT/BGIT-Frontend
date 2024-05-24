import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { HttpMethod, useAjax } from '../../hooks/useAjax';
import { useModal } from '../../hooks/useModal';
import { useOverlay } from '../../hooks/useOverlay';
import { tokenState, userState } from '../../store/user.store';
import { titleState } from '../../store/common.store';
import styles from '../../styles/header.module.css';

export const Header = () => {
    const [mounted, setMounted] = useState(false);
    const { openModal } = useModal();
    const { showToast } = useOverlay();
    const [user] = useRecoilState(userState);
    const resetUser = useResetRecoilState(userState);
    const [, setToken] = useRecoilState(tokenState);
    const [sideBar, setSideBar] = useState(false);
    const [title] = useRecoilState(titleState);

    useEffect(() => {
        Router.events.on('routeChangeStart', () => setSideBar(false));
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const logout = () => {
        resetUser();
        setToken({
            accessToken: null,
            refreshToken: null
        });
        showToast('로그아웃 되었습니다');
    }

    const userMenuView = () => (
        mounted && (
            user.isLogin
            ? <div className={`dropdown-menu ${styles.dropdown}`}>
                <span className={styles.item}>{user.name}</span>
                <ul className='dropdown-content'>
                    <li><a href='https://auth.bssm.app/user' className='option'>유저 정보</a></li>
                    <li><span onClick={() => {logout(); setSideBar(false);}} className='option'>로그아웃</span></li>
                </ul>
            </div>
            : (<span className={styles.item} onClick={() => {openModal('login'); setSideBar(false);}}>로그인</span>)
        )
    );

    return (
        <header className={styles.header}>
            <div className={styles.top}>
                <nav className={styles.top_menu_bar}>
                    <ul className={styles.left}>
                        <li className={`${styles.item} ${styles.all_menu} menu-button`} onClick={() => setSideBar(true)}>
                            <span className='line'></span>
                            <span className='line'></span>
                            <span className='line'></span>
                        </li>
                        <h2 className={styles.title}>
                            {title}
                        </h2>
                        <li onClick={() => openModal('setting')} className={`${styles.item} ${styles.setting}`}><img src="/icons/setting.svg" alt="setting" /></li>
                    </ul>
                    <h2 className={styles.title}>
                        {title}
                    </h2>
                    <ul className={styles.right}>
                        <li><Link href='/ranking/git'><a className={styles.item}>랭킹</a></Link></li>
                        <li><Link href='/board'><a className={styles.item}>커뮤니티</a></Link></li>
                    </ul>
                </nav>
            </div>
            <div className={`${styles.side} ${sideBar? styles.on: ''}`}>
                <div className={`close_button ${styles.close_button}`} onClick={() => setSideBar(false)}></div>
                <div className={`dim ${styles.dim}`} onClick={() => setSideBar(false)}></div>
                <ul className={styles.menus}>
                    <li>{userMenuView()}</li>
                    <li><Link href='/ranking/git'><a className={styles.item}>랭킹</a></Link></li>
                    <li><Link href='/board'><a className={styles.item}>커뮤니티</a></Link></li>
                    <li><a className={styles.item} href='https://github.com/BSSM-BGIT'>깃허브</a></li>
                </ul>
            </div>
        </header>
    )
}