import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return(
        <header>
            <h1>BGIT</h1>

            <nav>
                <Link to="/">홈</Link>
                <Link to="/bojrank">Backjoon 랭킹</Link>
                <Link to="/share">프로젝트 공유</Link>
            </nav>

            <div className="signin">
                <Link to="/login">로그인</Link>
            </div>
        </header>
    );
}